'use client';
import { Heart, ChevronLeft, ChevronRight, Plus, XIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import SidebarPlaylistCard from './SidebarPlaylistCard';
import { useAuth } from '../context/AuthContext';
import { Playlist } from '@/types/song_final';
import CreatePlaylistModal from './CreatePlaylistModal';

const MIN_WIDTH = 90;
const MAX_WIDTH = 300;

type SidebarPlaylist = {
	id: string;
	playlist_name: string;
	cover_image: string;
	description: string;
	is_public: boolean;
	user_id: string;
}

const Sidebar = () => {
	const {currentUser} = useAuth();
	const { getAccessToken } = useAuth();
	const [sidebarWidth, setSidebarWidth] = useState(250);
	const isResizing = useRef(false);
	const isCollapsed = sidebarWidth <= 90;
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
	


	//hàm lọc các playlist ra
	const sortUserPlaylists = userPlaylists.filter(p =>
		p.createdby === currentUser?.id
	);


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

	useEffect(() => {
		const fetchUserPlaylists = async () => {
			if (!currentUser) return;

			try {
			const token = await getAccessToken?.();
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user-playlists/`, {
				headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				},
			});

			if (!res.ok) {
				console.error('Failed to fetch playlists');
				return;
			}

			const data = await res.json();
			// console.log('Playlist người dùng - Sidebar: ', data);

			// Nếu cần map lại field cho đúng type Playlist
			const formattedPlaylists: Playlist[] = data.map((item: SidebarPlaylist) => ({
				id: item.id,
				playlistName: item.playlist_name,
				coverUrl: item.cover_image,
				description: item.description || '',
				isPublic: item.is_public,
				createdby: item.user_id,
			}));

			setUserPlaylists(formattedPlaylists);
			} catch (err) {
			console.error('Error fetching playlists:', err);
			}
		};

		fetchUserPlaylists();
	}, [currentUser, getAccessToken]);

	return (
		<div className="relative h-full flex">
			<div style={{ width: `${sidebarWidth}px`, transition: 'width 0.2s' }} className="bg-zinc-900 text-white h-full p-4 flex flex-col relative z-10 rounded-r-2xl">
		
				{/* === Top Bar === */}
				{!isCollapsed ? (
				<div className="flex items-center justify-between mb-4">

					{/* Nút tạo playlist mới */}
					<div className="relative" ref={menuRef}>
						<button title="Thêm" onClick={() => setShowMenu(prev => !prev)} className="p-2 rounded hover:bg-gray-700 cursor-pointer">
							<Plus size={20} />
						</button>

						{showMenu && (
							<div className="absolute top-10 left-0 bg-zinc-800 border border-gray-700 rounded shadow-md w-40 z-60">
								{/* Gọi modal thay vì Link */}
								<button
									onClick={() => {
										setShowModal(true);
										setShowMenu(false);
									}} className="w-full text-left px-4 py-2 text-white hover:bg-zinc-700 cursor-pointer">
									Tạo Playlist
								</button>
							</div>
						)}
					</div>

					<span>Thư viện</span>

					{/* Collapse button luôn hiển thị */}
					<button
						onClick={() => setSidebarWidth(isCollapsed ? 250 : MIN_WIDTH)}
						className={`w-8 h-8 flex items-center justify-center rounded-full transition 
						${isCollapsed ? 'hover:bg-gray-600' : 'hover:bg-gray-700'} 
						text-white cursor-pointer`}
						title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}>
							{isCollapsed ? <ChevronRight size={30} /> : <ChevronLeft size={30} />}
					</button>
				</div>
				) : 
				<div>
					<div className="flex items-center justify-center mb-4">
						<button
							onClick={() => setSidebarWidth(isCollapsed ? 250 : MIN_WIDTH)}
							className={`w-8 h-8 flex items-center justify-center rounded-full transition 
							${isCollapsed ? 'hover:bg-gray-600' : 'hover:bg-gray-700'} text-white  cursor-pointer`}
							title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}>
								{isCollapsed ? <ChevronRight size={30} /> : <ChevronLeft size={30} />}
						</button>
					</div>
				</div>}
				{/* === Thêm Playlist khi collapse === */}
				{isCollapsed && (
					<Link href="/createplaylistpage">
						<div onClick={() => setShowMenu(true)} ref={menuRef} title="Tạo playlist"
							className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded transition duration-200 cursor-pointer w-full">
							<div className="w-10 h-10 flex items-center justify-center rounded bg-gradient-to-br from-green-500 to-lime-500">
								<Plus size={20} />
							</div>
						</div>
					</Link>
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


				{/* === Playlist của người dùng === */}
				<div className="flex-1 overflow-auto">
					{sortUserPlaylists.map((playlist, index) => (
						<SidebarPlaylistCard key={index} playlist={playlist} collapsed={isCollapsed} />
					))}
				</div>
			</div>

			{/* RESIZER - tách ra ngoài sidebar để luôn hiển thị */}
			<div onMouseDown={startResizing} className="w-1 h-full  cursor-ew-resize" style={{ position: 'relative', zIndex: 0 }}/>
		
			{showModal && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60">
				<div className="relative bg-black">
					<CreatePlaylistModal />
					<button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-white text-xl hover:text-red-400">
						<XIcon size={30} />
					</button>
				</div>
			</div>
)}
		</div>
	);
};

export default Sidebar;
