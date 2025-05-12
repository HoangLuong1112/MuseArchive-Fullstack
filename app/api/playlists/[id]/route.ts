import { NextResponse } from 'next/server'
import { playlists } from '../data'

/* API chi tiết của playlist
- Trả về toàn bộ thông tin của 1 playlist, bao gồm cả danh sách bài hát bên trong.
- Đây là API mà trang /playlist/[id] sẽ dùng để lấy dữ liệu bài hát bên trong 1 playlist cụ thể. */

export async function GET(
    _: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
  
    const playlist = playlists.find(p => p.playlistName === id)

    if (!playlist) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(playlist)
}
