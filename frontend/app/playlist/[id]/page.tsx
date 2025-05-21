'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Playlist, SongProps, SongPropsFromJSON } from '@/types/song_final'
import Banner from '@/app/component/Banner'
import SongList from '@/app/component/SongList'
import { useAuth } from '@/app/context/AuthContext'

// TRANG DANH SÁCH CÁC BÀI HÁT TRONG PLAYLIST
//      Hiển thị danh sách bài hát bên trong playlist đã được chọn.

export default function PlaylistDetail() {
	const { id } = useParams() //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
	const { getAccessToken } = useAuth()
	const [playlist, setPlaylist] = useState<Playlist | null>(null)

	// useEffect(() => {
	// 	fetch(`/api/playlists/${id}`)
	// 	.then(res => res.json())
	// 	.then(data => setPlaylist(data))
	// }, [id])

	useEffect(() => {
			const fetchPlaylist = async () => {
				const token = await getAccessToken();
				if (!token) {console.warn('Không tìm thấy access token'); return;}
	
				try {
					//lấy thông tin chi tiết bài hát
					const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user-playlists/${id}/`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json',
						}
					});
					if(!res.ok) {
						console.error('Failed to fetch playlist detail');
						return;
					}
					const data = await res.json();
					console.log('Chi tiết playlist: ', data);
	
					//lấy danh sách bài từ json
					const albumSong: SongProps[] = data.songs.map((item: SongPropsFromJSON) => ({
						id: item.id,
						title: item.title,
						artist: {
							id: item.musicians[0].id,
							name: item.musicians[0].musician_name,
						},
						albumArt: item.albumArt,
						duration: item.duration,
						dayAdd: item.day_add,
						views: item.views,
						album: {
							id: item.album?.id,
							name: item.album?.album_name,
						},
					}))
	
					//chuyển đổi sang type Musician
					const formattedData: Playlist = {
						id: data.id,
						playlistName: data.playlist_name,
						coverUrl: data.cover_image,
						description: data.description,
						createdby: data.user_id,
						dayAdd: data.created_at,
						dayUpdate: data.updated_at,
						songs: albumSong,
					}
					
					setPlaylist(formattedData);
				} catch (err) {
					console.error('Error fetching musicians: ', err);
				}
			};
			fetchPlaylist();
		}, [getAccessToken, id])
	

	// hàm tính thời gian
    const totalDuration = playlist?.songs?.reduce((sum, song) => sum + (song.duration || 0), 0) ?? 0;
    // hàm đổi thời gian ra đơn vị
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} phút ${secs.toString().padStart(2, '0')} giây`;
    };
    //tính
    const totalDurationString = formatDuration(totalDuration);

	if (!playlist) return <div className="p-4">Đang tải...</div>

	return (
		<div className="">
			<Banner type='Playlist' coverUrl={playlist.coverUrl} name={playlist.playlistName} description={playlist.description} 
				createdBy={playlist.createdby} numberofsong={playlist?.songs?.length} duration={totalDurationString} />
			<SongList songlist={playlist.songs}/>
		</div>
	)
}
