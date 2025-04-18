'use client';
import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,  Volume2 } from "lucide-react";
import { SongProps } from "./Playlist";

//import kiểu dữ liệu bài hát SongProps từ Playlist.tsx để truyền vô MusicPlayer
type Props = {
    song: SongProps;
}

export default function MusicPlayer({ song }: Props) {
    // 🔧 Khai báo kiểu rõ ràng cho ref
    const audioRef = useRef<HTMLAudioElement | null>(null); //trỏ tới thẻ <audio>, dùng để play/pause, lấy duration, currentTime, volume
    const [isPlaying, setIsPlaying] = useState(false);      //trạng thái nhạc đang chạy hay tạm dừng.
    const [progress, setProgress] = useState(0);            //trạng thái tiến trình bài hát, 0 => 100
    const [volume, setVolume] = useState(100);              //trạng thái âm lượng, 0 => 100
    const [isShuffle, setIsShuffle] = useState(false);      // trạng thái Shuffle, khi true thì sẽ trộn bài ngẫu nhiên 
    const [repeatMode, setRepeatMode] = useState<0 | 1 | 2>(0);     // chế độ lặp lại. 0: none, 1: all, 2: one

    // hàm togglePlay để nhấn nút play/pause
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return; //nếu ko có audio thì thoát hàm

        if (isPlaying) {
            audio.pause(); //nếu đang phát thì dừng
        } else {
            audio.play(); //nếu đang dừng thì phát
        }
        setIsPlaying(!isPlaying); //cập nhập lại trạng thái isPlaying
    };

    // Cập nhật thanh tiến trình trên thời gian thực
    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) return;//nếu ko có audio thì thoát
        setProgress((audio.currentTime / audio.duration) * 100);
    };

    // Kéo thanh tiến trình thì cập nhập lại đang hát ở đoạn nào
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;//nếu ko có audio thì thoát
        const newTime = (Number(e.target.value) / 100) * audio.duration;
        audio.currentTime = newTime;
        setProgress(Number(e.target.value));
    };

    // Kéo thanh âm lượng thì cập nhập lại âm lượng
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);

        const audio = audioRef.current;
        if (audio) {
            audio.volume = newVolume / 100;
        }
    };

    // handleEnded: xử lý khi kết thúc bài hát
    const handleEnded = () => {
        const audio = audioRef.current;
        if (!audio) return; //nếu ko có audio thì thoát

        //kiểm tra các chế độ lặp lại
        if (repeatMode === 2) {     // lặp lại 1 bài hát liên tục
            audio.currentTime = 0;  //đặt lại thời gian bài hát về đầu bài
            audio.play();           //rồi phát bài hát
        } 
        else if (repeatMode === 1) {  //lặp lại tất cả bài hát khi có ds bài hát
            audio.currentTime = 0;
            audio.play(); 
        } 
        else { // No Repeat
            setIsPlaying(false);
        }
    };
    // dùng cho nút lặp lại bài hát
    const cycleRepeatMode = () => {
        setRepeatMode(prev => (prev + 1) % 3 as 0 | 1 | 2);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full h-[80px] bg-zinc-900 text-white flex items-center justify-between px-6 shadow-xl z-50">
            
            {/* Left: Song Info */}
            <div className="flex items-center gap-4">
                <img src={song.albumArt} alt="Album Art" className="w-12 h-12 rounded-md object-cover" />
                <div>
                    <h4 className="text-sm font-semibold">{song.title}</h4>
                    <p className="text-xs text-zinc-400">{song.artist}</p>
                </div>
            </div>

            {/* Center: Controls */}
            <div className="flex flex-col items-center w-1/2">
                <div className="flex items-center gap-6 mb-1">
                    <button onClick={() => setIsShuffle(!isShuffle)} className={isShuffle ? "text-green-500" : "hover:text-white text-gray-400"}>
                        <Shuffle size={20} />
                    </button>
                    <button className="hover:text-white text-gray-400 cursor-pointer">
                        <SkipBack size={20} />
                    </button>
                    <button onClick={togglePlay} className="bg-white text-black p-1 rounded-full cursor-pointer">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button className="hover:text-white text-gray-400 cursor-pointer">
                        <SkipForward size={20} />
                    </button>
                    <button onClick={cycleRepeatMode} className={repeatMode === 2 ? "text-green-500" : ""}>
                        {repeatMode === 2 ? <Repeat1 size={20} /> : <Repeat size={20} className={repeatMode === 1 ? "text-green-500" : "text-gray-400 hover:text-white"} />}
                    </button>
                </div>
                <input 
                    type="range" 
                    value={progress} 
                    onChange={handleSeek} 
                    className="w-full h-1 bg-zinc-700 rounded-lg cursor-pointer accent-green-500"/>
            </div>

            {/* Right: Volume */}
            <div className="flex items-center gap-2 w-[120px]">
                <Volume2 size={20} />
                {/* type="range" là một thanh trượt */}
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
                src={song.audioSrc} 
                onTimeUpdate={handleTimeUpdate} 
                onEnded={handleEnded}
                preload="auto" />
        </div>
    );
}
