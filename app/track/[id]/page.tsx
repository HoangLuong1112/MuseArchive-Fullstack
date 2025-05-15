'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { SongProps } from '@/types/song'
import Banner from '@/app/component/Banner'
import SongList from '@/app/component/SongList'
import VideoPlayer from '@/app/component/VideoPlayer'

export default function TrackDetail() {
    const { id } = useParams()          //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const [track, setTrack] = useState<SongProps | null>(null)

    useEffect(() => {
        fetch(`/api/tracks/${id}`)
        .then(res => res.json())
        .then(data => setTrack(data))
    }, [id])

    // hàm đổi thời gian ra đơn vị
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} phút ${secs.toString().padStart(2, '0')} giây`;
    };
    //tính
    const totalDurationString = formatDuration(track?.duration ?? 0);

    if (!track) return <div className="p-4">Đang tải...</div>

    return (
        <div className="">
            <Banner type='Bài hát' coverUrl={track.albumArt} name={track.title} musician={track.artist} 
                album={track.album} dayAdd={track.dayAdd} numberofsong={1} duration={totalDurationString} views={track.views} />
            <SongList songlist={[track]}/>
            {track.videoSrc && (
                <VideoPlayer videoSrc={track.videoSrc} />
            )}
        </div>
    )
}
