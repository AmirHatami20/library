'use client';

import React from "react";
import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-primary/50 py-8 px-4 mt-10">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo or Name */}
                <div className="text-lg font-bold text-white">
                    کتاب‌خانه‌ی من
                </div>

                {/* Links */}
                <nav className="flex gap-6 text-sm">
                    <Link href="/public" className="hover:text-white transition-colors">خانه</Link>
                    <Link href="/public" className="hover:text-white transition-colors">درباره ما</Link>
                    <Link href="/public" className="hover:text-white transition-colors">تماس با ما</Link>
                </nav>

                {/* Copyright */}
                <div className="text-xs text-gray-400 text-center md:text-right">
                    © {year} همه حقوق محفوظ است.
                </div>
            </div>
        </footer>
    );
}
