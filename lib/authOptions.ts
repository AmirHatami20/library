import {AuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';
import {db} from "@/db";
import {users} from "@/db/schema";
import {eq} from "drizzle-orm";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("لطفاً ایمیل و رمز عبور را وارد کنید.");
                }

                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email))
                    .limit(1);

                const foundUser = user[0];

                if (!foundUser || !foundUser.password) {
                    throw new Error("کاربری با این ایمیل پیدا نشد.");
                }

                const isValid = await bcrypt.compare(credentials.password, foundUser.password);

                if (!isValid) {
                    throw new Error("رمز عبور اشتباه است.");
                }

                return {
                    id: foundUser.id.toString(),
                    name: foundUser.fullName,
                    email: foundUser.email,
                    image: foundUser.image || '',
                    role: foundUser.role || "user",
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.image = user.image;
                token.role = user.role
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id as string;
                session.user.image = token.image as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};
