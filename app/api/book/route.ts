import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db";
import {bookGenres, books, genres} from "@/db/schema";
import {uploadImage} from "@/lib/uploadImage";
import {and, eq, ilike, inArray, count} from "drizzle-orm";

async function getBooksWithGenresByIds(bookIds: string[]) {
    if (bookIds.length === 0) return [];

    const genresList = await db
        .select({
            genreId: bookGenres.genreId,
            bookId: bookGenres.bookId,
            genreName: genres.name,
        })
        .from(bookGenres)
        .leftJoin(genres, eq(bookGenres.genreId, genres.id))
        .where(inArray(bookGenres.bookId, bookIds));

    const booksData = await db.select().from(books).where(inArray(books.id, bookIds));

    return booksData.map((book) => ({
        ...book,
        genres: genresList
            .filter((g) => g.bookId === book.id)
            .map((g) => ({id: g.genreId, name: g.genreName})),
    }));
}

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "5");
        const search = searchParams.get("search") || "";
        const bookGenresParams = searchParams.getAll("bookGenres")
            .flatMap(param => param.split(',').map(s => s.trim()))
            .filter(Boolean);

        const noParams =
            !search &&
            bookGenresParams.length === 0 &&
            !searchParams.get("page") &&
            !searchParams.get("limit");

        const conditions = [];

        // Search
        if (search) {
            conditions.push(ilike(books.title, `%${search}%`));
        }

        // Category filtering
        if (bookGenresParams.length > 0) {
            const matchedGenres = await db
                .select()
                .from(genres)
                .where(inArray(genres.name, bookGenresParams));

            if (matchedGenres.length === 0) {
                return NextResponse.json({data: [], page, limit, total: 0});
            }

            const matchedGenreIds = matchedGenres.map((g) => g.id);

            const relatedBooks = await db
                .select({bookId: bookGenres.bookId})
                .from(bookGenres)
                .where(inArray(bookGenres.genreId, matchedGenreIds));

            const filteredBookIds = relatedBooks.map((rb) => rb.bookId);

            if (filteredBookIds.length === 0) {
                return NextResponse.json({data: [], page, limit, total: 0});
            }

            conditions.push(inArray(books.id, filteredBookIds));
        }

        // Return all books
        if (noParams) {
            const allBooks = await db.select().from(books).limit(15);
            const booksWithGenres = await getBooksWithGenresByIds(allBooks.map((b) => b.id));
            return NextResponse.json(booksWithGenres);
        }

        // Count total
        const totalResult = await db
            .select({count: count()})
            .from(books)
            .where(conditions.length > 0 ? and(...conditions) : undefined);

        const total = Number(totalResult[0]?.count || 0);

        // Pagination query
        const paginatedBooks = await db
            .select()
            .from(books)
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .offset((page - 1) * limit)
            .limit(limit);

        const booksWithGenres = await getBooksWithGenresByIds(paginatedBooks.map((b) => b.id));

        return NextResponse.json({
            data: booksWithGenres,
            page,
            limit,
            total,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Failed to fetch books"}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const imageFile = formData.get("image") as File;

        const title = formData.get("title")?.toString();
        const author = formData.get("author")?.toString();
        const price = Number(formData.get("price"));
        const color = formData.get("color")?.toString();
        const summary = formData.get("summary")?.toString();
        const genreIds = formData.getAll("genres[]").map((g) => g.toString());

        if (!title || !author || !summary || !color) {
            return NextResponse.json({error: "همه فیلدها الزامی هستند."}, {status: 400});
        }

        if (!imageFile || !(imageFile instanceof File)) {
            return NextResponse.json({error: "تصویر معتبر نیست."}, {status: 400});
        }

        const imageUrl = await uploadImage(imageFile);

        const [createdBook] = await db
            .insert(books)
            .values({
                title,
                author,
                price,
                color,
                summary,
                image: imageUrl,
            })
            .returning();

        if (genreIds.length > 0) {
            await db.insert(bookGenres).values(
                genreIds.map((genreId) => ({
                    bookId: createdBook.id,
                    genreId,
                }))
            );
        }

        return NextResponse.json(createdBook, {status: 201});
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "مشکلی در ساخت کتاب بوجود آمد."}, {status: 500});
    }
}
