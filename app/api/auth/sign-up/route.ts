import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db"
import {users} from "@/db/schema";
import {eq} from "drizzle-orm";
import {hash} from "bcrypt";
import {uploadImage} from "@/lib/uploadImage";

export async function POST(req: NextRequest) {
    const formData = await req.formData()

    const fullName = formData.get("fullName")?.toString()
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    const imageFile = formData.get("image") as File;

    if (!fullName || !email || !password) {
        return NextResponse.json({error: "همه فیلد ها اجباری است"}, {status: 400});
    }

    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
        return NextResponse.json({error: "ایمیل وجود دارد."}, {status: 409});
    }

    const hashedPassword = await hash(password, 10);

    let imageUrl = "";

    if (imageFile && (imageFile as File).name && (imageFile as File).size > 0) {
        imageUrl = await uploadImage(imageFile as File);
    }

    await db.insert(users).values({
        fullName: fullName,
        email,
        password: hashedPassword,
        image: imageUrl || '',
    });

    return NextResponse.json({success: true}, {status: 201});
}