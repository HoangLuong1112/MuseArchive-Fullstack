import { NextResponse } from "next/server"
import { musicians } from "./data";

export async function GET() {
    return NextResponse.json(
        musicians.map(p => ({ musicianName: p.musicianName, avatarPic: p.avatarPic }))
    );
}
