'use client';
import { SongProps } from '@/types/song';
import { createContext, useContext, useState } from 'react';
// createContext → Dùng để tạo ra một "kho lưu trữ chia sẻ".
// useContext → Dùng để lấy dữ liệu từ context đã tạo.
// useState → Giữ bài hát đang phát (currentSong).



/*      REACT CONTEXT 
===> Giúp tạo ra 1 kho lưu trữ chia sẻ
- Để giúp chạy bài hát vẫn phát nhạc khi chuyển trang (giữ cho MusicPlayer chạy liên tục), ta sử dụng cái này
- Tạo react Context để truyền dữ liệu chung giữa nhiều component mà không cần truyền qua props từng cấp
- React Context giúp tránh "Prop Drilling" (xem thêm)

- Với React Context:
    1/ Tạo 1 context chứa data (ở đây là dữ liệu bài hát)
    2/ Gói toàn bộ app trong cái context đó
    3/ Ở bất kỳ component con nào, chỉ cần useContext(...) là lấy được data — không cần truyền thủ công qua từng cấp

- Trong app này:
    + Ta muốn phát một bài hát ở nhiều trang khác nhau
    + Nếu chỉ dùng useState trong layout.tsx hay trong từng page → nó sẽ reset khi chuyển trang
    + Bằng cách dùng Context, bạn có thể:
        - Gói toàn bộ app với PlayerProvider
        - Trong MusicPlayer lấy ra currentSong từ context
        - Ở bất kỳ trang nào → gọi setCurrentSong(...) là phát nhạc

- Cái Player Context này được dùng trong app/AppWrapper.tsx để 1 cái hàm bọc, rồi chính AppWrapper sẽ được dùng để bọc children trong app/layout.tsx

    [Playlist.tsx] --- click bài hát ---> setCurrentSong(song)
        ↓
    [PlayerContext] cập nhật giá trị currentSong
        ↓
    [MusicPlayer.tsx] thấy song thay đổi → tự load & play

*/

//định nghĩa Context type
type PlayerContextType = {
    currentSong: SongProps | null; //bài hát hiện đang hát (kiểu dữ liệu được import)
    setCurrentSong: (song: SongProps) => void; //hàm để đổi bài hát khác
};

/*tạo Context thực tế để chia sẻ
- createContext(...): tạo ra context để chia sẻ.
- Ban đầu giá trị là undefined vì bạn chưa wrap bằng Provider.
- Lý do dùng undefined là để kiểm tra sau này có quên dùng Provider không.*/
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

/* Tạo Provider để gói toàn app
- PlayerProvider là wrapper component, lưu currentSong trong useState.
- Gói các component con ({children}) bằng PlayerContext.Provider và truyền giá trị xuống. 
- Ví dụ khi dùng 
    <PlayerProvider>
        <App />
    </PlayerProvider>
thì trong bất kỳ component con nào của App, bạn có thể lấy và set bài hát đang phát.*/
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<SongProps | null>(null);

    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong }}>
            {children}
        </PlayerContext.Provider>
    );
};

/*  Custom hook để dùng context
- usePlayer là customhook, nếu bạn quên bọc PlayerProvider, nó sẽ báo lỗi rõ ràng.
- Bạn chỉ cần: const { currentSong, setCurrentSong } = usePlayer(); */
export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
    return context;
};

