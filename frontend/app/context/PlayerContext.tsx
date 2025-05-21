'use client';
import { SongProps } from '@/types/song_final';
import { createContext, useContext, useState } from 'react';
// createContext → Dùng để tạo ra một "kho lưu trữ chia sẻ".
// useContext → Dùng để lấy dữ liệu từ context đã tạo.
// useState → Giữ bài hát đang phát (currentSong).



/*      REACT CONTEXT 
- React context: Giúp tạo ra 1 kho lưu trữ chia sẻ
- Khi chỉ dùng useState trong layout.tsx hay trong từng page → nó sẽ reset MusicPlayer khi chuyển trang
- Để có thể chạy bài hát vẫn phát nhạc khi chuyển trang (giữ cho MusicPlayer chạy liên tục), 
tạo react Context để truyền dữ liệu chung giữa nhiều component mà không cần truyền qua props 
từng cấp (tránh "Prop Drilling").

- Với React Context:
    1/ Tạo 1 context chứa data (ở đây là dữ liệu bài hát)
    2/ Gói toàn bộ app trong cái context (PlayerProvider)
    3/ Ở bất kỳ component con nào của PlayerProvider, gọi setCurrentSong(...) để lưu là phát bài nào
    4/ Trong MusicPlayer sẽ lấy ra currentSong từ context để phát nhạc

- Cái Player Context này được dùng trong app/AppWrapper.tsx để 1 cái hàm bọc, rồi chính AppWrapper sẽ được dùng để bọc children trong app/layout.tsx
    [Playlist.tsx] --- click bài hát ---> setCurrentSong(song)
        ↓
    [PlayerContext] cập nhật giá trị currentSong
        ↓
    [MusicPlayer.tsx] thấy song thay đổi → tự load & play

*/


type PlayerContextType = {
    currentSong: SongProps | null; //bài hát hiện đang hát (kiểu dữ liệu được import)
    setCurrentSong: (song: SongProps, playlist?: SongProps[]) => void; //hàm để đổi bài hát (gán playlist nếu cần)
    playNext: (repeatMode?: 0|1|2, isShuffle?: boolean) => void; //hàm phát bài tiếp theo (nếu đang chạy trong playlist)
    playPrev: () => void;
};

/*tạo Context thực tế để chia sẻ
- createContext(...): tạo ra context để chia sẻ.
- Ban đầu giá trị là undefined vì chưa wrap bằng Provider.*/
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

/* Tạo Provider để gói toàn app
- PlayerProvider là wrapper component, lưu currentSong trong useState.
- Gói các component con ({children}) bằng PlayerContext.Provider và truyền giá trị xuống. 
- Ví dụ:    <PlayerProvider>
                <App />
            </PlayerProvider>
Trong bất kỳ component con nào của App cũng thể lấy và set bài hát đang phát.*/
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSongState] = useState<SongProps | null>(null); //state bài hiện tại đang phát
    const [playlist, setPLaylist] = useState<SongProps[]>([]);  //state danh sách bài đang phát theo thứ tự
    const [currentIndex, setCurrentIndex] = useState<number>(0); //vị trí bài hiện tại

    //hàm CHỌN bài bài hát mới
    /*Khi chọn 1 bài, check nếu có playlist thì lưu playlist vào state,
    tìm vị trí của bài hát đc chọn trong playlist đó rồi lưu vị trí đó
    (currentIndex), xong gọi setCurrentSongState(song) để phát bào đó*/
    const setCurrentSong = (song: SongProps, list?: SongProps[]) => {
        if(list){
            const index = list.findIndex((s) => s.audioSrc === song.audioSrc ); //tìm vị trí bài hát trong list
            setPLaylist(list);  //lưu danh sách phát
            setCurrentIndex(index); //lưu vị trí bài đang chọn
        }
        setCurrentSongState(song);//phát bài hát
    }

    //hàm phát bài tiếp theo trong playlist, đồng thời check lặp bài hát
    /*Khi hết bài, kiểm tra coi còn bài nào phía sau trong playlist ko,
    có thì tiến lên 1 index để phát bài kế tiếp*/
    const playNext = (repeatMode?: 0|1|2, isShuffle?: boolean) => {
        if(!playlist || !currentSong) return;

        //trộn bài hát
        if(isShuffle){
            let nextIndex = currentIndex;
            if(playlist.length > 1) {
                while (nextIndex === currentIndex) {
                    nextIndex = Math.floor(Math.random() * playlist.length);
                }
            }
            setCurrentIndex(nextIndex);
            setCurrentSongState(playlist[nextIndex]);
            return;
        }

        //chế độ lặp
        if(currentIndex < playlist.length -1){
            setCurrentIndex(currentIndex + 1);
            setCurrentSongState(playlist[currentIndex + 1]);
        } else {
            // Mode 1: lặp lại playlist khi chạy xong bài cuối cùng trong danh sách
            if (repeatMode === 1 ) {
                setCurrentIndex(0);
                setCurrentSongState(playlist[0]);
            } else {
                // Mode 0: để rỗng cũng đc r
            }
        }
    }
    //cho nút lùi bài trong playlist
    const playPrev = () => {
        if (!playlist || !currentSong) return;
        
        if(currentIndex > 0){
            setCurrentIndex(currentIndex - 1);
            setCurrentSongState(playlist[currentIndex - 1]);
        }
    }

    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong, playNext, playPrev }}>
            {children}
        </PlayerContext.Provider>
    );
};

/*  Custom hook để dùng context
Các component con chỉ cần gọi usePlayer() là truy cập đc currentSong, setCurrentSong, và playNext. */
export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
    return context;
};

