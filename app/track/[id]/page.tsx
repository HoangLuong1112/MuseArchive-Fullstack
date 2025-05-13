'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { SongProps } from '@/types/song'
import Banner from '@/app/component/Banner'
import SongList from '@/app/component/SongList'

export default function TrackDetail() {
    const { id } = useParams()          //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const [track, setTrack] = useState<SongProps | null>(null)

    useEffect(() => {
        fetch(`/api/tracks/${id}`)
        .then(res => res.json())
        .then(data => setTrack(data))
    }, [id])

    if (!track) return <div className="p-4">Đang tải...</div>

    return (
        <div className="">
            <Banner type='Bài hát' coverUrl={track.albumArt} name={track.title} musician={track.artist} />
            <SongList songlist={[track]}/>
        </div>
    )
}
