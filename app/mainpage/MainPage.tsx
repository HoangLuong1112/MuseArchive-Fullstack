'use client';
import { useState, useRef } from 'react';
import MusicPlayer from '../component/MusicPlayer';
import NavBar from './NavBar';
import Sidebar from '../component/Sidebar';
import MainContent from '../component/MainContent';
import { SongProps } from '../component/Playlist';

const MainPage = () => {
    const [currentSong, setCurrentSong] = useState<SongProps | null>(null);
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const isResizing = useRef(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const COLLAPSE_THRESHOLD = 200;


    const toggleSidebar = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        setSidebarWidth(newCollapsed ? 80 : 250);
    };

    const startResizing = (e: React.MouseEvent) => {
        isResizing.current = true;
        const startX = e.clientX;
        const startWidth = sidebarWidth;
    
        const onMouseMove = (moveEvent: MouseEvent) => {
            if (isResizing.current) {
                const newWidth = Math.max(startWidth + (moveEvent.clientX - startX), 60);
                setSidebarWidth(newWidth);
    
                // Tự động thu gọn/mở rộng theo ngưỡng
                if (newWidth < COLLAPSE_THRESHOLD && !isCollapsed) {
                    setIsCollapsed(true);
                } else if (newWidth >= COLLAPSE_THRESHOLD && isCollapsed) {
                    setIsCollapsed(false);
                }
            }
        };
    
        const stopResizing = () => {
            isResizing.current = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', stopResizing);
        };
    
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopResizing);
    };    

    return (
        <div className="bg-black h-screen w-full flex flex-col">
            <NavBar />
            <div className="flex h-full">
                <Sidebar
                    ref={sidebarRef}
                    style={{ width: `${sidebarWidth}px` }}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={toggleSidebar}
                />
                <div
                    className="cursor-ew-resize w-1 resize-handle"
                    onMouseDown={startResizing}
                />
                <MainContent onSelectSong={setCurrentSong} />
            </div>
            {currentSong && <MusicPlayer song={currentSong} />}
        </div>
    );
};

export default MainPage;
