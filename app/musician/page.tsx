import { Musician } from '@/types/song'
import { useEffect, useState } from 'react'
import Carousel from '../component/Carousel'
import MusicianCard from '../component/MusicianCard'

export default function MusicianPage() {
    const [musicians, setMusicians] = useState<Musician[]>([])

    useEffect(() => {
        fetch('/api/musicians')
        .then(res => res.json())
        .then(data => setMusicians(data))
    }, [])

    return (
        <div className="">
            {/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
            <Carousel title="Nhạc sĩ hiện tại" items={musicians} renderItem={(musician, i) => (
                <MusicianCard key={i} musicianName={musician.musicianName} coverUrl={musician.coverUrl} />
            )}/>
        </div>
    )
}
