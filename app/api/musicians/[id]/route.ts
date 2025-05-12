import { NextResponse } from 'next/server'
import { musicians } from '../data'


// export async function GET(_: Request, context: any) {
//     const id = context.params.id
  
//     const album = musicians.find(p => p.musicianName === id)

//     if (!album) {
//         return NextResponse.json({ error: 'Not found' }, { status: 404 })
//     }
//     return NextResponse.json(album)
// }
export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const musician = musicians.find(p => p.musicianName === id);

    if (!musician) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(musician);
}