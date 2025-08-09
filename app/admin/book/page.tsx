'use client';

import React from 'react';
import BookCover from "@/components/BookCover/BookCover";
import {IoTrashOutline} from "react-icons/io5";
import {CiEdit} from "react-icons/ci";
import {AiOutlinePlus} from "react-icons/ai";
import Link from "next/link";
import {useBookAPI} from "@/hook/useBookAPI";
import {toast} from "react-hot-toast";
import {AxiosError} from "axios";

export default function Page() {
    const {useGetBooks, useDeleteBook} = useBookAPI();

    const {data: books = [], isLoading} = useGetBooks();
    const deleteBook = useDeleteBook();

    const handleDelete = async (id: string) => {
        try {
            await deleteBook.mutateAsync(id);
            toast.success("کتاب با موفقیت حذف شد.");
        } catch (error) {
            const err = error as AxiosError<{ error?: string }>;
            const message = err.response?.data?.error || 'خطایی رخ داده است.';
            toast.error(message);
        }
    };

    return (
        <div className="bg-white p-6 shadow-sm mt-5 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">تمام کتاب‌ها</h2>
                <Link
                    href="/admin/book/new"
                    className="flex gap-x-2 items-center text-sm bg-[#25388C] text-white p-2 rounded-lg cursor-pointer"
                >
                    <span>ساخت کتاب جدید</span>
                    <AiOutlinePlus/>
                </Link>
            </div>

            {!isLoading ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-right">
                        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                        <tr>
                            <th className="px-4 py-3">نام کتاب</th>
                            <th className="px-4 py-3">نویسنده</th>
                            <th className="px-4 py-3">ژانر</th>
                            <th className="px-4 py-3">قیمت</th>
                            <th className="px-4 py-3">عملیات</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td className="flex gap-2 items-center px-4 py-3 font-semibold text-shadow-xs">
                                    <BookCover
                                        cover={book.image}
                                        color={book.color}
                                        variant="extraSmall"
                                    />
                                    {book.title}
                                </td>
                                <td className="px-4 py-3">{book.author}</td>
                                <td className="px-4 py-3">
                                    {book.genres?.map((genre, index) => (
                                        <span key={genre.id || index}>
                                            {genre.name}
                                            {index < book.genres.length - 1 && '/ '}
                                        </span>
                                    ))}
                                </td>
                                <td className="px-4 py-3 text-[#25388C]">
                                    {book.price === 0 ? (
                                        <span>رایگان</span>
                                    ) : (
                                        <>
                                            {book.price.toLocaleString('fa')}{" "}
                                            <span>تومان</span>
                                        </>
                                    )}
                                </td>
                                <td className="flex items-center gap-x-2 px-4 py-3 text-2xl">
                                    <Link
                                        href={`/admin/book/edit/${book.id}`}
                                        className="text-blue-600"
                                    >
                                        <CiEdit/>
                                    </Link>
                                    <button onClick={() => handleDelete(book.id)} className="text-red-600">
                                        <IoTrashOutline/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-lg my-10 text-center w-full">در حال بارگیری...</div>
            )}
        </div>
    );
}
