'use client'
import { Album } from '@/types/song_final'
import { useEffect, useState } from 'react'
import Carousel from '../component/Carousel'
import AlbumCard from '../component/AlbumCard'
import { useAuth } from '../context/AuthContext'

type AlbumListItem = {
    id: string,
    album_name: string,
    coverurl: string,
    musician: {
        id: string,
        name: string,
    }
}

export default function AlbumPage() {
    const { getAccessToken } = useAuth()
    const [albums, setAlbums] = useState<Album[]>([])

    // useEffect(() => {
    //     fetch('/api/albums')
    //     .then(res => res.json())
    //     .then(data => setAlbums(data))
    // }, [])

    useEffect(() => {
        const fetchAlbums = async () => {
            const token = await getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/albums/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!res.ok) {
                    console.error('Failed to fetch albums');
                    return;
                }
                const data = await res.json();
                console.log('Danh sách album: ', data);

                //chuyển đổi sang type Musician
                const formattedData: Album[] = data.map((item: AlbumListItem) => ({
                    /*export type Album = {
                        id: string;
                        albumName: string;
                        coverUrl: string;
                        musician: {
                            id: string;
                            name: string;
                        };
                        dayAdd?: string;
                        songs?: SongProps[]; //backend trả dữ liệu bài hát về khi nhấn vào chi tiết bài hát
                    } */
                    id: item.id,
                    albumName: item.album_name,
                    coverUrl: item.coverurl,
                    musician: {
                        id: 'chuasua',
                        name: 'chưa sửa',
                    }
                }))
                
                setAlbums(formattedData);
            } catch (err) {
                console.error('Error fetching musicians: ', err);
            }
        };
        fetchAlbums();
    }, [getAccessToken])
    

    return (
        <div className="">
            {/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
            <Carousel title="Album hiện tại" items={albums} renderItem={(al, i) => (
                <AlbumCard key={i} id={al.id} albumName={al.albumName} coverUrl={al.coverUrl} musician={al.musician}/>
            )}/>
        </div>
    )
}
