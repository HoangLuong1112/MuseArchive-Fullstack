'use client'

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SongProps } from "@/types/song_final";
import SongRow from "../component/SongRow";

type LikedListFromJSON = {
    id: string;
    song: SongProps;
}

type APISongResponse = {
  id: string;
  favorited_at: string;
  song?: {
    id: string;
    title: string;
    musicians?: { id: string; musician_name: string }[];
    albumArt: string;
    duration: number;
    day_add: string;
    views: number;
  };
};

export default function LikedSongsPage() {
    const { getAccessToken } = useAuth();
    const {currentUser} = useAuth();
    const [likedList, setLikedList] = useState<LikedListFromJSON[]>([])

    useEffect(() => {
        const fetchFavSong = async () => {
            const token = await getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/favorite-songs/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!res.ok) {
                    console.error('Failed to fetch fav songs');
                    return;
                }
                const data = await res.json();
                console.log('Chi tiết favsong: ', data);

                //chuyển đổi sang type 
                const formattedData: LikedListFromJSON[] = (data as APISongResponse[]).map((item): LikedListFromJSON => {
                    const song = item.song!;
                    const likedSong: SongProps = {
                        id: song.id,
                        title: song.title,
                        artist: {
                            id: song.musicians?.[0]?.id || '',
                            name: song.musicians?.[0]?.musician_name || '',
                        },
                        albumArt: song.albumArt,
                        duration: song.duration,
                        dayAdd: song.day_add,
                        views: song.views,
                        audioSrc: '',
                        videoSrc: '',
                    };
                    return {
                        id: item.id,
                        song: likedSong,
                    };
                });

                setLikedList(formattedData);
            } catch (err) {
                console.error('Error fetching favsong: ', err);
            }
        };
        fetchFavSong();
    }, [getAccessToken])
    

    //lấy danh sách playlist
    
    //đổi số phút giây
    const totalDuration = likedList.reduce((sum, entry) => sum + (entry.song.duration || 0), 0) ?? 0;
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} phút ${secs.toString().padStart(2, '0')} giây`;
    };
    const totalDurationString = formatDuration(totalDuration);

    return (
        <div className="min-h-screen text-white">
            <div className='bg-gradient-to-tl from-blue-400 to-purple-400 w-full h-full flex flex-col gap-3 mb-5 rounded-2xl p-5'>
                <p className="title">Các bài hát yêu thích</p>	
                <div>
                    <span className="text-gray-300">Tạo bởi {currentUser?.userName}</span>
                    <span className="before:content-['•'] before:mx-2 text-gray-300">Có {likedList.length} bài hát</span>
                    <span className="before:content-['•'] before:mx-2 text-gray-300">{totalDurationString}</span>
                </div>
            </div>
            {/* <SongList songlist={likedList}/> */}
            <div className="mt-4 mb-8 px-5">
                <div className="grid grid-cols-12 gap-4 px-5 text-gray-400 text-sm border-b border-gray-800 pb-2 mb-4">
                    <div className="col-span-1">#</div>
                    <div className="col-span-6">Title</div>
                    <div className="col-span-3">
                        Time
                    </div>
                    <div className="col-span-2"></div>
                </div>
    
                {likedList?.map((list, index) => (
                    <SongRow key={list.song.title} song={list.song} index={index} songlist={likedList.map(item => item.song)} />
                ))}
            </div>
        </div>
    );
}
