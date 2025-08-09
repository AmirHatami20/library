'use client'

import React, {useState} from 'react';
import Link from "next/link";
import {LuMoveRight} from "react-icons/lu";
import FormField from "@/components/Auth/FormFiled";
import {useGenreAPI} from "@/hook/useGenreAPI";
import {toast} from "react-hot-toast";
import {AxiosError} from "axios";

export default function Page() {
    const [name, setName] = useState<string>('');

    const {useCreateGenre} = useGenreAPI();
    const createGenre = useCreateGenre();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            toast.error("لطفا نام را وارد نمایید.")
            return;
        }

        try {
            await createGenre.mutateAsync({name})
            toast.success("ژانر با موفقیت ساخته شد.")
            setName("");
        } catch (error) {
            const err = error as AxiosError<{ error?: string }>;
            const message = err.response?.data?.error || 'خطایی رخ داده است.';
            toast.error(message);
        }
    }

    return (
        <div className="mt-5">
            <Link
                href="/admin/genre"
                className="flex gap-x-1.5 items-center bg-white p-1.5 rounded-lg w-max text-sm border border-gray-300"
            >
                <LuMoveRight/>
                برگشت
            </Link>

            <form
                onSubmit={handleSubmit}
                className="flex max-w-sm mx-auto mt-6 flex-col gap-y-3"
            >
                <FormField
                    label="نام ژانر"
                    placeholder="نام ژانر"
                    name={name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="admin"
                />
                <button
                    type="submit"
                    disabled={createGenre.isPending}
                    className={`col-span-full w-1/2 rounded-lg py-2 mx-auto text-white ${
                        createGenre.isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25388C]'
                    }`}
                >
                    {createGenre.isPending ? "در حال ساخت..." : "ساخت ژانر"}
                </button>
            </form>
        </div>
    );
}