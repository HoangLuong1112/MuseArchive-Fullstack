'use client'
import { SongProps } from '@/types/song'
import { useEffect, useState } from 'react'
// import Carousel from '../component/Carousel'
// import TrackCard from '../component/TrackCard'
import { useAuth } from '../context/AuthContext'

export default function TrackPage() {
    const { getAccessToken } = useAuth();
    const [tracks, setTracks] = useState<SongProps[]>([])

    // useEffect(() => {
    //     fetch('/api/tracks')
    //     .then(res => res.json())
    //     .then(data => setTracks(data))
    // }, [])

    useEffect(() => {
        const fetchTracks = async () => {
            const token = getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                console.log('Access token chuẩn bị gửi chung:', token);
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
                setTracks(data);
                
                //only for avoid bug
                console.log('Only for avoid bug', tracks);
                //
            } catch (err) {
                console.error('Error fetching musicians: ', err);
            }
        };
        fetchTracks();
    }, [getAccessToken])


    return (
        <div className="">
            {/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
            {/* <Carousel title="Các bài hát (Track) thịnh hành" items={tracks} renderItem={(item, i) => (
                <TrackCard key={i} id={item.id} trackName={item.title} coverUrl={item.albumArt} />
            )}/> */}
        </div>
    )
}
