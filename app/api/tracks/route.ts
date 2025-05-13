import { NextResponse } from "next/server"
import { tracks } from "./data";
/**"title": "Blank Space",
        "artist": "Taylor Swift",
        "albumArt": "/covers/Blank Space.jpg",
        "audioSrc": "/songs/Blank Space.mp3",
        "duration": 240, */
export async function GET() {
    return NextResponse.json(
        tracks.map(p => ({ title: p.title, artist: p.artist, albumArt: p.albumArt, audioSrc: p.audioSrc, duration: p.duration }))
    );
}
  