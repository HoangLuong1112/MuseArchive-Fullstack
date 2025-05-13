'use client'
import { SongProps } from '@/types/song'
import { useEffect, useState } from 'react'
import Carousel from '../component/Carousel'
import TrackCard from '../component/TrackCard'

export default function TrackPage() {
    const [tracks, setTracks] = useState<SongProps[]>([])

    useEffect(() => {
        fetch('/api/tracks')
        .then(res => res.json())
        .then(data => setTracks(data))
    }, [])

    return (
        <div className="">
            {/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
            <Carousel title="Các bài hát (Track) thịnh hành" items={tracks} renderItem={(item, i) => (
                <TrackCard key={i} trackName={item.title} coverUrl={item.albumArt} />
            )}/>
        </div>
    )
}
