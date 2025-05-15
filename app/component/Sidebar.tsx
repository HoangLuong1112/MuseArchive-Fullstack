'use client';
import { Heart, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
// import SidebarPlaylistCard from './SidebarPlaylistCard';
// import { playlists } from '../api/playlists/data';

const MIN_WIDTH = 90;
const MAX_WIDTH = 300;

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const isResizing = useRef(false);
  const isCollapsed = sidebarWidth <= 90;
  const [showMenu, setShowMenu] = useState(false);


  const startResizing = (e: React.MouseEvent) => {
    isResizing.current = true;
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, startWidth + (moveEvent.clientX - startX))
      );
      setSidebarWidth(newWidth);
    };

    const stopResizing = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative h-full flex">
      {/* SIDEBAR */}
      <div
        style={{ width: `${sidebarWidth}px`, transition: 'width 0.2s' }}
        className="bg-black text-white h-full p-4 flex flex-col relative z-10 rounded-r-2xl"
      >
        {/* === Top Bar === */}
        {!isCollapsed ? (
          <div className="flex items-center justify-between mb-4">
            {/* Nút Plus bình thường */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(prev => !prev)}
                className="p-2 rounded hover:bg-gray-700 cursor-pointer"
                title="Thêm"
              >
                <Plus size={20} />
              </button>

              {showMenu && (
                <div className="absolute top-10 left-0 bg-zinc-800 border border-gray-700 rounded shadow-md w-40 z-60">
                  <Link href="/createplaylistpage">
                    <button
                      onClick={() => setShowMenu(false)}
                      className="w-full text-left px-4 py-2 text-white hover:bg-zinc-700 cursor-pointer"
                    >
                      Tạo Playlist
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Collapse button luôn hiển thị */}
            <button
              onClick={() => setSidebarWidth(isCollapsed ? 250 : MIN_WIDTH)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition 
              ${isCollapsed ? 'hover:bg-gray-600' : 'hover:bg-gray-700'} 
              text-white cursor-pointer`}
              title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}
            >
              {isCollapsed ? <ChevronRight size={30} /> : <ChevronLeft size={30} />}
            </button>
          </div>
        ) :
          <>
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => setSidebarWidth(isCollapsed ? 250 : MIN_WIDTH)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition 
              ${isCollapsed ? 'hover:bg-gray-600' : 'hover:bg-gray-700'} 
              text-white  cursor-pointer`}
                title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}
              >
                {isCollapsed ? <ChevronRight size={30} /> : <ChevronLeft size={30} />}
              </button>
            </div>
          </>}
        {/* === Thêm Playlist khi collapse === */}
        {isCollapsed && (
          <Link href="/createplaylistpage"><div
            onClick={() => setShowMenu(true)}
            ref={menuRef}
            title="Tạo playlist"
            className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded transition duration-200 cursor-pointer w-full"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded bg-gradient-to-br from-green-500 to-lime-500">
              <Plus size={20} />
            </div>
          </div></Link>
        )}

        {/* === Liked Songs === */}
        <Link href="/likedsongpage">
          <div className="flex items-center gap-3 hover:bg-gray-800 rounded transition duration-200 w-full px-2 py-2">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded">
              <Heart size={25} />
            </div>
            {!isCollapsed && <span className="text-base">Bài hát đã thích</span>}
          </div>
        </Link>


        {/* === Playlist === */}
        {/* <div className="mt-4 flex-1 overflow-auto">
          {playlists.map((playlist, index) => (
            <SidebarPlaylistCard key={index} playlist={playlist} collapsed={isCollapsed} />
          ))}
        </div> */}
      </div>

      {/* RESIZER - tách ra ngoài sidebar để luôn hiển thị */}
      <div
        onMouseDown={startResizing}
        className="w-1 h-full bg-gray-600 cursor-ew-resize"
        style={{ position: 'relative', zIndex: 0 }}
      />
    </div>
  );
};

export default Sidebar;
