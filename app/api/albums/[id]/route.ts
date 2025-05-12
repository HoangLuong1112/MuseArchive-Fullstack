import { NextResponse } from 'next/server'
import { albums } from '../data'


export async function GET(
    _: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
  
    const album = albums.find(p => p.albumName === id);

    if (!album) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(album)
}
