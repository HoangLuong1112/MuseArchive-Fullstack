import { NextResponse } from "next/server"

/*export type Album = {
    albumName: string;
    coverUrl: string;
    musician: string;
    songslist: SongProps[];
} */
const albums = [
    {
        albumName: 'Tên Album',
        coverUrl: '/covers/Shake It Off.jpg',
        musician: 'Tên nhạc sĩ',
    }
]

export async function GET() {
    return NextResponse.json(
        albums.map(p => ({ albumName: p.albumName, coverUrl: p.coverUrl, musician: p.musician }))
    );
}
  