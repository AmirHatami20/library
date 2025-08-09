import React from "react";
import {HiArrowDown, HiArrowUp} from 'react-icons/hi';

interface Props {
    label: string;
    value: string | number;
    percent: number;
}

export default function StatCard({label, value, percent}: Props) {
    const isPositive = percent >= 0;

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                    <span className="text-[#64748B] font-medium">{label}</span>

                    <div
                        className={`flex items-center gap-x-1 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-500'}`}
                    >
                        {isPositive ? <HiArrowUp className="w-4 h-4"/> : <HiArrowDown className="w-4 h-4"/>}
                        <span>{Math.abs(percent)}%</span>
                    </div>
                </div>

                <span className="text-2xl md:text-3xl font-bold">{value}</span>
            </div>
        </div>
    );
}
