'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext'; 
import SearchBar from './SearchBar';

const NavBar: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser, logout } = useAuth(); // ⬅ Lấy user + logout
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/loginpage');
    };

    return (
        <div className="w-full h-16 px-6 flex items-center justify-between text-white shadow-sm relative py-4 bg-blue-950">
            {/* Left: Spotify logo */}
            <div className="flex items-center gap-2">
                {/* <Link href={"/"}> */}
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Spotify_2.png" alt="Spotify Logo" width={32} height={32}/>
                {/* </Link> */}
            </div>

            {/* Center: Home + Search */}
            <div className="flex items-center gap-6 w-1/2 justify-center">
                <Link href={"/"}>
                    <button className="flex items-center gap-2 text-sm font-medium hover:text-green-400 transition cursor-pointer">
                        <Home size={20} />
                        <span>Trang chủ</span>
                    </button>
                </Link>

                <SearchBar />
            </div>

            {/* Right: Notification + User */}
            <div className="flex items-center gap-4 relative">
                {/* <button className="p-2 rounded-full hover:bg-neutral-800 transition">
                    <Bell size={20} />
                </button> */}

                {/* User Avatar with dropdown (chỉ hiện nếu đã đăng nhập) */}
                {currentUser ? (
                    <div className="relative group">
                        <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2 rounded-full px-3 py-1 bg-zinc-200 group-hover:bg-zinc-400 transition">
                            
                            {currentUser?.avatarPic ? (
                                <Image src={currentUser.avatarPic} alt="avatar" width={24} height={24} className="rounded-full" />
                            ) : (
                                <div className="w-6 h-6 rounded-full text-black flex items-center justify-center text-sm font-bold">
                                    {currentUser.userName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className='text-black group-hover:text-white'>
                                <ChevronDown size={16} />
                            </div>
                           
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg py-2 z-50">
                                <Link href="/profile">
                                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700">
                                        Trang cá nhân
                                    </button>
                                </Link>
                                {/* <button className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700">
                                    Cài đặt
                                </button> */}
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 text-red-400">
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/loginpage" className="text-green-400 hover:text-white rounded-4xl px-4 py-2 border-2 border-white hover:border-black hover:bg-green-400">
                        Đăng nhập
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
