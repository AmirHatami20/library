import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db"
import {genres} from "@/db/schema";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {name} = body;

        if (!name) {
            return NextResponse.json({error: 'نام ژانر الزامی است'}, {status: 400});
        }

        const [created] = await db.insert(genres).values({name}).returning();

        return NextResponse.json(created, {status: 201});
    } catch {
        return NextResponse.json("خطایی در ساخت ژانر پیش آمده است.");
    }
}

export async function GET() {
    try {
        const result = await db.select().from(genres);
        return NextResponse.json(result);
    } catch {
        return NextResponse.json({error: 'خطایی در دریافت ژانر پیش آمده است'}, {status: 500});
    }
}