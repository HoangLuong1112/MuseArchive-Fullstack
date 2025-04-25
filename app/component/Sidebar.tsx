'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import { FaHome, FaSearch, FaBook, FaMusic, FaHeart, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ style, isCollapsed, onToggleCollapse }, ref) => {
    return (
        <div
            ref={ref}
            className={`bg-gradient-to-b from-[#1e1e1e] to-black text-white h-full p-4 flex flex-col justify-between transition-all duration-300 text-sm rounded-lg`} // Áp dụng text-sm cho toàn bộ sidebar
            style={style}
        >
            <div>
                {/* Nút thu gọn / mở rộng */}
                <div className="flex items-center">
                    <button onClick={onToggleCollapse} className="text-white p-2">
                        {isCollapsed ? <FaChevronRight className="text-1xl" /> : <FaChevronLeft className="text-1xl" />}
                    </button>
                </div>

                {/* Thanh tìm kiếm với Icon */}
                <div className="mb-6">
                    <div className="flex items-center rounded p-2">
                        {isCollapsed ? "" : 
                        <><FaSearch className="text-white text-lg mr-2" /><input
                                type="text"
                                placeholder="Search"
                                className="w-full text-white bg-black placeholder-gray-400 focus:outline-none rounded-lg p-2" /></>}

                    </div>
                </div>


                {/* Navigation */}
                <nav className="flex flex-col gap-4">
                    <NavItem Icon={FaBook} text="Your Library" collapsed={isCollapsed} />
                    <NavItem Icon={FaMusic} text="Create Playlist" collapsed={isCollapsed} />
                    <NavItem Icon={FaHeart} text="Liked Songs" collapsed={isCollapsed} />
                </nav>
            </div>

            {/* Playlist */}
            <div className="mt-6">
                {!isCollapsed && (
                    <>
                        <h3 className="text-sm font-semibold mb-2">Playlists</h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <p>Top Hits</p>
                            <p>Chill Vibes</p>
                            <p>Rock Classics</p>
                            <p>Workout Playlist</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});




interface NavItemProps {
    Icon: React.ElementType;
    text: string;
    collapsed?: boolean;
}

const NavItem = ({ Icon, text, collapsed }: NavItemProps) => {
    return (
        <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-800 p-2 rounded transition duration-200">
            <Icon className="text-xl" />
            {!collapsed && <span className="text-base">{text}</span>}
        </div>
    );
};

export default Sidebar;
