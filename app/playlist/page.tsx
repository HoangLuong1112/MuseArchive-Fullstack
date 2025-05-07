'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
/*      /playlist:
- gọi API /api/playlists
- render danh sách playlist

        /playlist/:id:
- gọi /api/playlists/:id
- render danh sách bài hát trong playlist */

//TRANG DANH SÁCH PLAYLIST


interface Playlist {
  id: string
  name: string
}

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
    <div className="p-4">
      <h1 className="text-2xl font-bold">Playlist</h1>
      <ul className="mt-4 space-y-2">
        {playlists.map(pl => (
            // Duyệt playlists để hiển thị từng playlist là một <Link> chuyển trang đến /playlist/[id]
          <li key={pl.id}>
            <Link href={`/playlist/${pl.id}`} className="text-blue-600 hover:underline">
              🎧 {pl.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
