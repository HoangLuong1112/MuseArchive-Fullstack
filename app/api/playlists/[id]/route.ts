import { NextResponse } from 'next/server'

/* API chi tiết của playlist
- Trả về toàn bộ thông tin của 1 playlist, bao gồm cả danh sách bài hát bên trong.
- Đây là API mà trang /playlist/[id] sẽ dùng để lấy dữ liệu bài hát bên trong 1 playlist cụ thể. */

const playlists = [
    {
        id: '1',
        name: 'Lo-fi Chill',
        songs: [
            { id: 'a', title: 'Midnight Drive', artist: 'Lo-fi Guy' },
            { id: 'b', title: 'Rainy Days', artist: 'Rainy Mood' },
        ],
    },
    {
        id: '2',
        name: 'Pop Hits',
        songs: [
            { id: 'c', title: 'Sugar Rush', artist: 'Pop Queen' },
        ],
    },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_: Request, context: any) {
    const id = context.params.id
  
    const playlist = playlists.find(p => p.id === id)

    if (!playlist) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(playlist)
}
