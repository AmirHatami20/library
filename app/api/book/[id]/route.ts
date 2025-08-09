import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db";
import {bookGenres, books, genres} from "@/db/schema";
import {eq} from "drizzle-orm";
import {uploadImage} from "@/lib/uploadImage";

export async function GET(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;

        const book = await db.select().from(books).where(eq(books.id, id));

        if (!book) {
            return NextResponse.json({error: "کتاب پیدا نشد"}, {status: 404});
        }

        const bookGenresWithNames = await db
            .select({
                genreId: bookGenres.genreId,
                bookId: bookGenres.bookId,
                genreName: genres.name,
            })
            .from(bookGenres)
            .leftJoin(genres, eq(bookGenres.genreId, genres.id))
            .where(eq(bookGenres.bookId, id))

        const relatedGenres = bookGenresWithNames.map((bg) => ({
            id: bg.genreId,
            name: bg.genreName,
        }))

        return NextResponse.json({
            ...book[0],
            genres: relatedGenres,
        })

    } catch {
        return NextResponse.json({error: "دریافت کتاب با خطا مواجه شد."}, {status: 500});
    }
}

export async function DELETE(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;

        await db.delete(books).where(eq(books.id, id));
        return NextResponse.json({message: "کتاب با موفقیت حذف شد."});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "حذف کتاب با خطا مواجه شد."}, {status: 500});
    }
}

export async function PUT(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;
        const formData = await req.formData();

        const imageFile = formData.get("image") as File | null;
        const title = formData.get("title")?.toString() || "";
        const author = formData.get("author")?.toString() || "";
        const price = Number(formData.get("price"));
        const color = formData.get("color")?.toString() || "";
        const summary = formData.get("summary")?.toString() || "";
        const genres = formData.getAll("genres[]") as string[];

        if (!title || !author || !color || !summary || isNaN(price)) {
            return NextResponse.json({error: "فیلدهای نامعتبر یا ناقص"}, {status: 400});
        }

        const updateData = {
            title,
            author,
            price,
            color,
            summary,
            ...(imageFile && imageFile instanceof File
                ? {image: await uploadImage(imageFile)}
                : {}),
        };

        await db.update(books)
            .set(updateData)
            .where(eq(books.id, id))
            .returning();

        await db.delete(bookGenres).where(eq(bookGenres.bookId, id));

        const genreEntries = genres.map((genreId) => ({
            bookId: id,
            genreId: genreId,
        }));

        if (genreEntries.length > 0) {
            await db.insert(bookGenres).values(genreEntries);
        }

        return NextResponse.json({message: "کتاب با موفقیت ویرایش شد."});
    } catch {
        return NextResponse.json({error: "ویرایش کتاب با خطا مواجه شد."}, {status: 500});
    }
}


