import {NextResponse, NextRequest} from "next/server";
import {db} from "@/db"
import {genres} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function DELETE(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;

        await db.delete(genres).where(eq(genres.id, id));
        return NextResponse.json({message: "ژانر با موفقیت حذف شد."});
    } catch {
        return NextResponse.json({error: "حذف ژانر با خطا مواجه شد."}, {status: 500});
    }
}

export async function PUT(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;
        const {name} = await req.json();

        if (!name) {
            return NextResponse.json({error: 'نام ژانر الزامی است'}, {status: 400});
        }
        const updated = await db
            .update(genres)
            .set({name})
            .where(eq(genres.id, id))
            .returning();

        if (!updated.length) {
            return NextResponse.json({error: 'ژانر یافت نشد'}, {status: 404});
        }

        return NextResponse.json(updated[0]);
    } catch {
        return NextResponse.json({error: 'خطایی در بروزرسانی ژانر رخ داد'}, {status: 500});
    }
}