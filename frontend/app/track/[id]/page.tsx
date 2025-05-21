'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { SongProps } from '@/types/song_final'
import Banner from '@/app/component/Banner'
import SongList from '@/app/component/SongList'
import VideoPlayer from '@/app/component/VideoPlayer'
import { useAuth } from '@/app/context/AuthContext'

export default function TrackDetail() {
    const { id } = useParams()          //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const { getAccessToken } = useAuth()
    const [track, setTrack] = useState<SongProps | null>(null)
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    // useEffect(() => {
    //     fetch(`/api/tracks/${id}`)
    //     .then(res => res.json())
    //     .then(data => setTrack(data))
    // }, [id])

    useEffect(() => {
        //lấy dữ liệu bài hát
        const fetchTrack = async () => {
            const token = await getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                //lấy thông tin chi tiết bài hát
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/songs/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!res.ok) {
                    console.error('Failed to fetch song detail');
                    return;
                }
                const data = await res.json();
                console.log('Chi tiết song: ', data);

                //chuyển đổi sang type Musician
                const formattedData: SongProps = {
                    id: data.id,
                    title: data.title,
                    artist: {
                        id: data.musicians[0].id,
                        name: data.musicians[0].musician_name,
                    },
                    albumArt: data.albumArt,
                    audioSrc: '',
                    duration: data.duration,

                    dayAdd: data.day_add,
                    views: data.views,
                    album: data.album ? {
                        id: data.album.id,
                        name: data.album.album_name,
                    }:null,
                    videoSrc: '',
                }
                
                setTrack(formattedData);
            } catch (err) {
                console.error('Error fetching musicians: ', err);
            }
        };

        fetchTrack();
    }, [getAccessToken, id])

    useEffect(() => {
        const fetchVideo = async () => {
            if (!id) return;
            const token = await getAccessToken();
            if (!token) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stream_video/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (!res.ok) throw new Error("Không lấy đc stream video");
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
                // console.log("Video URL:", url);
            } catch (err) {
                console.error("Lỗi khi load video: ", err);
            }
        };

        fetchVideo();
    }, [getAccessToken, id]);


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
            {videoUrl && (
                <VideoPlayer videoSrc={videoUrl} />
            )}
        </div>
    )
}
