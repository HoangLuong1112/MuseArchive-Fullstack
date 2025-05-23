'use client'

import { SongProps } from '@/types/song_final'
import SongRow from './SongRow'

interface SongListProps {
    songlist?: SongProps[];
}

export default function SongList({ songlist }: SongListProps) {
    // console.log("Bài hát chuẩn bị truyền vô list: ", songlist);
    return (
        <div className="mt-4 mb-8 border border-zinc-700 bg-zinc-900 rounded-2xl">
            <div className="grid grid-cols-12 gap-4 px-5 text-white bg-zinc-800 rounded-t-2xl py-4">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Title</div>
                <div className="col-span-2">Time</div>
                <div className='col-span-1 flex justify-center'>Views</div>
                <div className="col-span-2 flex justify-end">Option</div>
            </div>

            {songlist?.map((song, index) => (
        		<SongRow key={song.title} song={song} index={index} songlist={songlist} />
            ))}
        </div>
    )
}
