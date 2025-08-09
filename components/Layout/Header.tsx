'use client';

import React, {FormEvent, useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {RxHamburgerMenu} from "react-icons/rx";
import {CiSearch} from "react-icons/ci";
import {TbLogin, TbLogout2} from "react-icons/tb";
import {signOut, useSession} from "next-auth/react";
import Overlay from "@/components/Overlay";
import {toast} from "react-hot-toast";
import {RiAdminLine} from "react-icons/ri";
import {FaRegUser} from "react-icons/fa";
import {IoHomeOutline} from "react-icons/io5";
import {LiaBookSolid} from "react-icons/lia";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();
    const {data: session} = useSession();
    const user = session?.user || null;

    useEffect(() => {
        document.body.style.overflow = showMenu ? 'hidden' : 'auto';
    }, [showMenu]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/book?${searchValue}`);
    };

    const handleLogout = () => {
        setShowUserMenu(false);
        setShowMenu(false);
        signOut({redirect: false}).then(() => {
            toast.success("با موفقیت از حساب خود خارج شدید.");
            router.refresh();
        });
    };

    // Main navigation menu
    const mainMenu = [
        {label: "صفحه اصلی", href: "/", icon: <IoHomeOutline/>},
        {label: "همه کتاب ها", href: "/book", icon: <LiaBookSolid/>},
    ];

    // Regular user menu
    const userMenu = [
        {label: "پروفایل", href: "/profile", icon: <FaRegUser/>},
    ];

    // Admin-specific menu
    const adminMenu = [
        {label: "پنل ادمین", href: "/admin", icon: <RiAdminLine/>},
    ];

    return (
        <header className="container my-4 md:my-8 flex justify-between items-center relative z-50">
            {/* Mobile menu toggle button */}
            <button
                className="md:hidden w-6 h-6 z-50 relative"
                onClick={() => setShowMenu(prev => !prev)}
                aria-label="toggle mobile menu"
            >
                <RxHamburgerMenu className="text-2xl"/>
            </button>

            {/* Desktop navigation */}
            <div className="flex items-center gap-x-4">
                <Link href="/" className="flex items-center gap-x-3">
                    <Image
                        src="/icons/logo.svg"
                        alt="logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-10 h-auto"
                    />
                    <span className="font-bold text-lg hidden md:inline">کتابخانه آنلاین</span>
                </Link>
                {mainMenu.map((item, idx) => (
                    <Link key={idx} href={item.href} className="hidden md:inline">
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Search bar + user menu (desktop) */}
            <div className="hidden md:flex items-center gap-x-4">
                <form
                    onSubmit={handleSearch}
                    className="rounded-full bg-[#232839] py-2 px-3 w-52 text-sm flex"
                >
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full h-full outline-none placeholder-white"
                        placeholder="جست و جو..."
                    />
                    <button type="submit">
                        <CiSearch className="text-xl"/>
                    </button>
                </form>

                {user ? (
                    <div className="relative">
                        <img
                            src={user.image || "/images/no-user.png"}
                            alt="user"
                            className="w-11 h-11 relative z-30 rounded-full shadow border border-black shadow-primary cursor-pointer"
                            onClick={() => setShowUserMenu(prev => !prev)}
                        />
                        {showUserMenu && <Overlay closeOverlay={() => setShowUserMenu(false)}/>}
                        <div
                            className={`absolute left-0 mt-2 z-50 w-48 rounded-md bg-[#1f2937] shadow shadow-primary p-2 text-sm text-white space-y-2 transition-all duration-300 ease-in-out 
                                ${showUserMenu ? "opacity-100 visible" : "opacity-0 invisible"}`}
                        >
                            <p className="px-2 pt-1 pb-2 border-b border-gray-600">
                                خوش آمدی، {user.name?.split(' ')[0]}
                            </p>

                            {user.role === "admin" &&
                                adminMenu.map((item, idx) => (
                                    <Link key={idx} href={item.href}
                                          className="flex items-center gap-x-1 px-2 py-1 hover:bg-[#374151] rounded">
                                        {item.icon} {item.label}
                                    </Link>
                                ))}

                            {userMenu.map((item, idx) => (
                                <Link key={idx} href={item.href}
                                      className="flex items-center gap-x-1 px-2 py-1 hover:bg-[#374151] rounded">
                                    {item.icon} {item.label}
                                </Link>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-x-1 w-full py-1 px-2 hover:bg-red-600 rounded"
                            >
                                <TbLogout2/> خروج
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link href="/sign-in">
                        <button className="primary-button">ورود</button>
                    </Link>
                )}
            </div>

            {/* Mobile login button */}
            {user ? (
                <img
                    src={user.image || "/images/no-user.png"}
                    alt="user"
                    className="w-9 md:hidden h-9 rounded-full shadow border border-black shadow-primary cursor-pointer"
                />
            ) : (
                <Link href="/sign-in" className="md:hidden">
                    <TbLogin className="text-2xl"/>
                </Link>
            )}

            {/* Mobile menu */}
            {showMenu && <Overlay closeOverlay={() => setShowMenu(false)}/>}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white text-sm text-black z-50 transform transition-transform duration-300 ease-in-out
                ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <h3 className="font-bold text-lg">کتابخانه آنلاین</h3>
                    <button onClick={() => setShowMenu(false)} className="text-2xl">&times;</button>
                </div>
                <ul className="flex flex-col gap-3 p-4">
                    {mainMenu.map((item, idx) => (
                        <li key={idx}>
                            <Link href={item.href} className="flex items-center gap-x-2"
                                  onClick={() => setShowMenu(false)}>
                                {item.icon} {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                {user && (
                    <ul className="flex flex-col gap-3 p-4 border-t border-gray-300">
                        {user.role === "admin" &&
                            adminMenu.map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} className="flex items-center gap-x-2">
                                        {item.icon} {item.label}
                                    </Link>
                                </li>
                            ))}

                        {userMenu.map((item, idx) => (
                            <li key={idx}>
                                <Link href={item.href} className="flex items-center gap-x-2">
                                    {item.icon} {item.label}
                                </Link>
                            </li>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-x-2"
                        >
                            <TbLogout2/> خروج
                        </button>
                    </ul>
                )}
            </div>
        </header>
    );
}
