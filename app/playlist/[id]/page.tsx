'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Playlist } from '@/types/song'
import { usePlayer } from '@/app/context/PlayerContext'
import Image from 'next/image'

// TRANG DANH SÁCH CÁC BÀI HÁT TRONG PLAYLIST
//      Hiển thị danh sách bài hát bên trong playlist đã được chọn.

export default function PlaylistDetail() {
	const { id } = useParams() //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
	const [playlist, setPlaylist] = useState<Playlist | null>(null)
	const { setCurrentSong } = usePlayer(); // 👈 Lấy hàm setCurrentSong từ context

	useEffect(() => {
		fetch(`/api/playlists/${id}`)
		.then(res => res.json())
		.then(data => setPlaylist(data))
	}, [id])

	if (!playlist) return <div className="p-4">Đang tải...</div>

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">{playlist.playlistName}</h1>
			<h1 className="text-2xl font-bold">{playlist.musician}</h1>
			{playlist.description}
			{playlist.songList?.map((song, index) => (
				<div key={index} className="p-2 flex items-center gap-4 bg-zinc-800 rounded-md hover:bg-zinc-700 cursor-pointer" 
					onClick={() => setCurrentSong(song)}>
					<Image src={song.albumArt} alt={song.title} width={48} height={48} className=" object-cover rounded" />
					<div>
						<p className="text-white font-medium">{song.title}</p>
						<p className="text-zinc-400 text-sm">{song.artist}</p>
					</div>

				</div>
			))}
		</div>
	)
}
