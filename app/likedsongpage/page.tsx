'use client'

// import { useState } from 'react';
// import LikedSongsCard from '../component/LikedSongsCard';
// import SongList from '../component/SongList';


export default function LikedSongsPage() {
    // const [likedSongsList, setLikedSongsList] = useState([]); // gọi api sau

    // if (!likedSongsList) return <div className="p-4">Đang tải...</div>

    return (
        <div className="min-h-screen bg-black text-white">
            {/* <LikedSongsCard likedSongs={likedSongsList}/>
            {likedSongsList.length > 0 ?
                <SongList songlist={likedSongsList} />
                : <h2 className="align-center text-center my-6 text-lg">Chưa có bài hát nào!</h2>
            } */}
        </div>
    );
}
