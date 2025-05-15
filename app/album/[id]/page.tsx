'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Album } from '@/types/song'
import Banner from '@/app/component/Banner'
import SongList from '@/app/component/SongList'

export default function AlbumDetail() {
    const { id } = useParams()          //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const [album, setAlbum] = useState<Album | null>(null)

    useEffect(() => {
        fetch(`/api/albums/${id}`)
        .then(res => res.json())
        .then(data => setAlbum(data))
    }, [id])

    // hàm tính thời gian
    const totalDuration = album?.songs?.reduce((sum, song) => sum + (song.duration || 0), 0) ?? 0;
    // hàm đổi thời gian ra đơn vị
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} phút ${secs.toString().padStart(2, '0')} giây`;
    };
    //  số thời gian
    const totalDurationString = formatDuration(totalDuration);
    //  số bài hát

    if (!album) return <div className="p-4">Đang tải...</div>

    return (
        <div className="">
            <Banner type='Album' coverUrl={album.coverUrl} name={album.albumName} musician={album.musician} dayAdd={album.dayAdd} numberofsong={album?.songs?.length} duration={totalDurationString}/>
            <SongList songlist={album.songs}/>
        </div>
    )
}
