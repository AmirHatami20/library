import React from 'react';
import Link from "next/link";

interface Props {
    children: React.ReactNode;
    href: string
    title: string
}

export default function DashboardWrapper({href, title, children}: Props) {
    return (
        <div className="bg-white shadow-sm p-3 h-full rounded-lg">
            <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{title}</span>
                <button
                    className="bg-[#F8F8FF] text-xs p-1.5 rounded-lg hover:bg-gray-600 hover:text-white duration-300 transition-colors"
                >
                    <Link href={href}>نمایش همه</Link>
                </button>
            </div>
            <div className="mt-4">
                {children}
            </div>
        </div>
    );
}