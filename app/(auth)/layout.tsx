'use client';

import React, {ReactNode} from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
    return (
        <main className="relative text-white grid min-h-screen grid-cols-1 bg-background md:grid-cols-2">
            {/* Left Section - Content */}
            <section className="flex h-screen w-full items-center justify-center px-6">
                <div
                    className="w-full max-w-[400px]  space-y-3 rounded-xl bg-black p-6 border border-primary shadow shadow-primary"
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/icons/logo.svg"
                            alt="لوگوی کتابخانه آنلاین"
                            width={40}
                            height={40}
                            priority
                        />
                        <span className="text-lg font-bold">کتابخانه آنلاین</span>
                    </Link>

                    {/* Content Slot */}
                    {children}
                </div>
            </section>

            {/* Right Section - Illustration */}
            <section className="sticky top-0 hidden h-screen w-full md:block">
                <div className="absolute h-full w-full bg-background/20"></div>
                <Image
                    src="/images/auth-illustration.png"
                    alt="تصویر احراز هویت"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover"
                    priority
                />
            </section>
        </main>
    );
}
