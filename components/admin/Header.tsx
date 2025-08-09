'use client'

import {useState} from 'react';
import {CiSearch} from "react-icons/ci";
import {useSession} from "next-auth/react";

export default function Header() {
    const [searchValue, setSearchValue] = useState('');
    const {data: session} = useSession();

    return (
        <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-col">
                <span className="text-xl">خوش امدید، {session?.user.name?.split(' ')[0]} جان</span>
                <span className="text-sm text-gray-600">اینجا میتونی کتاب ها و کاربران را کنترل کنی.</span>
            </div>
            <form className="flex rounded-md border px-2 py-1.5 w-xs justify-between items-center border-[#CBD5E1]">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="outline-none p-1 text-sm"
                    placeholder="جستجو بین کتاب و کاربران..."
                />
                <button>
                    <CiSearch className="text-xl"/>
                </button>
            </form>
        </div>
    );
}