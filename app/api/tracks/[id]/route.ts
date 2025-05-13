import { NextResponse } from 'next/server'
import { tracks } from '../data'


export async function GET(
    _: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
  
    const track = tracks.find(p => p.title === id);

    if (!track) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(track)
}
