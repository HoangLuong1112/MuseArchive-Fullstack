'use client'
import { SongProps } from '@/types/song_final'
import { useEffect, useState } from 'react'
import Carousel from '../component/Carousel'
import TrackCard from '../component/TrackCard'
import { useAuth } from '../context/AuthContext'

type TrackListItem = {
    id: string,
    title: string,
    albumArt: string,
}

export default function TrackPage() {
    const { getAccessToken } = useAuth();
    const [tracks, setTracks] = useState<SongProps[]>([])

    useEffect(() => {
        const fetchTracks = async () => {
            const token = await getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                // console.log('Access token chung tracks:', token);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/songs/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!res.ok) {
                    console.error('Failed to fetch tracks');
                    return;
                }
                const data = await res.json();
                console.log('Danh sách bài hát: ', data);
                /*export type SongProps = {
                    id: string;
                    title: string;
                    artist: {
                        id: string;
                        name: string;
                    };
                    albumArt: string;
                    audioSrc: File; //audioSrc: string;
                    duration?: number;

                    dayAdd: string; //yyyy-mm-dd 
                    views: number;
                    album: {
                        id: string;
                        name: string;
                    };
                    videoSrc: File;//videoSrc: string;
                    // các bài hát đơn ko có album gọi là track
                }; */
                const formattedData: SongProps[] = data.map((item: TrackListItem) => ({
                    id: item.id,
                    title: item.title,
                    albumArt: item.albumArt,
                }))

                setTracks(formattedData);
                
                
            } catch (err) {
                console.error('Error fetching musicians: ', err);
            }
        };
        fetchTracks();
    }, [getAccessToken])


    return (
        <div className="">
            {/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
            <Carousel title="Các bài hát (Track) thịnh hành" items={tracks} renderItem={(item, i) => (
                <TrackCard key={i} id={item.id} trackName={item.title} coverUrl={item.albumArt} />
            )}/>
        </div>
    )
}
