import React from 'react';
import {Book} from "@/types";
import BookCover from "@/components/BookCover/BookCover";
import Link from "next/link";

export default function BookCard(props: Book) {
    const genresString = props.genres.map(genre => genre.name).join(' / ');

    return (
        <div className="flex flex-col space-y-5">
            <Link href={`/book/${props.id}`}>
                <BookCover
                    cover={props.image!}
                    color={props.color!}
                    variant="medium"
                />
            </Link>
            <div className="text-sm">
                <span className="font-semibold line-clamp-1">{props.title}</span>
                <span className="text-gray-300 line-clamp-1 mt-1">
                    {genresString}
                </span>
            </div>
        </div>
    );
}
