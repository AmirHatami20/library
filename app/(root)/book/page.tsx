'use client';

import React, {useEffect, useState} from 'react';
import MotionWrapper from "@/components/MotionWrapper";
import Image from "next/image";
import BookCard from "@/components/Cards/BookCard";
import {LiaAngleDownSolid} from "react-icons/lia";
import {CiSearch} from "react-icons/ci";
import {useBookAPI} from "@/hook/useBookAPI";
import {useGenreAPI} from "@/hook/useGenreAPI";

export default function Page() {
    const {useGetPaginatedBooks} = useBookAPI();
    const {useGetGenres} = useGenreAPI();

    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [filterBy, setFilterBy] = useState<string>('');
    const [showFilterBy, setShowFilterBy] = useState(false);
    const [page, setPage] = useState<number>(1);

    const {data: genres = []} = useGetGenres();
    const {data, isLoading} = useGetPaginatedBooks({
        page: page.toString(),
        limit: "6",
        search: debouncedSearch || undefined,
        bookGenres: filterBy || undefined
    });

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchValue]);

    const books = data?.data || [];

    const pageCount = Math.ceil(Number(data?.total) / Number(data?.limit));

    const toggleFilterDropdown = () => {
        setShowFilterBy(prev => !prev);
    };

    const clearSearch = () => {
        setSearchValue('');
        setFilterBy('');
    };

    return (
        <MotionWrapper>
            {/* Section Header */}
            <div className="flex flex-col text-center max-w-lg px-3 mx-auto space-y-2">
                <span className="text-lg font-semibold text-[#D6E0FF]">
                    کتاب فوق‌العاده بعدی خود را پیدا کنید
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-9 lg:leading-13">
                    کتابخانه ما را بگردید و هر{" "}
                    <span className="text-primary">کتابی</span>{" "}
                    را جستجو کنید
                </h3>
                <form
                    className="flex bg-[#232839] rounded-[10px] p-3 mt-2"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="جست و جو..."
                        className="w-full h-full text-sm placeholder-white bg-transparent outline-none text-white"
                    />
                    <button type="submit">
                        <CiSearch className="text-xl"/>
                    </button>
                </form>
            </div>

            {/* Section Content */}
            <section className="container mt-6">
                {/* Header */}
                <div className="flex justify-between items-center relative">
                    <span className="text-[#D6E0FF] text-xl">نتایج جستجو</span>
                    <div
                        className="h-8 py-2 px-4 bg-[#232839] rounded-md flex items-center gap-1 text-sm cursor-pointer select-none"
                        onClick={toggleFilterDropdown}
                    >
                        <p>فیلتر با :</p>
                        <span className="text-primary">
                            {filterBy || 'همه'}
                        </span>
                        <LiaAngleDownSolid className="text-primary"/>
                    </div>

                    {showFilterBy && (
                        <div
                            className="absolute grid grid-cols-2 gap-2 md:grid-cols-3 top-full left-0 mt-2 w-64 bg-[#1C1F2A] rounded-md shadow-md z-40 py-2"
                        >
                            {/* All */}
                            <div
                                onClick={() => {
                                    setFilterBy('');
                                    setShowFilterBy(false);
                                }}
                                className={`p-2 hover:bg-[#2A2E3E] cursor-pointer ${
                                    !filterBy ? "text-primary bg-[#2A2E3E]" : "text-white"
                                }`}
                            >
                                همه
                            </div>

                            {/* Genres */}
                            {genres.map((g) => (
                                <div
                                    key={g.id}
                                    onClick={() => {
                                        setFilterBy(g.name);
                                        setShowFilterBy(false);
                                    }}
                                    className={`p-2 hover:bg-[#2A2E3E] cursor-pointer line-clamp-2 ${
                                        filterBy === g.name ? "text-primary bg-[#2A2E3E]" : "text-white"
                                    }`}
                                >
                                    {g.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Books Grid */}
                {!isLoading ? (
                    books.length > 0 ? (
                       <>
                           <div
                               className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mt-5 md:mt-7"
                           >
                               {books.map((book) => (
                                   <BookCard key={book.id} {...book} />
                               ))}
                           </div>
                           <div className="flex w-full flex-row-reverse justify-center items-center mt-5 gap-x-3 direction-ltr">
                               {Array(pageCount).fill(0).map((_, i) => (
                                   <button
                                       key={i}
                                       className={`flex items-center justify-center text-sm w-7 h-7 rounded-sm ${
                                           page === i + 1 ? "bg-primary text-background" : "border border-primary/50 bg-[#232839]"
                                       }`}
                                       onClick={() => setPage(i + 1)}
                                   >
                                       {(i + 1).toLocaleString('fa')}
                                   </button>
                               ))}
                           </div>
                       </>
                    ) : (
                        <div className="flex flex-col items-center mt-8 md:mt-14 justify-center space-y-3">
                            <Image
                                src="/images/no-books.png"
                                alt="no-book"
                                width={120}
                                height={120}
                            />
                            <p>کتابی پیدا نشد.</p>
                            <button className="primary-button" onClick={clearSearch}>
                                پاک کردن سرچ
                            </button>
                        </div>
                    )
                ) : (
                    <div className="text-lg my-10 text-center w-full">
                        در حال بارگیری...
                    </div>
                )}
            </section>
        </MotionWrapper>
    );
}
