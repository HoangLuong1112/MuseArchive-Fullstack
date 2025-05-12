import { NextResponse } from "next/server"

//  Đây là trang API lấy danh sách phát playlist
// Trả về danh sách json playlist để hiển thị ở /playlist/page

const playlists = [
    {
        playlistName: 'Lo-fi Chill',
        coverUrl: '/covers/1989-deluxe.jpg',
        description: 'This is the longest description for Playlist component',
        
    },
    {
        playlistName: 'Pistisch',
        coverUrl: '/covers/Shake It Off.jpg',
        description: 'This is a description for Playlist component',
    },
    {
        playlistName: 'Pistisch2',
        coverUrl: '/covers/Shake It Off.jpg',
        description: 'This is a description for Playlist component',
    },
    {
        playlistName: 'Pistisch3',
        coverUrl: '/covers/Shake It Off.jpg',
        description: 'This is a description for Playlist component',
    },
    {
        playlistName: 'Pistisch4',
        coverUrl: '/covers/Shake It Off.jpg',
        description: 'This is a description for Playlist component',
    },
    {
        playlistName: 'Pistisch5',
        coverUrl: '/covers/Shake It Off.jpg',
        description: 'This is a description for Playlist component',
    },
]

export async function GET() {
    return NextResponse.json(
        playlists.map(p => ({ playlistName: p.playlistName, coverUrl: p.coverUrl, description: p.description }))
    );
}
  