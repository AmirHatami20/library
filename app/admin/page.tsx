import React from 'react';
import {adminStats, users} from "@/constant";
import StatsCard from "@/components/admin/StatsCard";
import DashboardWrapper from "@/components/admin/DashboardWrapper";
import BookCard from "@/components/admin/cards/BookCard";
import {LiaPlusSolid} from "react-icons/lia";
import Link from "next/link";
import BookSaleCard from "@/components/admin/cards/BookSaleCard";
import UserCard from "@/components/admin/cards/UserCard";
import {bookService} from "@/service";
import {Book} from "@/types";

export default async function Page() {
    const books = await bookService.getAll();

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-5 md:my-8">
                {adminStats.map((stat, index) => (
                    <StatsCard key={index} percent={stat.percent} value={stat.value} label={stat.label}/>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">

                <DashboardWrapper href="admin/book" title="آخرین کتاب ها">
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/admin/book/new"
                            className="flex items-center gap-x-2 rounded-lg p-2 bg-gray-100 cursor-pointer border border-gray-300 hover:bg-gray-600 hover:text-white duration-300 transition-colors"
                        >
                            <div className="flex justify-center items-center w-10 h-10 text-xl rounded-full bg-white">
                                <LiaPlusSolid className="text-background"/>
                            </div>
                            <span>اضافه کردن کتاب</span>
                        </Link>
                        {books.slice(0, 6).map((book: Book) => (
                            <BookCard key={book.id} {...book} />
                        ))}
                    </div>
                </DashboardWrapper>

                <div className="grid grid-cols-1 grid-rows-2 gap-5">
                    <DashboardWrapper href="/admin/sales" title="لیست فروش ها">
                        <div className="flex flex-col space-y-3">
                            {books.slice(0, 3).map((book: Book) => (
                                <BookSaleCard key={book.id} {...book} />
                            ))}
                        </div>
                    </DashboardWrapper>

                    <DashboardWrapper href="/admin/user" title="لیست کاربران">
                        <div className="grid grid-cols-3 gap-5">
                            {users.map((user, index) => (
                                <UserCard key={index} {...user} />
                            ))}
                        </div>
                    </DashboardWrapper>
                </div>
            </div>
        </>
    );
}