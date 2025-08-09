'use client'

import React from 'react';
import Hero from "@/components/Hero";
import BookCard from "@/components/Cards/BookCard";
import MotionWrapper from "@/components/MotionWrapper";
import {useBookAPI} from "@/hook/useBookAPI";
import {useParams} from "next/navigation";

export default function Page() {
    const {id} = useParams();
    const {useGetBook, useGetPaginatedBooks} = useBookAPI();

    const {data: book, isLoading: isLoadingBook} = useGetBook(id ? id as string : '');

    const bookCategories = React.useMemo(
        () => book?.genres?.map((g) => g.name),
        [book]
    );

    const {data, isLoading: isLoadingBooks} = useGetPaginatedBooks({
        page: "1",
        limit: "12",
        bookGenres: Array.isArray(bookCategories) ? bookCategories : []
    });


    const books = data?.data.filter(book => book.id !== id);

    if (!id) {
        return <div className="text-center my-10">شناسه کتاب یافت نشد.</div>;
    }

    if (isLoadingBook || isLoadingBooks) {
        return <div className="text-lg my-10 text-center w-full">در حال بارگیری...</div>;
    }

    if (!book) {
        return <div className="text-center my-10">کتاب پیدا نشد.</div>;
    }

    return (
        <MotionWrapper>
            <Hero {...book} />
            <section className="container grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h3 className="text-lg font-semibold">کتاب های مرتبط</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-5">
                        {books?.slice(0, 6)?.map(book => (
                            <BookCard key={book.id} {...book} />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col space-y-5">
                    <div>
                        <h3 className="text-lg font-semibold">خلاصه</h3>
                        <p className="leading-7 text-gray-200">{book.summary}</p>
                    </div>
                </div>
            </section>
        </MotionWrapper>
    );
}
