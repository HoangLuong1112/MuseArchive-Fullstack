'use client'

import { SongProps } from '@/types/song_final'
import { FaHeart, FaRegHeart, FaEllipsisH } from 'react-icons/fa'
import { usePlayer } from '../context/PlayerContext'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { playlists } from '../api/playlists/data'

interface SongRowProps {
	song: SongProps
	index: number
	songlist: SongProps[]
}

function formatDuration(duration: number) {
	const minutes = Math.floor(duration / 60)
	const seconds = duration % 60
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function SongRow({ song, index, songlist }: SongRowProps) {
	const { currentSong, setCurrentSong } = usePlayer()
	const { currentUser, setCurrentUser } = useAuth()
	// thêm state mở menu để tham chiếu vân vân (cho nút thêm vào playlist)
	const [showOptions, setShowOptions] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);


	const isLiked = currentUser?.likedSong?.includes(song.id)
	const isCurrent = currentSong?.title === song.title

	// Đóng khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowOptions(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// xử lý bài hát yêu thích
	const toggleLike = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!currentUser) return

		let updatedLikedSongs = [...(currentUser.likedSong || [])]

		if (isLiked) {
			// Gỡ bỏ bài hát khỏi danh sách đã thích
			updatedLikedSongs = updatedLikedSongs.filter(id => id !== song.id)
		} else {
			// Thêm bài hát vào danh sách đã thích
			updatedLikedSongs.push(song.id)
		}

		// Cập nhật currentUser
		setCurrentUser({
			...currentUser,
			likedSong: updatedLikedSongs
		})
	}

	// XỬ LÝ THÊM XÓA BÀI HÁT
	const userPlaylists = playlists.filter(p =>
		currentUser?.userPlaylist.includes(p.id)
	);

	// Kiểm tra bài hát có trong playlist chưa
	const isSongInPlaylist = (playlistId: string) => {
		const playlist = playlists.find(p => p.id === playlistId);
		return playlist?.songList?.includes(song.id);
	};

	const handleToggleSongInPlaylist = (playlistId: string) => {
		const playlist = playlists.find(p => p.id === playlistId);
		if (!playlist) return;

		if (!playlist.songList) playlist.songList = [];

		const songExists = playlist.songList.includes(song.id);

		if (songExists) {
			playlist.songList = playlist.songList.filter(id => id !== song.id);
		} else {
			playlist.songList.push(song.id);
		}

		// Cập nhật lại currentUser nếu cần
		setCurrentUser({ ...currentUser! });
	};

	const handleContextMenu = (e: React.MouseEvent) => {
		e.stopPropagation()
		// mở menu tùy chọn (nếu có)
		setShowOptions(prev => !prev);
	}

	return (
		<div className={`grid grid-cols-12 gap-4 py-3 px-5 items-center cursor-pointer rounded-lg hover:bg-gray-800 transition ${
				isCurrent ? 'bg-gray-700' : ''
			}`}
			onClick={() => setCurrentSong(song, songlist)}>

            {/* cột 1 */}
			<div className="col-span-1 text-gray-400">{index + 1}</div>

            {/* Cột 2 */}
			<div className="col-span-6">
				<Link href={`/track/${song.id}`}>
					<div className="font-medium text-white hover:underline">{song.title}</div>
				</Link>
				<Link href={`/musician/${song.artist.id}`}>
					<div className="text-sm text-gray-400 hover:underline">{song.artist.name}</div>
				</Link>
			</div>

            {/* cột 3 */}
			<div className="col-span-3 text-gray-400">
				{formatDuration(song.duration || 0)}
			</div>

            {/* cột 4 */}
			<div className="col-span-2 flex justify-end gap-3">
				<button onClick={toggleLike} title={isLiked ? 'Bỏ thích' : 'Thích'} className="text-gray-400 hover:text-white">
					{isLiked ? <FaHeart className="text-green-500" /> : <FaRegHeart />}
				</button>
				<button
					onClick={handleContextMenu}
					title="More options"
					className="text-gray-400 hover:text-white">
					<FaEllipsisH />
					{showOptions && (
						<div ref={menuRef} className="absolute z-50 bg-zinc-800 border border-zinc-700 rounded shadow-md p-2 right-5 mt-1 w-64">
							<div className="text-white font-semibold mb-2">Thêm vào Playlist</div>
							{userPlaylists.length === 0 && (
								<div className="text-gray-400 text-sm">Bạn chưa có playlist nào</div>
							)}
							{userPlaylists.map(pl => {
								const checked = isSongInPlaylist(pl.id);
								return (
									<label key={pl.id} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer py-1">
										<input type="checkbox" checked={checked} onChange={() => handleToggleSongInPlaylist(pl.id)}/>
										<span>{pl.playlistName}</span>
									</label>
								);
							})}
						</div>
					)}
				</button>
			</div>
		</div>
	)
}
