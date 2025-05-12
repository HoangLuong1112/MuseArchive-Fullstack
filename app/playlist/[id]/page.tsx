'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Playlist } from '@/types/song'
// import { usePlayer } from '@/app/context/PlayerContext'
import Image from 'next/image'
import SongList from '@/app/component/SongList'
import Link from 'next/link'

// TRANG DANH SÁCH CÁC BÀI HÁT TRONG PLAYLIST
//      Hiển thị danh sách bài hát bên trong playlist đã được chọn.

export default function PlaylistDetail() {
	const { id } = useParams() //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
	const [playlist, setPlaylist] = useState<Playlist | null>(null)
	// const { setCurrentSong } = usePlayer(); // 👈 Lấy hàm setCurrentSong từ context

	useEffect(() => {
		fetch(`/api/playlists/${id}`)
		.then(res => res.json())
		.then(data => setPlaylist(data))
	}, [id])

	if (!playlist) return <div className="p-4">Đang tải...</div>

	return (
		<div className="">
			<div className='flex gap-5 p-5'>
				<Image src={playlist.coverUrl} alt='Playlist Cover' height={350} width={350} className='rounded-2xl' />
				<div className='w-full flex flex-col'>
					<p>Playlist</p>
					<p className="title">{playlist.playlistName}</p>
					<p className='card-subtitle'>{playlist.description}</p>		
					<Link href={`/musician/${playlist.musician}`} className="font-bold hover:underline">{playlist.musician}</Link>
				</div>
			</div>
			
			{/* song là bài hát đc chọn, truyền thêm songlist để coi vị trí của song, khi hết bài thì chuyển bài tiếp theo */}
			{/* {playlist.songList?.map((song, index) => (
				<div key={index} className="p-2 flex items-center gap-4 bg-zinc-800 rounded-md hover:bg-zinc-700 cursor-pointer" 
					onClick={() => setCurrentSong(song, playlist.songList)}>
					<Image src={song.albumArt} alt={song.title} width={48} height={48} className=" object-cover rounded" />
					<div>
						<p className="text-white font-medium">{song.title}</p>
						<p className="text-zinc-400 text-sm">{song.artist}</p>
					</div>
				</div>
			))} */}

			<SongList songlist={playlist.songList}/>
		</div>
	)
}
