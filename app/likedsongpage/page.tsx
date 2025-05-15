'use client'

import { tracks } from "../api/tracks/data";
import SongList from "../component/SongList";
import { useAuth } from "../context/AuthContext";

export default function LikedSongsPage() {
    const {currentUser} = useAuth();

    //lấy danh sách playlist
    const likedList = tracks.filter(p =>
        currentUser?.likedSong.includes(p.id)
    );
    //đổi số phút giây
    const totalDuration = likedList.reduce((sum, song) => sum + (song.duration || 0), 0) ?? 0;
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} phút ${secs.toString().padStart(2, '0')} giây`;
    };
    const totalDurationString = formatDuration(totalDuration);

    return (
        <div className="min-h-screen text-white">
            <div className='bg-gradient-to-r from-blue-800 to-purple-800 w-full h-full flex flex-col gap-3 mb-5 rounded-2xl p-5'>
                <p className="title">Các bài hát yêu thích</p>	
                <div>
                    <span className="text-gray-300">Tạo bởi {currentUser?.userName}</span>
                    <span className="before:content-['•'] before:mx-2 text-gray-300">Có {currentUser?.likedSong.length} bài hát</span>
                    <span className="before:content-['•'] before:mx-2 text-gray-300">{totalDurationString}</span>
                </div>
            </div>
            <SongList songlist={likedList}/>
        </div>
    );
}
