import React from 'react';
import {User} from "@/types";
import Image from "next/image";

export default function UserCard(props: Partial<User>) {
    return (
        <div className="bg-gray-100 rounded-lg p-3 flex flex-col items-center space-y-2 justify-center border overflow-hidden text-center border-gray-200">
            <Image src="/images/no-user.png" alt="no-user" width={45} height={45} className="rounded-full"/>
            <span className="font-semibold text-shadow-md text-sm">{props.fullName}</span>
            <span className="text-xs text-gray-600">{props.email}</span>
        </div>
    );
}