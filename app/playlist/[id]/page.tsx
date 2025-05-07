'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

// TRANG DANH SÁCH CÁC BÀI HÁT TRONG PLAYLIST
//      Hiển thị danh sách bài hát bên trong playlist đã được chọn.
interface Song {
  id: string
  title: string
  artist: string
}

interface Playlist {
  id: string
  name: string
  songs: Song[]
}

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
    <div className="p-4">
      <h1 className="text-2xl font-bold">{playlist.name}</h1>
      <ul className="mt-4 space-y-2">
        {playlist.songs.map(song => (
          <li key={song.id}>
            🎵 {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  )
}
