'use client'
import { Musician } from '@/types/song_final'
import { useEffect, useState } from 'react'
import Carousel from '../component/Carousel'
import MusicianCard from '../component/MusicianCard'
import { useAuth } from '../context/AuthContext'

type MusicianListItem = {
    id: string,
    musician_name: string,
    avatar_pic: string,
}

export default function MusicianPage() {
    const { getAccessToken } = useAuth();
    const [musicians, setMusicians] = useState<Musician[]>([])

    useEffect(() => {
        const fetchMusicians = async () => {
            const token = await getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                // console.log('Access token chung musicians :', token);
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

                //chuyển đổi sang type Musician
                const formattedData: Musician[] = data.map((item: MusicianListItem) => ({
                    id: item.id,
                    musicianName: item.musician_name,
                    avatarPic: item.avatar_pic,
                }))
                
                setMusicians(formattedData);
            } catch (err) {
                console.error('Error fetching musicians: ', err);
            }
        };
        fetchMusicians();
    }, [getAccessToken])

    return (
        <div className="">
            {/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
            <Carousel title="Nhạc sĩ hiện tại" items={musicians} renderItem={(musician, i) => (
                <MusicianCard key={i} id={musician.id} musicianName={musician.musicianName} avatarPic={musician.avatarPic} />
            )}/>
        </div>
    )
}
