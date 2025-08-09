'use client'

import React from 'react';
import Link from "next/link";
import {AiOutlinePlus} from "react-icons/ai";
import {useGenreAPI} from "@/hook/useGenreAPI";
import {AxiosError} from "axios";
import {toast} from "react-hot-toast";
import {IoTrashOutline} from "react-icons/io5";

export default function Page() {
    const {useGetGenres, useDeleteGenre} = useGenreAPI();

    const {data: genres = [], isLoading} = useGetGenres();
    const deleteGenre = useDeleteGenre();

    const handleDelete = async (id: string) => {
        try {
            await deleteGenre.mutateAsync(id)
        } catch (error) {
            const err = error as AxiosError<{ error?: string }>;
            const message = err.response?.data?.error || 'خطایی رخ داده است.';
            toast.error(message);
        }
    }


    return (
        <div className="bg-white p-6 shadow-sm mt-5 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">تمام ژانر ها</h2>
                <Link
                    href="/admin/genre/new"
                    className="flex gap-x-2 items-center text-sm bg-[#25388C] text-white p-2 rounded-lg cursor-pointer"
                >
                    <span>ساخت ژانر جدید</span>
                    <AiOutlinePlus/>
                </Link>
            </div>
            {!isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {genres?.map((genre) => (
                        <div key={genre.id} className="flex justify-between text-lg bg-gray-100 p-3 rounded-lg">
                            <span>{genre.name}</span>
                            <button onClick={() => handleDelete(genre.id)} className="text-red-600">
                                <IoTrashOutline/>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-lg my-10 text-center w-full">در حال بارگیری...</div>
            )}
        </div>
    );
}