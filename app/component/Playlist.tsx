'use client';
import { useEffect, useState } from "react";

//kiểu dữ liệu cho 1 bài hát mà json phải trả về
//  export để cho file khác có thể import kiểu SongProps
export type SongProps = {
    title: string;
    artist: string;
    albumArt: string;
    audioSrc: string;
};

export type Album = {
    name: string;
    musician: string;
    songslist: SongProps[];
}

// tạo kiểu Props cho props của component Playlist
//      onSelect là một callback function, gọi tới thì phải truyền vào một object kiểu SongProps, hàm này không cần return.
//      (song: SongProps) => void: Tham số song kiểu SongProps, Không trả về gì (void)
type Props = {
    onSelect: (song: SongProps) => void;
};

export default function Playlist({ onSelect }: Props) {
    const [songs, setSongs] = useState<SongProps[]>([]);

    useEffect(() => {
        fetch('/dummy_data/songs.json') // Đảm bảo file này trong /public
        .then(res => res.json())
        .then(data => setSongs(data));
    }, []);

    return (
        <div className="">
            <h2 className="text-lg font-bold mb-2">Playlist</h2>
            {songs.map((song, index) => (
                <div key={index} className="p-2 flex items-center gap-4 bg-zinc-800 rounded-md hover:bg-zinc-700 cursor-pointer" onClick={() => onSelect(song)}>
                    <img src={song.albumArt} alt={song.title} className="w-12 h-12 object-cover rounded" />
                    <div>
                        <p className="text-white font-medium">{song.title}</p>
                        <p className="text-zinc-400 text-sm">{song.artist}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
