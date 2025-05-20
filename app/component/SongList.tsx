'use client'

import { SongProps } from '@/types/song_final'
import SongRow from './SongRow'

interface SongListProps {
    songlist?: SongProps[];
}

export default function SongList({ songlist }: SongListProps) {
    // console.log("Bài hát chuẩn bị truyền vô list: ", songlist);
    return (
        <div className="mt-4 mb-8 px-5">
            <div className="grid grid-cols-12 gap-4 px-5 text-gray-400 text-sm border-b border-gray-800 pb-2 mb-4">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Title</div>
                <div className="col-span-3">
                    Time
                </div>
                <div className="col-span-2"></div>
            </div>

            {songlist?.map((song, index) => (
        		<SongRow key={song.title} song={song} index={index} songlist={songlist} />
            ))}
        </div>
    )
}
