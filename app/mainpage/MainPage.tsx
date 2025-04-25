'use client';
import { useState } from "react";
import MusicPlayer from "../component/MusicPlayer";
import NavBar from "./NavBar";
import Playlist, { SongProps } from "../component/Playlist";

export default function MainPage() {
    const [currentSong, setCurrentSong] = useState<SongProps | null>(null);

    return (
        <div className="h-screen w-full bg-gray-400 flex flex-col">
            <NavBar />
            <div className="grid grid-cols-24 bg-green-400 flex-1 gap-2">
                <div className="bg-red-400 col-span-6 ml-2 rounded-lg">
                    few
                </div>
                <div className="bg-blue-400 col-span-12 rounded-lg">
                    <h1>Main Page</h1>
                    <p>Welcome to the main page of the Muse Archive!</p>
                    <div>
                        <Playlist onSelect={setCurrentSong} />
                    </div>
                </div>
                <div className="bg-amber-400 col-span-6 mr-2 ">
                    wqf
                </div>
            </div>

            {/* nếu nhấn vào 1 bài hát => currentSong tồn tại thì mới chạy */}
            {currentSong ? (
                <MusicPlayer song={currentSong} />
            ) : (
                <div></div>
            )}            
        </div>
    );
}
