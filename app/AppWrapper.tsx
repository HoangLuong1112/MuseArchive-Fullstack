'use client';

import NavBar from "./component/NavBar";
import Sidebar from "./component/Sidebar";
import MusicPlayer from "./component/MusicPlayer";
import { PlayerProvider } from "./context/PlayerContext";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./context/AuthContext";

// Đây là component dùng để gói toàn bộ giao diện lại, đóng vai trò như 1 phần mở rộng của app/layout.tsx
// Nơi bọc toàn bộ ứng dụng trong <PlayerProvider> – đây là cái trực tiếp kích hoạt cơ chế Context hoạt động.

{/* Tạo thanh cuộn bằng overflow
    flex flex-1 min-h-0: nếu không có min-h-0, phần overflow-y-auto sẽ không cuộn được do Flexbox không biết giới hạn chiều cao của phần tử con.
    overflow-y-auto: Cho phép scroll trong phần children. */}

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    
    const pathname = usePathname(); // Lấy đường dẫn hiện tại
    const isLoginPage = pathname === '/loginpage';
    const isSignUpPage = pathname === '/signuppage';
    return (
        // bọc trong các Provider để có thể chạy bài hát ở bất kỳ chỗ nào trên trang bằng cách gọi
        <AuthProvider>
            <PlayerProvider>
                <div className="h-screen w-full flex flex-col bg-gray-900">
                    {!isLoginPage && !isSignUpPage  && <NavBar />}
                    <div className="flex flex-1 min-h-0 gap-3 mx-3 m-3 scrollbar-hide scroll-smooth">
                        {!isLoginPage && !isSignUpPage && <Sidebar />}
                        <div className={`flex-1 min-h-0 overflow-y-auto 
                            ${!isLoginPage && !isSignUpPage ? 'bg-gradient-to-t from-purple-700 to-blue-800 text-white rounded-2xl px-5 pt-5 pb-56 scrollbar-hide scroll-smooth' : ''}`}>
                            {children}
                        </div>
                    </div>
                    {!isLoginPage && <MusicPlayer />}
                </div>
            </PlayerProvider>
        </AuthProvider>
    );
}
