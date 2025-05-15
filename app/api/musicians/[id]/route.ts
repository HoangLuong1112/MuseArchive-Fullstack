import { NextResponse } from 'next/server'
import { musicians } from '../data'
import { tracks } from '../../tracks/data';
import { albums } from '../../albums/data';

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    //trả thông tin nhạc sĩ
    const { id } = await params;
    const musician = musicians.find(p => p.id === id);
    if (!musician) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // trả top 10 bài hát của nhạc sĩ (dựa vào views)
    const top10 = tracks
        .filter(song => song.artist.id === id)
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

    //trả các album của nhạc sĩ
    const musicianAlbums = albums.filter(album => album.musician.id === id);

    return NextResponse.json({
        ...musician,
        topSongs: top10,
        albums: musicianAlbums,
    });
}