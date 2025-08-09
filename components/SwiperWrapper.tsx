'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperType} from 'swiper';
import {Navigation, Pagination} from "swiper/modules";
import {useEffect, useRef} from "react";
import {Book} from "@/types";
import BookCard from "@/components/Cards/BookCard";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
    title: string;
    items: Book[];
}

function SwiperWrapper({title, items}: Props) {
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        if (
            swiperRef.current &&
            swiperRef.current.params &&
            typeof swiperRef.current.params.navigation === 'object' &&
            swiperRef.current.navigation &&
            prevBtnRef.current &&
            nextBtnRef.current
        ) {
            swiperRef.current.params.navigation.prevEl = prevBtnRef.current;
            swiperRef.current.params.navigation.nextEl = nextBtnRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <div className="container md:my-8 my-4">
            <div className="flex justify-between items-center w-full">
                <h2 className="font-bold xl:text-2xl text-lg">
                    {title}
                </h2>
                <div className="flex gap-3">
                    <button
                        ref={prevBtnRef}
                        className="primary-button !p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6">
                            <path fillRule="evenodd"
                                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button
                        ref={nextBtnRef}
                        className="primary-button !p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6">
                            <path fillRule="evenodd"
                                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="md:mt-8 mt-4">
                {items.length ? (
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            480: {
                                slidesPerView: 3,
                            },
                            800: {
                                slidesPerView: 4,
                            },
                            1000: {
                                slidesPerView: 5,
                            },
                            1280: {
                                slidesPerView: 6,
                            },
                        }}
                        modules={[Pagination, Navigation]}
                        spaceBetween={30}
                    >
                        {items.map((book) => (
                            <SwiperSlide key={book.id}>
                                <BookCard {...book} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-center text-red-500 my-10">
                        محصولی یافت نشد.
                    </div>
                )}
            </div>
        </div>
    );
}

export default SwiperWrapper;
