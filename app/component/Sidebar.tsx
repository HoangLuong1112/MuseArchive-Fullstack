'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import { FaHome, FaSearch, FaBook, FaMusic, FaHeart, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
    isCollapsed?: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ style, isCollapsed }, ref) => {
    return (
        <div
            ref={ref}
            className={`bg-black text-white h-full p-4 flex flex-col justify-between transition-all duration-300`}
            style={style}
        >
            <div>
                {/* Nút thu gọn / mở rộng
                <button onClick={onToggleCollapse} className="text-white p-2">
                    {isCollapsed ? <FaChevronRight className="text-2xl" /> : <FaChevronLeft className="text-2xl" />}
                </button> */}



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
