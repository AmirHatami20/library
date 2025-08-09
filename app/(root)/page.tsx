import Hero from "@/components/Hero";
import SwiperWrapper from "@/components/SwiperWrapper";
import MotionWrapper from "@/components/MotionWrapper";
import {bookService} from "@/service";

export default async function HomePage() {
    const books = await bookService.getAll()

    return (
        <MotionWrapper>
            <Hero {...books?.[0]} />
            <SwiperWrapper items={books} title="محبوب‌ترین کتاب‌ها"/>
            <SwiperWrapper items={books} title="جدیدترین کتاب‌ها"/>
        </MotionWrapper>
    );
}
