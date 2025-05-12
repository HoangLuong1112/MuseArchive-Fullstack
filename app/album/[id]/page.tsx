'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Album } from '@/types/song'
import Image from 'next/image'
import SongList from '@/app/component/SongList'
import Link from 'next/link'


export default function AlbumDetail() {
    const { id } = useParams()          //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const [album, setAlbum] = useState<Album | null>(null)

    useEffect(() => {
        fetch(`/api/albums/${id}`)
        .then(res => res.json())
        .then(data => setAlbum(data))
    }, [id])

    if (!album) return <div className="p-4">Đang tải...</div>

    return (
        <div className="">
            <div className='flex gap-5 p-5'>
                <Image src={album.coverUrl} alt='Playlist Cover' height={350} width={350} className='rounded-2xl' />
                <div className='w-full flex flex-col'>
                    <p>Playlist</p>
                    <p className="title">{album.albumName}</p>
                    <Link href={`/musician/${album.musician}`} className="font-bold hover:underline">{album.musician}</Link>
                </div>
            </div>

            <SongList songlist={album.songList}/>
        </div>
    )
}
