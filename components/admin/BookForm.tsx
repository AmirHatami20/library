'use client';

import {toast} from 'react-hot-toast';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {LuMoveRight} from 'react-icons/lu';
import FormField from '@/components/Auth/FormFiled';
import {VscCloudUpload} from 'react-icons/vsc';
import {BookFormData, Genre} from '@/types';
import {useBookAPI} from "@/hook/useBookAPI";
import {useGenreAPI} from "@/hook/useGenreAPI";
import {AxiosError} from "axios";
import {FaAngleDown} from "react-icons/fa"

export default function Page({bookId}: { bookId?: string }) {
    const [form, setForm] = useState<BookFormData>({
        title: '',
        author: '',
        genres: [],
        price: '',
        image: null,
        imagePreview: '',
        color: '#ffffff',
        summary: '',
    });
    const [showGenreDropdown, setShowGenreDropdown] = useState(false);

    const {useGetBook, useUpdateBook, useCreateBook} = useBookAPI()
    const {useGetGenres} = useGenreAPI()

    const {data: book, isLoading} = useGetBook(bookId as string);
    const {data: genres, isLoading: isLoadingGenres} = useGetGenres()
    const createBook = useCreateBook();
    const updateBook = useUpdateBook();

    useEffect(() => {
        if (bookId && book) {
            setForm({
                title: book.title || "",
                author: book.author || "",
                genres: book.genres || [],
                price: book.price.toString(),
                image: null,
                imagePreview: book.image || "",
                color: book.color,
                summary: book.summary || "",
            });
        }
    }, [book, bookId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'price' ? Number(value) || 0 : value,
        }));
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleToggle = (genre: Genre) => {
        const exist = form.genres.find((g) => g.id === genre.id);

        if (exist) {
            setForm(prev => ({
                ...prev,
                genres: prev.genres.filter((g) => g.id !== genre.id),
            }))
        } else {
            setForm(prev => ({
                ...prev,
                genres: [...prev.genres, genre],
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!form.title || !form.author || !form.genres) {
                toast.error('عنوان، نویسنده و ژانر الزامی هستند .');
                return;
            }

            const formData = new FormData();
            Object.entries(form).forEach(([key, val]) => {
                if (val != null && key !== 'imagePreview') {
                    if (key === 'genres') {
                        form.genres.forEach((genre) => {
                            formData.append('genres[]', genre.id.toString());
                        });
                    } else {
                        formData.append(key, val as Blob | string);
                    }
                }
            });

            try {
                if (bookId) {
                    await updateBook.mutateAsync({id: bookId, formData});
                    toast.success('کتاب با موفقیت ویرایش شد.');
                } else {
                    await createBook.mutateAsync(formData);
                    toast.success('کتاب جدید با موفقیت ثبت شد.');
                    setForm({
                        title: "",
                        price: "",
                        image: null,
                        color: "#ffffff",
                        summary: "",
                        author: "",
                        genres: [],
                        imagePreview: ""
                    })
                }
            } catch (error) {
                const err = error as AxiosError<{ error?: string }>;
                const message = err.response?.data?.error || 'خطایی رخ داده است.';
                toast.error(message);
            }
        } catch {
            toast.error('خطا در ذخیره اطلاعات کتاب');
        }
    };

    return (
        <div className="mt-5">
            <Link
                href="/admin/book"
                className="flex gap-x-1.5 items-center bg-white p-1.5 rounded-lg w-max text-sm border border-gray-300"
            >
                <LuMoveRight/>
                برگشت
            </Link>

            {!isLoading && !isLoadingGenres ? (
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
                >
                    <FormField
                        label="نام کتاب"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="نام کتاب"
                        variant="admin"
                    />
                    <FormField
                        label="نویسنده"
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        placeholder="نویسنده"
                        variant="admin"
                    />

                    <div className="flex flex-col space-y-1 relative z-30">
                        <label className="text-sm">دسته‌بندی‌ها</label>
                        <div
                            onClick={() => setShowGenreDropdown(prev => !prev)}
                            className="flex justify-between items-center bg-white p-2 border border-[#CBD5E1] rounded cursor-pointer select-none"
                        >
                            <div>
                                {form.genres.length > 0
                                    ? form.genres.map(g => g.name).join("/ ")
                                    : 'انتخاب کنید...'}
                            </div>
                            <FaAngleDown className={`transition-transform duration-300 text-gray-700 ${
                                showGenreDropdown ? 'rotate-180' : ''
                            }`}/>
                        </div>

                        {showGenreDropdown && (
                            <div
                                className="grid grid-cols-2 lg:grid-cols-3 items-center absolute top-full w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded shadow-md space-y-1 p-2 z-50"
                            >
                                {genres?.map((genre) => (
                                    <label
                                        key={genre.id}
                                        className="flex items-center space-x-2  text-sm cursor-pointer hover:bg-gray-50 rounded transition-all"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={form.genres.some(g => g.id === genre.id)}
                                            onChange={() => handleToggle(genre)}
                                            className="accent-[#25388C]"
                                        />
                                        <span>{genre.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>


                    <FormField
                        label="قیمت"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="قیمت"
                        variant="admin"
                    />

                    {/* رنگ جلد */}
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="color" className="text-sm">
                            رنگ جلد
                        </label>
                        <div className="flex gap-x-2 items-center bg-white p-2 rounded border border-[#CBD5E1]">
                            <input
                                type="color"
                                name="color"
                                value={form.color}
                                onChange={handleChange}
                                className="w-10 h-6 p-0 border rounded border-gray-300"
                            />
                            <span>{form.color}</span>
                        </div>
                    </div>

                    {/* تصویر */}
                    <div
                        className="flex items-center justify-center border border-[#CBD5E1] w-full rounded h-22 bg-white cursor-pointer"
                        onClick={() => document.getElementById('image')?.click()}
                    >
                        {form.imagePreview ? (
                            <img
                                src={form.imagePreview}
                                alt="preview"
                                className="w-20 h-20 border object-contain"
                            />
                        ) : (
                            <div className="flex items-center gap-x-2 text-sm text-gray-600 justify-center w-full">
                                آپلود عکس
                                <VscCloudUpload className="text-3xl"/>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            className="hidden"
                            onChange={handleImage}
                        />
                    </div>

                    {/* خلاصه */}
                    <div className="flex flex-col space-y-1 col-span-full">
                        <label htmlFor="summary" className="text-sm">
                            خلاصه کتاب
                        </label>
                        <textarea
                            name="summary"
                            className="admin-input min-h-40"
                            placeholder="خلاصه"
                            value={form.summary}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={createBook.isPending || updateBook.isPending}
                        className={`col-span-full w-1/2 rounded-lg py-2 mx-auto text-white ${
                            createBook.isPending || updateBook.isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25388C]'
                        }`}
                    >
                        {bookId
                            ? updateBook.isPending
                                ? 'در حال بروزرسانی...'
                                : 'ذخیره تغییرات'
                            : createBook.isPending
                                ? 'در حال ساخت...'
                                : 'ساخت کتاب'}
                    </button>
                </form>
            ) : (
                <div className="text-center bg-white text-gray-600 py-10 mt-4">
                    در حال بارگیری...
                </div>
            )}
        </div>
    );
}
