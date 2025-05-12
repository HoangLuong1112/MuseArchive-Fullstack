import { NextResponse } from "next/server"
import { albums } from "./data";

export async function GET() {
    return NextResponse.json(
        albums.map(p => ({ albumName: p.albumName, coverUrl: p.coverUrl, musician: p.musician }))
    );
}
  