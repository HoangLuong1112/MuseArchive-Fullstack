import { NextResponse } from "next/server"
import { playlists } from "./data";

//  Đây là trang API lấy danh sách phát playlist
// Trả về danh sách json playlist để hiển thị ở /playlist/page

export async function GET() {
    return NextResponse.json(
        playlists.map(p => ({ id: p.id, coverUrl: p.coverUrl, description: p.description }))
    );
}
  