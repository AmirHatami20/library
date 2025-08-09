'use client';

import React from "react";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: "w-[28.95px] h-10",
    small: "w-[55px] h-[76px]",
    medium: "w-full h-[205px]",
    regular: "xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]",
    wide: "xs:w-[316px] w-[256px] xs:h-[400px] h-[304px]",
};

interface Props {
    className?: string;
    variant?: BookCoverVariant;
    color: string;
    cover: string;
}

const BookCover = (
    {
        className = "",
        variant = "regular",
        color,
        cover,
    }: Props) => {
    return (
        <div
            className={`relative transition-all duration-300 ${variantStyles[variant]} ${className}`}
        >
            {/* Background */}
            <BookCoverSvg color={color}/>

            {/* Image */}
            <div
                className="absolute z-10 overflow-hidden rounded-sm"
                style={{left: "12%", width: "87.5%", height: "87.5%"}}
            >
                <img
                    src={cover}
                    alt="Book cover"
                    className="w-full h-full object-fill"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default BookCover;
