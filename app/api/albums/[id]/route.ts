import { NextResponse } from 'next/server'
import { albums } from '../data'
import { tracks } from '@/app/api/tracks/data'


export async function GET(
    _: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
    const album = albums.find(p => p.id === id);

    if (!album) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    //lấy dữ liệu các bài hát từ file khác
    const resolvedSongs = album.songList
        .map(songId => tracks.find(song => song.id === songId))
        .filter(Boolean); // loại bỏ null nếu ID không khớp
    
    
    return NextResponse.json({
        ...album,
        songs: resolvedSongs
    })
}
