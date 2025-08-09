import React from 'react';
import BookCover from "@/components/BookCover/BookCover";
import {Book} from "@/types";
import {SlCalender} from "react-icons/sl";
import {FiEye} from "react-icons/fi";
import Image from "next/image";

export default function BookSaleCard(props: Book) {
    return (
        <div className="relative flex items-center gap-x-2 bg-gray-100 p-2 rounded-lg border border-gray-200">
            <BookCover cover={props.image!} color={props.color!} variant="small"/>
            <div className="flex flex-col gap-y-2">
                <span className="text-[#1E293B] font-semibold text-sm">{props.title}</span>
                <div className="flex items-center gap-x-1.5 text-xs text-slate-500">
                    <span>از {props.author}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"/>
                    {props.genres?.map((genre, index) => (
                        <span key={genre.id}>
                                {genre.name}
                            {index < props.genres.length - 1 && '/ '}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-x-3 text-xs">
                    <div className="flex items-center gap-x-1 text-[#3A354E]">
                        <Image src="/images/no-user.png" alt="no-user" width={20} height={20} className="rounded-full"/>
                        <span>امیر رضا حاتمی</span>
                    </div>
                    <div className="flex gap-x-1 pt-1">
                        <SlCalender/>
                        1402/2/3
                    </div>
                </div>
            </div>
            <button
                className="absolute flex items-center justify-center text-gray-600 left-2 top-2 rounded-lg w-7 h-7 bg-white">
                <FiEye/>
            </button>
        </div>
    );
}