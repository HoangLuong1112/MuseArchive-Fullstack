'use client';
import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,  Volume2 } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

export default function MusicPlayer() {
    /* Trước đây MusicPlayer nhận prop song trực tiếp từ Props, nên khi 
    chuyển qua xài Context để quản lý bài hát, bạn sẽ không truyền song hay type của song nữa nữa, 
    mà sẽ lấy currentSong từ usePlayer(). 
    Trong app chỉ có một nơi quản lý bài hát đang phát – đó là PlayerContext. */
    const {currentSong: song, playNext, playPrev } = usePlayer(); // ==> Lấy bài hát đang phát
    
    // Khai báo kiểu rõ ràng cho ref
    const audioRef = useRef<HTMLAudioElement | null>(null); //trỏ tới thẻ <audio>, dùng để play/pause, lấy duration, currentTime, volume
    const [isPlaying, setIsPlaying] = useState(false);      //trạng thái nhạc đang chạy hay tạm dừng.
    const [progress, setProgress] = useState(0);            //trạng thái tiến trình bài hát (0=>100%)
    const [duration, setDuration] = useState(0);            //đếm giờ trên thanh 
    const [volume, setVolume] = useState(100);              //trạng thái âm lượng (0=>100%)
    const [isShuffle, setIsShuffle] = useState(false);      // trạng thái Shuffle, khi true thì sẽ trộn bài ngẫu nhiên 
    const [repeatMode, setRepeatMode] = useState<0 | 1 | 2>(0);     // chế độ lặp lại. 0: none, 1: all, 2: one
    const lastFetchedId = useRef<string | null>(null);      // Track song đã fetch để tránh fetch lại

    //lấy token để lát gọi API
    const { getAccessToken } = useAuth();
    //dùng để tạo Url tạm cho <audio>
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

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
        if (!audio || isNaN(audio.duration) || audio.duration === 0) return;//nếu ko có audio thì thoát
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

    // dùng cho nút lặp lại bài hát, có 3 chế độ lặp lại: 0: none, 1: all, 2: one
    const cycleRepeatMode = () => {
        setRepeatMode(prev => (prev + 1) % 3 as 0 | 1 | 2);
    };

    // handleEnded: xử lý khi kết thúc bài hát
    const handleEnded = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        //Check các chế độ lặp lại
            //Mode 2: lặp lại 1 bài hát liên tục
        if (repeatMode === 2) {         
            //đặt lại tiến độ bài hát về đầu bài rồi chạy bài           
            audio.currentTime = 0;      
            audio.play();    
            return;           
        } 
        // 2 Mode còn lại xử lý bên PlayerContext cho dễ
        playNext(repeatMode, isShuffle);
    };

    const handleNext = () =>{
        playNext();
    }
    const handlePrev = () => {
        playPrev();
    }

    //hàm chuyển thời gian bài hát ra định dạng phút giây
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    ///////////////////////

    //lấy API bài hát ra
    useEffect(() => {
        let currentUrl: string | null = null; //dùng để dọn dẹp url cũ

        const loadAudio = async () => {
            if (!song?.id) return;

             // Nếu bài hát chưa đổi, không cần fetch lại
            if (lastFetchedId.current === song.id) return;

            const token = await getAccessToken();
            if (!token) return;

            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stream_song/${song.id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (!res.ok) throw new Error("Không lấy đc stream song");

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                currentUrl = url;
                lastFetchedId.current = song.id; // lưu lại id đã fetch
            } catch (err) {
                console.error("Lỗi khi load audio: ", err);
            }
        };
        loadAudio();
        return () => {
            //clear URL cũ để tránh leak memory
            if (currentUrl){
                URL.revokeObjectURL(currentUrl);
            }
        }
    }, [song?.id, getAccessToken]);
    
    //khi nhấn vào 1 bài hát khác thì gọi audio.play để phát nhạc ngay lập tức
    useEffect(() => {
        const audio = audioRef.current;

        if (!audio || !audioUrl) return;

        const tryPlay = () => {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(err => {
                    console.warn("Autoplay blocked:", err);
                    setIsPlaying(false); // Cho phép user click
                });
        };

        audio.src = audioUrl;

        // Chờ khi có thể play được mới play
        if (audio.readyState >= 3) {
            tryPlay();
        } else {
            audio.oncanplay = tryPlay;
        }
        
        // Đợi metadata mới reset progress và set duration
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setProgress((audio.currentTime / audio.duration) * 100);
        }
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
    }, [audioUrl]);

    

    //khi shuffle thì ko có lặp bài
    useEffect(() => {
        if(isShuffle)
            setRepeatMode(0);
    }, [isShuffle])

    // chưa có bài nào được chọn thì không render player
    if (!song) return null;
    
    return (
        <div className="fixed bottom-0 left-0 w-full h-[80px] bg-zinc-700 text-white flex items-center justify-between px-6 shadow-xl z-50">
            
            {/* Left: Song Info */}
            <div className="flex items-center gap-4 w-50">
                <Image src={song.albumArt} alt="Album Art" width={48} height={48} className="w-[48px] h-[48px] rounded-md object-cover" />
                <div>
                    <h4 className="text-sm font-semibold">{song.title}</h4>
                    <p className="text-xs text-zinc-400">{song.artist.name}</p>
                </div>
            </div>

            {/* Center: Controls */}
            <div className="flex flex-col items-center w-1/2">
                <div className="flex items-center gap-6 mb-1">

                    {/* Nút phát ngẫu nhiên */}
                    <button onClick={() => setIsShuffle(!isShuffle)} className={isShuffle ? "text-green-500" : "hover:text-white text-gray-400"}>
                        <div className="relative group">
                            <Shuffle size={20} />
                            <div className="absolute text-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                Phát ngẫu nhiên
                            </div>
                        </div>
                    </button>

                    {/* Nút về bài phía trước */}
                    <button className="hover:text-white text-gray-400 cursor-pointer" onClick={handlePrev}>
                        <SkipBack size={20} />
                    </button>

                    {/* Nút chạy/dừng */}
                    <button onClick={togglePlay} className="bg-white text-black p-1 rounded-full cursor-pointer">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    {/* Nút sang bài kế tiếp */}
                    <button className="hover:text-white text-gray-400 cursor-pointer" onClick={handleNext}>
                        <SkipForward size={20} />
                    </button>

                    {/* Nút chế độ lặp */}
                    <button onClick={cycleRepeatMode} disabled={isShuffle} >
                        <div className="relative group">
                            {repeatMode === 2 ? (
                                <Repeat1 size={20} className="text-green-500" />
                            ) : (
                                <Repeat size={20} className={repeatMode === 1 ? "text-green-500" : "text-gray-400 hover:text-white"}/>
                            )}
                            <div className="absolute text-nowrap bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                {isShuffle ? "Đang ở chế độ phát ngẫu nhiên, không được chọn" : 
                                repeatMode === 0 ? "Không lặp" : repeatMode === 1 ? "Lặp lại tất cả" :  "Chỉ lặp lại bài này"}
                                
                            </div>
                        </div>
                        
                    </button>
                </div>

                {/* Thanh tiến trình */}
                <div className="w-full flex gap-3 items-center text-[12px] text-gray-400">
                    <span>{formatTime((progress/100) * duration)}</span>
                    <input type="range" value={progress} onChange={handleSeek} className="w-full h-1 bg-zinc-700 rounded-lg cursor-pointer accent-green-500"/>
                    <span>{formatTime((duration - (progress / 100) * duration))}</span>
                </div>
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
                // src={song.audioSrc} 
                src={audioUrl ?? undefined}
                onTimeUpdate={handleTimeUpdate} 
                onEnded={handleEnded}
                onLoadedMetadata={() => {
                    const audio = audioRef.current;
                    if (audio) setDuration(audio.duration);
                }}
                preload="auto" />
        </div>
    );
}
