'use client'

import { SongProps } from '@/types/song'
import { FaHeart, FaRegHeart, FaEllipsisH } from 'react-icons/fa'
import { usePlayer } from '../context/PlayerContext'
import { useState } from 'react'
import Link from 'next/link'

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
	const [liked, setLiked] = useState(false)

	const isCurrent = currentSong?.title === song.title

	const toggleLike = (e: React.MouseEvent) => {
		e.stopPropagation()
		setLiked(prev => !prev)
	}

	const handleContextMenu = (e: React.MouseEvent) => {
		e.stopPropagation()
		// mở menu tùy chọn (nếu có)
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
				<button
					onClick={toggleLike}
					title="Like song"
					className="text-gray-400 hover:text-white">
					{liked ? <FaHeart className="text-green-500" /> : <FaRegHeart />}
				</button>
				<button
					onClick={handleContextMenu}
					title="More options"
					className="text-gray-400 hover:text-white">
					<FaEllipsisH />
				</button>
			</div>
		</div>
	)
}
