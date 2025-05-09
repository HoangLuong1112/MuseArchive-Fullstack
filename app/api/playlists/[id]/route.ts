import { NextResponse } from 'next/server'

/* API chi tiết của playlist
- Trả về toàn bộ thông tin của 1 playlist, bao gồm cả danh sách bài hát bên trong.
- Đây là API mà trang /playlist/[id] sẽ dùng để lấy dữ liệu bài hát bên trong 1 playlist cụ thể. */

const playlists = [
    {
        playlistName: 'Lo-fi Chill',
        coverUrl: '/covers/1989-deluxe.jpg',
        description: 'playlist taylor swift',
        musician: 'Taylor Swift',
        songList: [
            {
                "title": "Blank Space",
                "artist": "Taylor Swift",
                "albumArt": "/covers/Blank Space.jpg",
                "audioSrc": "/songs/Blank Space.mp3"
            },
            {
                "title": "Shake It Off",
                "artist": "Taylor Swift",
                "albumArt": "/covers/Shake It Off.jpg",
                "audioSrc": "/songs/Shake It Off.mp3"
            },
            {   
                "title": "One Last Kiss",
                "artist": "Utada Hikaru",
                "albumArt": "/covers/One Last Kiss.jpg",
                "audioSrc": "/songs/One Last Kiss.mp3"
            }
        ] ,
    },
    {
        playlistName: 'Pistisch',
        coverUrl: '/covers/Shake It Off.jpg',
        description: 'test playlist 2',
        musician: 'Swift',
        songList: [
            {
                "title": "Shake It Off",
                "artist": "Taylor Swift",
                "albumArt": "/covers/Shake It Off.jpg",
                "audioSrc": "/songs/Shake It Off.mp3"
            },
            {   
                "title": "One Last Kiss",
                "artist": "Utada Hikaru",
                "albumArt": "/covers/One Last Kiss.jpg",
                "audioSrc": "/songs/One Last Kiss.mp3"
            }
        ] ,
    },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_: Request, context: any) {
    const id = context.params.id
  
    const playlist = playlists.find(p => p.playlistName === id)

    if (!playlist) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(playlist)
}
