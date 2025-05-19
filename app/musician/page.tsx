'use client'
import { Musician } from '@/types/song'
import { useEffect, useState } from 'react'
// import Carousel from '../component/Carousel'
// import MusicianCard from '../component/MusicianCard'
import { useAuth } from '../context/AuthContext'

export default function MusicianPage() {
    const { getAccessToken } = useAuth();
    const [musicians, setMusicians] = useState<Musician[]>([])

    useEffect(() => {
        // fetch('/api/musicians')
        //     .then(res => res.json())
        //     .then(data => setMusicians(data))
        const fetchMusicians = async () => {
            const token = getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                console.log('Access token chuẩn bị gửi chung:', token);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/musicians/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!res.ok) {
                    console.error('Failed to fetch musicians');
                    return;
                }
                const data = await res.json();
                console.log('Danh sách nhạc sĩ: ', data);
                setMusicians(data);
                
                //only for avoid bug
                console.log('Only for avoid bug', musicians);
                //
            } catch (err) {
                console.error('Error fetching musicians: ', err);
            }
        };
        fetchMusicians();
    }, [getAccessToken])

    return (
        <div className="">
            {/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
            {/* <Carousel title="Nhạc sĩ hiện tại" items={musicians} renderItem={(musician, i) => (
                <MusicianCard key={i} id={musician.id} musicianName={musician.musicianName} avatarPic={musician.avatarPic} />
            )}/> */}
        </div>
    )
}
