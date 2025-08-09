import React from 'react';
import Image from "next/image";
import {IoTrashOutline} from "react-icons/io5";
import {users} from "@/constant";

export default function Page() {
    return (
        <div className="bg-white p-6 shadow-sm mt-5 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">تمام کابران</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-right">
                    <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                    <tr>
                        <th className="px-4 py-3">نام</th>
                        <th className="px-4 py-3">نقش</th>
                        <th className="px-4 py-3">ثبت نام در</th>
                        <th className="px-4 py-3">عملیات</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="flex gap-2 items-center px-4 py-3">
                                <Image src="/images/no-user.png" alt="user" width={35} height={35}/>
                                <div className="flex flex-col gap-y-0.5">
                                    <span className="text-sm">{user.fullName}</span>
                                    <span className="text-xs text-gray-600">{user.email}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="py-1.5 px-3 rounded-lg bg-red-300 text-red-600 w-fit text-sm">
                                    کاربر
                                </div>
                            </td>
                            <td className="px-4 py-3">1402/2/2</td>
                            <td className="px-4 py-3 text-xl">
                                <button className="text-red-600">
                                    <IoTrashOutline/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}