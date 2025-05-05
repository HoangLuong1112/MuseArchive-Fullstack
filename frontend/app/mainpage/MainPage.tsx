'use client'
import { useState, useRef } from 'react';
import MusicPlayer from '../component/MusicPlayer';
import NavBar from './NavBar';
import Playlist, { SongProps } from '../component/Playlist';
import Sidebar from '../component/Sidebar';
import AlbumList from '../component/AlbumList';

const MainPage = () => {
    const [currentSong, setCurrentSong] = useState<SongProps | null>(null);
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const isResizing = useRef(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const isCollapsed = sidebarWidth <= 80;

    const startResizing = (e: React.MouseEvent) => {
        isResizing.current = true;
        const startX = e.clientX;
        const startWidth = sidebarWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
            if (isResizing.current) {
                const newWidth = Math.max(startWidth + (moveEvent.clientX - startX), 60);
                setSidebarWidth(newWidth);
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
        <div className="h-screen w-full flex flex-col">
            <NavBar />
            <div className="flex h-full">
                <Sidebar
                    style={{ width: `${sidebarWidth}px`, transition: 'width 0.3s' }}
                    isCollapsed={isCollapsed}
                    ref={sidebarRef}
                />

                <div
                    className="bg-gray-500 cursor-ew-resize w-1"
                    onMouseDown={startResizing}
                />

                <div className="flex-1 p-4 bg-gray-200 overflow-y-auto">
                    <h2>Main Content</h2>
                    <p>Welcome to the main page of the Muse Archive!</p>
                    <Playlist onSelect={setCurrentSong} />

                    <AlbumList />
                </div>
            </div>

            {currentSong && <MusicPlayer song={currentSong} />}

            
        </div>
    );
};

export default MainPage;
