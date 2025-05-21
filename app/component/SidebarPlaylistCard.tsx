import React, { useEffect, useRef, useState } from 'react';
import { Playlist } from '@/types/song_final';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { MoreVertical, XIcon } from 'lucide-react';
import CreatePlaylistModal from './CreatePlaylistModal';
import { useRouter } from 'next/navigation';

interface SidebarPlaylistCardProps {
    playlist: Playlist;
    collapsed: boolean;
}

const SidebarPlaylistCard: React.FC<SidebarPlaylistCardProps> = ({ playlist, collapsed }) => {
    const [showMenu, setShowMenu] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const { getAccessToken } = useAuth();
	const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleDelete = async () => {
		if (!confirm('Bạn có chắc muốn xóa playlist này không?')) return;
		try {
			const token = await getAccessToken();
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user-playlists/${playlist.id}/`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) throw new Error('Lỗi khi xóa playlist');
			alert('Xóa playlist thành công!');
            router.push('/');
			// location.reload(); // hoặc gọi callback props để update UI
            
		} catch (err) {
			console.error(err);
			alert('Xóa playlist thất bại.');
		}
	};

    return (
        <div className='relative group'>
            <Link href={`/playlist/${playlist.id}`}>
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
                        </div>
                    )}
                </div>
            </Link>

            {/* Dấu 3 chấm bắt đầu từ đây */}
            <div className="absolute top-1/2 right-3 -translate-y-1/2" ref={menuRef}>
				<button onClick={() => setShowMenu(prev => !prev)} className="hover:text-gray-300">
					<MoreVertical size={18} />
				</button>

				{showMenu && (
					<div className="absolute right-0 top-8 bg-zinc-800 border border-gray-600 rounded shadow-lg z-50 w-40 text-sm">
						<button onClick={() => { setShowEditModal(true); setShowMenu(false); }} className="w-full px-4 py-2 hover:bg-zinc-700 text-left">Sửa Playlist</button>
						<button onClick={() => { handleDelete(); setShowMenu(false); }} className="w-full px-4 py-2 text-red-400 hover:bg-zinc-700 text-left">Xóa Playlist</button>
					</div>
				)}
			</div>

			{showEditModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60">
				    <div className="relative bg-black">
						<CreatePlaylistModal mode="edit" playlist={playlist} onSuccess={() => { setShowEditModal(false); location.reload(); }} />
                        <button onClick={() => setShowEditModal(false)} className="absolute top-2 right-2 text-white text-xl hover:text-red-400">
						    <XIcon size={30} />
					    </button>
					</div>
				</div>
			)}
        </div>
        
    );
};

export default SidebarPlaylistCard;
