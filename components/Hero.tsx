import React from 'react';
import {Book} from "@/types";
import BookCover from "@/components/BookCover/BookCover";
import {FaBookOpen, FaRegStar} from "react-icons/fa6";
import Link from "next/link";

export default function Hero(props: Book) {
    return (
        <section
            className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-20 xl:gap-30 my-4 md:mt-8 md:mb-14">
            <div className="flex items-center md:items-start flex-col md:py-8 gap-5 order-2 md:order-1">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[45px] font-semibold">{props.title}</h1>

                <div className="flex flex-wrap justify-center items-center gap-5">
                    <p>
                        نویسنده: {" "}
                        <span className="font-semibold text-primary">{props.author}</span>
                    </p>
                    <p>
                        دسته بندی: {" "}
                        <span className="font-semibold text-primary">
                            {props.genres?.map((genre, index) => (
                                <span key={genre.id}>
                                    {genre.name}
                                    {index < props.genres.length - 1 && ' / '}
                                </span>
                            ))}
                        </span>
                    </p>

                    <div className="flex items-center gap-x-1">
                        <p>۵ / {" "}
                            <span className="font-semibold text-primary">۵</span>
                        </p>
                        <FaRegStar className="text-primary text-lg pb-1"/>
                    </div>
                </div>

                <p className="text-gray-300 line-clamp-3">{props.summary}</p>

                <div className="flex justify-between items-center flex-wrap gap-x-4 w-full">
                    <Link href={`/book/${props.id}`}>
                        <button className="primary-button w-max mt-1 !py-2">
                            اطلاعات کتاب
                            <FaBookOpen className="text-lg"/>
                        </button>
                    </Link>
                    <div className="">
                        <span className="text-gray-200 text-lg">قیمت: </span>
                        <span className="text-primary font-semibold text-lg">{props.price === 0 ? "رایگان" : props.price?.toLocaleString("fa")}</span>
                    </div>

                </div>
            </div>
            <div className="relative flex justify-center lg:justify-start flex-1 order-1 md:order-2">
                <div className="relative">
                    <BookCover
                        variant="wide"
                        className="z-10"
                        color={props.color!}
                        cover={props.image!}
                    />

                    <div className="absolute right-30 top-0 -rotate-8 opacity-70 blur-xs hidden lg:block">
                        <BookCover
                            variant="wide"
                            color={props.color!}
                            cover={props.image!}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}