'use client'

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {adminSideBarLinks} from "@/constant";
import {usePathname} from "next/navigation";
import {TbLogout2} from "react-icons/tb";
import {FaBarsStaggered} from "react-icons/fa6";
import {useSession} from "next-auth/react";

export default function Sidebar() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const pathName = usePathname()
    const {data: session} = useSession()

    const handleSidebar = () => {
        setOpenSidebar(prevState => !prevState);
    }

    useEffect(() => {
        setOpenSidebar(false);
    }, [pathName]);

    return (
        <aside>
            <div className={`fixed h-full right-0 z-30 w-64 bg-white flex flex-col shadow-xl duration-300 ease-in-out ${
                openSidebar ? 'translate-x-0' : 'translate-x-full'
            } md:translate-x-0`}
            >
                {/* Logo */}
                <div className="p-4 border-b border-dashed border-gray-400">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-x-3">
                            <Image src="/favicon.ico" alt="logo" width={35} height={35}/>
                            <span className="font-bold text-lg hidden md:inline">کتابخانه آنلاین</span>
                        </Link>
                        <button className="text-xl md:hidden" onClick={handleSidebar}>
                            x
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <ul className="flex flex-col space-y-1 p-4">
                        {adminSideBarLinks.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.route}
                                    className={`flex items-center gap-x-2 p-2 rounded-lg ${
                                        link.route === pathName ? "bg-[#25388C] text-white" : "text-gray-700"
                                    }`}
                                >
                                    <link.Icon className="text-xl "/>
                                    <span>{link.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="flex items-center rounded-full border border-gray-200 mx-3 py-1.5 px-2.5 justify-between mb-4">
                        <Image src="/images/no-user.png" alt="no-user" width={35} height={35} className="rounded-full"/>
                        <div className="flex flex-col">
                            <span className="text-sm">{session?.user.name}</span>
                            <span className="text-[10px] text-gray-600">{session?.user.email}</span>
                        </div>
                        <Link href="/" className="cursor-pointer">
                            <TbLogout2 className="text-2xl text-red-500"/>
                        </Link>

                    </div>
                </div>
            </div>

            {openSidebar && (
                <div className="fixed bg-black/30 backdrop-blur-xs z-20 w-full min-h-screen cursor-pointer"
                     onClick={handleSidebar}
                />
            )}

            {/* Trigger btn */}
            <button className="px-5 py-3 block md:hidden" onClick={handleSidebar}>
                <FaBarsStaggered className='text-xl'/>
            </button>
        </aside>
    );
}