import React from 'react';
import { Playlist } from '@/types/song';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarPlaylistCardProps {
    playlist: Playlist;
    collapsed: boolean;
}

const SidebarPlaylistCard: React.FC<SidebarPlaylistCardProps> = ({ playlist, collapsed }) => {
    return (
        <Link href={`/playlist`}>
            <div className="flex items-center gap-3 hover:bg-gray-800 rounded cursor-pointer transition w-full px-2 py-2">
                <div className="w-10 h-10 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                    {playlist.coverUrl ? (
                        <Image
                            src={playlist.coverUrl}
                            alt={playlist.playlistName}
                            className="w-full h-full object-cover"
                            width={25}
                            height={25}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-500" />
                    )}
                </div>
                {!collapsed && (
                    <div className="flex flex-col">
                        <span className="text-sm truncate">{playlist.playlistName}</span>
                        <span className="text-xs text-gray-400 truncate">{playlist.createdby}</span>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default SidebarPlaylistCard;
