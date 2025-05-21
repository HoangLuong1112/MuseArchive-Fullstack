import { NextResponse } from 'next/server'
import { playlists } from '../data'
import { tracks } from '../../tracks/data';

/* API chi tiết của playlist
- Trả về toàn bộ thông tin của 1 playlist, bao gồm cả danh sách bài hát bên trong.
- Đây là API mà trang /playlist/[id] sẽ dùng để lấy dữ liệu bài hát bên trong 1 playlist cụ thể. */

export async function GET(
    _: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
    const playlist = playlists.find(p => p.id === id)

    if (!playlist) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    
    //lấy dữ liệu từ tracks
    const resolvedSongs = playlist.songList
            .map(songId => tracks.find(song => song.id === songId))
            .filter(Boolean); // loại bỏ null nếu ID không khớp
    
    return NextResponse.json({
        ...playlist,
        songs: resolvedSongs
    })
}
