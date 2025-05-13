'use client'

import { Playlist } from '@/types/song'
import { useEffect, useState } from 'react'
// import PlaylistCarousel from '../component/PlaylistCarousel'
import Carousel from '../component/Carousel'
import PlaylistCard from '../component/PlaylistCard'
/*      /playlist:
- gọi API /api/playlists
- render danh sách playlist

        /playlist/:id:
- gọi /api/playlists/:id
- render danh sách bài hát trong playlist 

	 Duyệt playlists để hiển thị từng playlist là một <Link> chuyển trang đến /playlist/[id] 
*/

export default function PlaylistPage() {
	const [playlists, setPlaylists] = useState<Playlist[]>([])

	/*  Sử dụng React hook useEffect để gọi API khi trang được render lần đầu.
		Lưu kết quả vào playlists bằng setPlaylists */
	useEffect(() => {
		fetch('/api/playlists')
		.then(res => res.json())
		.then(data => setPlaylists(data))
	}, [])

	return (
		<div className="">
			{/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
			<Carousel title="Playlist hiện tại" items={playlists} renderItem={(pl, i) => (
				<PlaylistCard key={i} playlistName={pl.playlistName} coverUrl={pl.coverUrl} description={pl.description}/>
			)}/>
		</div>
 	)
}
