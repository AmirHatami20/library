import Hero from "@/components/Hero";
import SwiperWrapper from "@/components/SwiperWrapper";
import MotionWrapper from "@/components/MotionWrapper";
import {bookService} from "@/service";

export default async function HomePage() {
    const books = await bookService.getAll()
    const shuffledBooks = [...books].sort(() => Math.random() - 0.5)

    return (
        <MotionWrapper>
            <Hero {...books?.[0]} />
            <SwiperWrapper items={books} title="جدیدترین کتاب‌ها"/>
            <SwiperWrapper items={shuffledBooks} title="محبوب‌ترین کتاب‌ها"/>
        </MotionWrapper>
    );
}
