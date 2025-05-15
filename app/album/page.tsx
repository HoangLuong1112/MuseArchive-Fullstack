'use client'
import { Album } from '@/types/song'
import { useEffect, useState } from 'react'
import Carousel from '../component/Carousel'
import AlbumCard from '../component/AlbumCard'

export default function AlbumPage() {
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() => {
        fetch('/api/albums')
        .then(res => res.json())
        .then(data => setAlbums(data))
    }, [])

    return (
        <div className="">
            {/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
            <Carousel title="Album hiện tại" items={albums} renderItem={(al, i) => (
                <AlbumCard key={i} id={al.id} albumName={al.albumName} coverUrl={al.coverUrl} musician={al.musician}/>
            )}/>
        </div>
    )
}
