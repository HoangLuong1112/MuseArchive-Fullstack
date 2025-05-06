'use client'

import React, { useState } from 'react'
import { Home, Search, Bell, ChevronDown } from 'lucide-react'

const NavBar: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="w-full h-16 px-6 flex items-center justify-between bg-neutral-900 text-white shadow-sm relative">
            {/* Left: Spotify logo */}
            <div className="flex items-center gap-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Spotify_2.png"
                    alt="Spotify Logo"
                    className="h-8"
                />

            </div>

            {/* Center: Home + Search */}
            <div className="flex items-center gap-6 w-1/2 justify-center">
                <button className="flex items-center gap-2 text-sm font-medium hover:text-green-400 transition">
                    <Home size={20} />
                    <span>Trang chủ</span>
                </button>

                <div className="flex items-center bg-neutral-800 px-3 py-1.5 rounded-full w-full max-w-md hover:bg-neutral-700 transition">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài hát, nghệ sĩ..."
                        className="bg-transparent outline-none text-sm text-white ml-2 w-full placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Right: Notification + User */}
            <div className="flex items-center gap-4 relative">
                <button className="p-2 rounded-full hover:bg-neutral-800 transition">
                    <Bell size={20} />
                </button>

                {/* User Avatar with dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center gap-2 bg-gray-700 rounded-full px-3 py-1 hover:bg-gray-600 transition"
                    >
                        <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">
                            U
                        </div>
                        <ChevronDown size={16} />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg py-2 z-50">
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700">
                                Trang cá nhân
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700">
                                Cài đặt
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 text-red-400">
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar
