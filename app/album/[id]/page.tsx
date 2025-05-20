'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Album, SongProps } from '@/types/song_final'
import Banner from '@/app/component/Banner'
import SongList from '@/app/component/SongList'
import { useAuth } from '@/app/context/AuthContext'

export default function AlbumDetail() {
    const { id } = useParams()          //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const { getAccessToken } = useAuth()
    const [album, setAlbum] = useState<Album | null>(null)

    // useEffect(() => {
    //     fetch(`/api/albums/${id}`)
    //     .then(res => res.json())
    //     .then(data => setAlbum(data))
    // }, [id])

    useEffect(() => {
        const fetchAlbum = async () => {
            const token = await getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                //lấy thông tin chi tiết bài hát
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/albums/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!res.ok) {
                    console.error('Failed to fetch album detail');
                    return;
                }
                const data = await res.json();
                console.log('Chi tiết album: ', data);

                const albumSong: SongProps[] = data.songs.map((item: SongProps) => ({
                    id: item.id,
                    title: item.title,
                    artist: {
                        id: '',
                        name: 'null artist name',
                    },
                    albumArt: '',
                    audioSrc: '',
                    duration: item.duration,

                    dayAdd: '',
                    views: 111,
                    album: {
                        id: data.id,
                        name: data.albumName,
                    },
                    videoSrc: '',
                }))

                //chuyển đổi sang type Musician
                const formattedData: Album = {
                    id: data.id,
                    albumName: data.album_name,
                    coverUrl: data.coverurl,
                    musician: {
                        id: '1',
                        name: 'null musician name',
                    },
                    dayAdd: 'null day',
                    songs: albumSong, //backend trả dữ liệu bài hát về khi nhấn vào chi tiết bài hát
                }
                
                setAlbum(formattedData);
            } catch (err) {
                console.error('Error fetching musicians: ', err);
            }
        };
        fetchAlbum();
    }, [getAccessToken, id])

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
