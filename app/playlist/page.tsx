'use client'

import { Playlist } from '@/types/song_final'
import { useEffect, useState } from 'react'
import Carousel from '../component/Carousel'
import PlaylistCard from '../component/PlaylistCard'
import { useAuth } from '../context/AuthContext'
/*      /playlist:
- gọi API /api/playlists
- render danh sách playlist

        /playlist/:id:
- gọi /api/playlists/:id
- render danh sách bài hát trong playlist 
	Duyệt playlists để hiển thị từng playlist là một <Link> chuyển trang đến /playlist/[id] 
*/

type PlaylistListItem = {
	id: string,
	cover_image: string,
	description: string,
}

export default function PlaylistPage() {
	const { getAccessToken } = useAuth();
	const [playlists, setPlaylists] = useState<Playlist[]>([])

	/*  Sử dụng React hook useEffect để gọi API khi trang được render lần đầu.
		Lưu kết quả vào playlists bằng setPlaylists */
	// useEffect(() => {
	// 	fetch('/api/playlists')
	// 	.then(res => res.json())
	// 	.then(data => setPlaylists(data))
	// }, [])

	useEffect(() => {
			const fetchPlaylists = async () => {
				const token = await getAccessToken();
				if (!token) {
					console.warn('Không tìm thấy access token');
					return;
				}
	
				try {
					// console.log('Access token gửi request Playlists :', token);
					const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/playlists/`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json',
						}
					});
					if(!res.ok) {
						console.error('Failed to fetch playlists');
						return;
					}
					const data = await res.json();
					console.log('Danh sách playlist: ', data);
	
					//chuyển đổi sang typ
					const formattedData: Playlist[] = data.map((item: PlaylistListItem) => ({
						/*export type Playlist ={
							id: string;
							playlistName: string;
							coverUrl: string;
							description?: string;
							createdby?: string; //hiển thị user đã tạo cái playlist này hoặc khỏi hiện luôn
							dayAdd?: string;
							dayUpdate: string;
							songs?: SongProps[];
						} */
						id: item.id,
						coverUrl: item.cover_image,
						description: item.description,
					}))					
					setPlaylists(formattedData);
				} catch (err) {
					console.error('Error fetching playlists: ', err);
				}
			};
			fetchPlaylists();
		}, [getAccessToken])
	


	return (
		<div className="">
			{/* Ở đây sử dụng Carousel có thể xài với mọi loại khung component */}
			<Carousel title="Playlist hiện tại" items={playlists} renderItem={(pl, i) => (
				<PlaylistCard key={i} id={pl.id} coverUrl={pl.coverUrl} description={pl.description}/>
			)}/>
		</div>
 	)
}
