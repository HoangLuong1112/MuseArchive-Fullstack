'use client';

import { useRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

//Carousel tổng quát
interface CarouselProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
}

export default function Carousel<T>({ title, items, renderItem }: CarouselProps<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                {/* <div className="space-x-2 hidden md:flex">
                    <button onClick={() => scroll('left')} className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => scroll('right')} className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div> */}
            </div>

            <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth">
                {items.map((item, index) => renderItem(item, index))}
            </div>
        </div>
    );
}
