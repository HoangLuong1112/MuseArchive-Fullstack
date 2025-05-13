'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Playlist } from '@/types/song'
import Banner from '@/app/component/Banner'
import SongList from '@/app/component/SongList'

// TRANG DANH SÁCH CÁC BÀI HÁT TRONG PLAYLIST
//      Hiển thị danh sách bài hát bên trong playlist đã được chọn.

export default function PlaylistDetail() {
	const { id } = useParams() //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
	const [playlist, setPlaylist] = useState<Playlist | null>(null)

	useEffect(() => {
		fetch(`/api/playlists/${id}`)
		.then(res => res.json())
		.then(data => setPlaylist(data))
	}, [id])

	if (!playlist) return <div className="p-4">Đang tải...</div>

	return (
		<div className="">
			<Banner type='Playlist' coverUrl={playlist.coverUrl} name={playlist.playlistName} description={playlist.description} musician={playlist.musician} />
			<SongList songlist={playlist.songList}/>
		</div>
	)
}
