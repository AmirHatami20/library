import {ReactNode} from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-white">
            <Header/>
            <div className="flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
}