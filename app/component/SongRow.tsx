'use client'

import { SongProps } from '@/types/song_final'
import { FaHeart, FaRegHeart, FaEllipsisH } from 'react-icons/fa'
import { usePlayer } from '../context/PlayerContext'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { Download } from 'lucide-react'

type LocalPlaylist = {
	id: string;
	playlistName: string;
	createdby?: string;
	songs: { id: string }[]; // chỉ cần id để check
}

interface SongRowProps {
	song: SongProps
	index: number
	songlist: SongProps[]
}

type SongRowUserPlaylist = {
	id:string
	playlist_name: string
	user_id: string
	songs: {
		id: string	
	}[]
}

function formatDuration(duration: number) {
	const minutes = Math.floor(duration / 60)
	const seconds = duration % 60
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}



export default function SongRow({ song, index, songlist }: SongRowProps) {
	const { getAccessToken, currentUser } = useAuth()
	const { currentSong, setCurrentSong } = usePlayer()
	const [userPlaylists, setUserPlaylists] = useState<LocalPlaylist[]>([])
	const [showOptions, setShowOptions] = useState(false); //mở cac option
	const menuRef = useRef<HTMLDivElement>(null);
	const [isLiked, setIsLiked] = useState(false);

	//check xem bài hát có trong danh sách yêu thích hay không
	//check xem bài hát có đang phát hay không
	const isCurrent = currentSong?.title === song.title


	// Đóng cái khung option khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowOptions(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	//	Trạng thái bài hát hiện tại

	//lấy danh sách bài hát yêu thích để check
	useEffect(() => {
		const fetchLikedSongs = async () => {
			if (!currentUser) return;

			try {
				const token = await getAccessToken();
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/favorite-songs/`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});

				if (!res.ok) throw new Error('Không lấy được danh sách yêu thích');

				const data = await res.json();
				console.log('Check bài hát đc yêu thích ko: ', data);
				
				// check bài hát có trong danh sách yêu thích hay không
				const ids = data.map((entry: { song: { id: string } }) => entry.song.id);
				setIsLiked(ids.includes(song.id));
			} catch (err) {
				console.error('Error fetching liked songs:', err);
			}
		};

		fetchLikedSongs();
	}, [currentUser, song.id, getAccessToken]);

	// xử lý bài hát yêu thích
	const toggleLike = async (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!currentUser) return;

		try {
			const token = await getAccessToken();
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/favorite-songs/toggle/`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ song_id: song.id }), // ?????????????????????????????
			});

			if (!res.ok) throw new Error('Không thể chuyển trạng thái yêu thích');

			setIsLiked(prev => !prev);
		} catch (err) {
			console.error('Lỗi khi toggle like:', err);
			alert('Có lỗi khi chuyển trạng thái yêu thích');
		}
	}


	// lấy các playlist của người dùng
	useEffect(() => {
		const fetchUserPlaylists = async () => {
			if (!currentUser) return;

			try {
			const token = await getAccessToken();
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

				// Map lại field cho đúng type Playlist
				const formattedPlaylists: LocalPlaylist[] = data.map((item: SongRowUserPlaylist) => ({
					id: item.id,
					playlistName: item.playlist_name,
					createdby: item.user_id,
					songs: item.songs, //lấy id để check
				}));
				// Lọc các playlist của người dùng
				const sortUserPlaylists = formattedPlaylists.filter(p =>
					p.createdby === currentUser?.id
				);				
				
				setUserPlaylists(sortUserPlaylists);
			} catch (err) {
				console.error('Error fetching playlists:', err);
			}
		};

		fetchUserPlaylists();
	}, [currentUser, getAccessToken]);
	

	//xử lý thêm bài hát vào playlist
	const handleToggleSongInPlaylist = async (playlistId: string, isChecked: boolean) => {
		try {
			const token = await getAccessToken();
			const url = `${process.env.NEXT_PUBLIC_API_URL}api/user-playlists/${playlistId}/${isChecked ? 'add_song' : 'remove_song'}/`;
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ song_id: song.id }),
			});

			if (!res.ok) throw new Error(`Lỗi khi ${isChecked ? 'thêm' : 'xoá'} bài hát`);

			// Cập nhật lại userPlaylists local (cập nhật state cho UX mượt hơn)
			setUserPlaylists(prev => prev.map(pl => pl.id === playlistId ? {
					...pl,
					songs: isChecked
						? [...(pl.songs ?? []), song] : (pl.songs ?? []).filter(s => s.id !== song.id),
				} : pl
			));
		} catch (err){
			console.error(err);
			alert('Có lỗi xảy ra');
		}
	};

	const handleDownloadMusic = async () => {
		try {
			const token = await getAccessToken();
            if (!token) return;

			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stream_song/${song.id}/`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			});

			if (!res.ok) throw new Error("Không lấy đc stream song");

			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			
			// Tạo thẻ <a> để tải file
			const a = document.createElement('a');
			a.href = url;
			a.download = `${song.title || 'song'}.mp3`; // hoặc định dạng tùy theo API
			document.body.appendChild(a);
			a.click();

			// Dọn dẹp
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (err) {
			console.error(err);
		}
	}

	const handleContextMenu = (e: React.MouseEvent) => {
		e.stopPropagation()
		// mở menu tùy chọn
		setShowOptions(prev => !prev);
	}

	return (
		<div className={`grid grid-cols-12 gap-4 py-3 px-5 items-center cursor-pointer rounded-lg hover:bg-gray-800 transition ${isCurrent ? 'text-green-600' : 'text-gray-400'}`}
			onClick={() => setCurrentSong(song, songlist)}>

            {/* cột 1 */}
			<div className="col-span-1">{index + 1}</div>

            {/* Cột 2 */}
			<div className="col-span-6">
				<Link href={`/track/${song.id}`}>
					<div className={`font-medium hover:underline ${isCurrent ? 'text-green-600' : 'text-white'}`}>{song.title}</div>
				</Link>
				<Link href={`/musician/${song.artist.id}`}>
					<div className="text-sm hover:underline">{song.artist.name}</div>
				</Link>
			</div>

            {/* cột 3 */}
			<div className="col-span-2">
				{formatDuration(song.duration || 0)}
			</div>

			{/* Cột 4 */}
			<div className="col-span-1  flex justify-center">
				{song.views}
			</div>

            {/* cột 5 */}
			<div className="col-span-2 flex justify-end gap-3 text-gray-400">

				{/* Tim / Like */}
				<button onClick={toggleLike} title={isLiked ? 'Bỏ thích' : 'Thích'} className="hover:text-white cursor-pointer">
					{isLiked ? <FaHeart className="text-green-500" /> : <FaRegHeart />}
				</button>

				{/* Download bài hát */}
				<button onClick={handleDownloadMusic} title="Tải về" className='hover:text-white cursor-pointer'>
					<Download size={20} />
				</button>
				
				{/* Thêm vào playlist */}
				<button onClick={handleContextMenu} title="More options" className=" hover:text-white relative cursor-pointer">
					<FaEllipsisH />

					{showOptions && (
						<div ref={menuRef} className="absolute z-80 bg-zinc-800 border border-zinc-700 rounded shadow-md p-2 right-1 w-48">
							<div className="text-white font-semibold mb-2">Thêm vào Playlist</div>
							
							{userPlaylists.length === 0 && (
								<div className="text-gray-400 text-sm">Bạn chưa có playlist nào</div>
							)}

							{userPlaylists.map(pl => (
								<label key={pl.id} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer py-1">
									<input type="checkbox"
										checked={(pl.songs ?? []).some(s => s.id === song.id)}
										onChange={(e) => handleToggleSongInPlaylist(pl.id, e.target.checked)}/>
									<span>{pl.playlistName}</span>
								</label>
							))}
						</div>
					)}
				</button>
			</div>
		</div>
	)
}
