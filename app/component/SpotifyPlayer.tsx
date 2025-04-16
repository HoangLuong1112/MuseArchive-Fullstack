'use client';
import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export default function SpotifyPlayer() {
    // 🔧 Khai báo kiểu rõ ràng cho ref
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) return;
        setProgress((audio.currentTime / audio.duration) * 100);
    };

    // 🔧 Thêm kiểu cho event của <input type="range">, cái này cho thanh theo dõi tiến trình bài hát
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = (Number(e.target.value) / 100) * audio.duration;
        audio.currentTime = newTime;
        setProgress(Number(e.target.value));
    };

    // kiểm soát volume
    /*Thêm state volume để lưu giá trị âm lượng.
    Thêm handleVolumeChange để cập nhật giá trị.
    Gán audio.volume = volume / 100 vì .volume nhận giá trị từ 0.0 đến 1.0. */
    const [volume, setVolume] = useState(100); // 100% mặc định
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);

        const audio = audioRef.current;
        if (audio) {
            audio.volume = newVolume / 100;
        }
    };

    return (
        <div className="fixed bottom-0 left-0 w-full h-[80px] bg-zinc-900 text-white flex items-center justify-between px-6 shadow-xl z-50">
            {/* Left: Song Info */}
            <div className="flex items-center gap-4">
                <img src="/album.jpg" alt="Album Art" className="w-12 h-12 rounded-md object-cover" />
                <div>
                    <h4 className="text-sm font-semibold">My Song Title</h4>
                    <p className="text-xs text-zinc-400">Artist Name</p>
                </div>
            </div>

            {/* Center: Controls */}
            <div className="flex flex-col items-center w-1/2">
                <div className="flex items-center gap-6 mb-1">
                    <button><SkipBack size={20} /></button>
                    <button onClick={togglePlay} className="bg-white text-black p-1 rounded-full">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button><SkipForward size={20} /></button>
                </div>
                <input 
                    type="range" 
                    value={progress} 
                    onChange={handleSeek} 
                    className="w-full h-1 bg-zinc-700 rounded-lg cursor-pointer accent-green-500"
                />
            </div>

            {/* Right: Volume */}
            {/* type="range" là một thanh trượt */}
            <div className="flex items-center gap-2 w-[120px]">
                <Volume2 size={20} />
                <input 
                    type="range" 
                    min={0} 
                    max={100} 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    className="w-full accent-green-500" />
            </div>

            <audio 
                ref={audioRef} 
                src="/song.mp3" 
                onTimeUpdate={handleTimeUpdate} 
                preload="auto" 
            />
        </div>
    );
}
