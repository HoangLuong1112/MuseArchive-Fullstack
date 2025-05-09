'use client';
import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import Image from "next/image";
import { SongProps } from "@/types/song";

//kiểu dữ liệu cho 1 bài hát mà json phải trả về
//  export để cho file khác có thể import kiểu SongProps
export default function Playlist() {
    const [songs, setSongs] = useState<SongProps[]>([]);
    const { setCurrentSong } = usePlayer(); // 👈 Lấy hàm setCurrentSong từ context

    useEffect(() => {
        fetch('/dummy_data/songs.json') // Đảm bảo file này trong /public
        .then(res => res.json())
        .then(data => setSongs(data));
    }, []);

    return (
        <div className="">
            <h2 className="text-lg font-bold mb-2">Playlist</h2>
            {songs.map((song, index) => (
                <div key={index} className="p-2 flex items-center gap-4 bg-zinc-800 rounded-md hover:bg-zinc-700 cursor-pointer" 
                    onClick={() => setCurrentSong(song)}>
                    {/* Khi người dùng click vào 1 bài hát:
                    setCurrentSong(song) được gọi → context (hàm lưu trữ chung, coi PlayerContext để biết thêm) cập nhật → tất cả component đang dùng currentSong (AppWrapper đã bọc hết rồi) sẽ re-render.*/}

                    <Image src={song.albumArt} alt={song.title} width={48} height={48} className=" object-cover rounded" />
                    <div>
                        <p className="text-white font-medium">{song.title}</p>
                        <p className="text-zinc-400 text-sm">{song.artist}</p>
                    </div>

                </div>
            ))}
        </div>
    );
}
