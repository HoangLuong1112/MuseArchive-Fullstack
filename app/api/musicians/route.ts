import { NextResponse } from "next/server"

//  Đây là trang API lấy danh sách phát playlist
// Trả về danh sách json playlist để hiển thị ở /playlist/page

const musicians = [
    {
        musicianName: 'Tảy lỏ quýt ssss sssssssssss ssss ssss ssss ssss sssss',
        coverUrl: '/covers/1989-deluxe.jpg',
    },
    {
        musicianName: 'Llamar',
        coverUrl: '/covers/1989-deluxe.jpg',
    }
]

export async function GET() {
    return NextResponse.json(
        musicians.map(p => ({ musicianName: p.musicianName, coverUrl: p.coverUrl }))
    );
}
  