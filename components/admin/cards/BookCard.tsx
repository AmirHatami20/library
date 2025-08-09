import React from 'react';
import BookCover from "@/components/BookCover/BookCover";
import {Book} from "@/types";
import {SlCalender} from "react-icons/sl";

export default function BookCard(props: Book) {
    return (
        <div className="flex items-center gap-x-2 p-2 bg-gray-100 rounded-lg border border-gray-200">
            <BookCover cover={props.image!} color={props.color!} variant="small"/>
            <div className="flex flex-col gap-y-2">
                <span className="text-[#1E293B] font-semibold text-sm">{props.title}</span>
                <div className="flex items-center gap-x-1.5 text-xs text-slate-500">
                    <span>از {props.author}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"/>
                    <div className="">
                        {props.genres?.map((genre, index) => (
                            <span key={genre.id}>
                                {genre.name}
                                {index < props.genres.length - 1 && '/ '}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex gap-x-1 pt-1 text-xs">
                    <SlCalender/>
                    1402/2/3
                </div>
            </div>
        </div>
    );
}