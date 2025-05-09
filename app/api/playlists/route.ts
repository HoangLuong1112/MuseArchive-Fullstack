import { NextResponse } from "next/server"

//  Đây là trang API lấy danh sách phát playlist
// Trả về danh sách json playlist để hiển thị ở /playlist/page

const playlists = [
    {
        playlistName: 'Lo-fi Chill',
        coverUrl: '/covers/1989-deluxe.jpg',
        description: 'playlist taylor swift',
        
    },
    {
        playlistName: 'Pistisch',
        coverUrl: '/covers/Shake It Off.jpg',
        description: 'test playlist 2',
    },
]

export async function GET() {
    return NextResponse.json(
        playlists.map(p => ({ playlistName: p.playlistName, coverUrl: p.coverUrl, description: p.description }))
    );
}
  