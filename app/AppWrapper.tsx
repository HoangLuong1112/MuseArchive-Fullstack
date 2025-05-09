'use client';

import NavBar from "./component/NavBar";
import Sidebar from "./component/Sidebar";
import MusicPlayer from "./component/MusicPlayer";
import { PlayerProvider } from "./context/PlayerContext";
import { usePathname } from "next/navigation";

// Đây là component dùng để gói toàn bộ giao diện lại, đóng vai trò như 1 phần mở rộng của app/layout.tsx
// Nơi bọc toàn bộ ứng dụng trong <PlayerProvider> – đây là cái trực tiếp kích hoạt cơ chế Context hoạt động.
export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname(); // Lấy đường dẫn hiện tại

    const isLoginPage = pathname === '/loginpage';
    const isSignUpPage = pathname === '/signuppage';
    return (
        // bọc trong PlayerProvider để có thể chạy bài hát ở bất kỳ chỗ nào trên trang bằng cách gọi
        <PlayerProvider>
            {/* Tạo thanh cuộn bằng overflow
            flex flex-1 min-h-0: nếu không có min-h-0, phần overflow-y-auto sẽ không cuộn được do Flexbox không biết giới hạn chiều cao của phần tử con.
            overflow-y-auto: Cho phép scroll trong phần children. */}
            <div className="h-screen w-full flex flex-col">
                {!isLoginPage && !isSignUpPage  && <NavBar />}
                <div className="flex flex-1 min-h-0">
                    {!isLoginPage && !isSignUpPage && <Sidebar />}
                    <div className={`flex-1 min-h-0 overflow-y-auto ${!isLoginPage && !isSignUpPage ? 'p-4' : ''}`}>
                        {children}
                    </div>
                </div>
                {!isLoginPage && <MusicPlayer />}
            </div>
        </PlayerProvider>
    );
}
