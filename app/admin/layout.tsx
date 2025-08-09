import {ReactNode} from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export const metadata = {
    title: 'داشبورد ادمین | مدیریت',
};


export default function Layout({children}: { children: ReactNode }) {

    return (
        <main>
            <Sidebar/>
            <section className="flex-1 md:mr-64 min-h-screen flex flex-col overflow-y-auto bg-[#EDF1F1] p-5">
                <Header/>
                {children}
            </section>
        </main>
    )
}