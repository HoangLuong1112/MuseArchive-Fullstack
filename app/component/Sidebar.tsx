'use client';
import { Library, Music, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef } from 'react';
import Link from 'next/link';

const MIN_WIDTH = 60;
const MAX_WIDTH = 300;

const Sidebar = () => {
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const isResizing = useRef(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const isCollapsed = sidebarWidth <= 80;

    // Handle resize
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

  return (
    <div>
      <div
        ref={sidebarRef}
        style={{ width: `${sidebarWidth}px`, transition: 'width 0.2s' }}
        className="bg-zinc-900 text-white h-full p-4 flex flex-col justify-between relative rounded-2xl"
      >
        {/* Collapse toggle */}
        <button
          onClick={() =>
            setSidebarWidth(isCollapsed ? 250 : MIN_WIDTH)
          }
          className="absolute top-2 right-2 text-white p-1 hover:bg-gray-700 rounded"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div>
          {/* Navigation */}
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="/librarypage"><NavItem icon={Library} label="Your Library" collapsed={isCollapsed} /></Link>
            <Link href="/createplaylistpage"><NavItem icon={Music} label="Create Playlist" collapsed={isCollapsed} /></Link>
            <Link href="/likedsongpage"><NavItem icon={Heart} label="Liked Songs" collapsed={isCollapsed} /></Link>
          </nav>
        </div>

        {/* Playlist Section */}
        {/* <div className="mt-6">
          {!isCollapsed && (
            <>
              <h3 className="text-sm font-semibold mb-2">Playlists</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <p>Top Hits</p>
                <p>Chill Vibes</p>
                <p>Rock Classics</p>
                <p>Workout Playlist</p>
              </div>
            </>
          )}
        </div> */}
      </div>

      {/* Resizer */}
      <div
        onMouseDown={startResizing}
        className="w-1 bg-gray-600 cursor-ew-resize"
      />
    </div>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  collapsed?: boolean;
}

const NavItem = ({ icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-800 p-2 rounded transition duration-200">
      <Icon size={20} />
      {!collapsed && <span className="text-base">{label}</span>}
    </div>
  );
};

export default Sidebar;
