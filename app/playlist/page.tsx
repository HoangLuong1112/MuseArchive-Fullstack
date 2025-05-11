'use client'

import { Playlist } from '@/types/song'
import { useEffect, useState } from 'react'
import PlaylistCard from '../component/PlaylistCard'
/*      /playlist:
- gọi API /api/playlists
- render danh sách playlist

        /playlist/:id:
- gọi /api/playlists/:id
- render danh sách bài hát trong playlist */

export default function PlaylistPage() {
	const [playlists, setPlaylists] = useState<Playlist[]>([])

	/*  Sử dụng React hook useEffect để gọi API khi trang được render lần đầu.
		Lưu kết quả vào playlists bằng setPlaylists */
	useEffect(() => {
		fetch('/api/playlists')
		.then(res => res.json())
		.then(data => setPlaylists(data))
	}, [])

	// alert(playlists);

	return (
		<div className="">
			<h1 className="text-2xl font-bold">Các Playlist hiện tại</h1>
			<div className="flex gap-10 ">
				{/* Duyệt playlists để hiển thị từng playlist là một <Link> chuyển trang đến /playlist/[id] */}
				{playlists.map( (pl, index) => (
					<div key={index} className=''>
						<PlaylistCard playlistName={pl.playlistName} coverUrl={pl.coverUrl} description={pl.description} />
					</div>
				))}
			</div>
		</div>
 	)
}
