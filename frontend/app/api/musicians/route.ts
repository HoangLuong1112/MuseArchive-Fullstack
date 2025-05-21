import { NextResponse } from "next/server"
import { musicians } from "./data";

export async function GET() {
    return NextResponse.json(
        musicians.map(p => ({ id: p.id, musicianName: p.musicianName, avatarPic: p.avatarPic }))
    );
}
