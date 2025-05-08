import { NextResponse } from "next/server"

//  Đây là trang API lấy danh sách phát playlist
// Trả về danh sách playlist để hiển thị ở /playlist/page
const playlists = [
    {
        id: '1',
        name: 'Lo-fi Chill',
        songs: [
            { id: 'a', title: 'Midnight Drive', artist: 'Lo-fi Guy' },
            { id: 'b', title: 'Rainy Days', artist: 'Rainy Mood' },
        ],
    },
    {
        id: '2',
        name: 'Pop Hits',
        songs: [
            { id: 'c', title: 'Sugar Rush', artist: 'Pop Queen' },
        ],
    },
]
  
/*Đoạn .map(({ songs, ...rest }) => rest) là để loại bỏ mảng songs ra khỏi mỗi playlist (vì trang danh sách chỉ cần tên và ID)
    Trả kết quả về dạng JSON:
[
  { "id": "1", "name": "Lo-fi Chill" },
  { "id": "2", "name": "Pop Hits" }
] */
export async function GET() {
    //Dùng dấu gạch dưới _songs để báo ESLint biết là cố tình bỏ qua
    // return NextResponse.json(playlists.map(({ songs: _songs, ...rest }) => rest)) // chỉ gửi thông tin tổng quát
    return NextResponse.json(
        playlists.map(p => ({ id: p.id, name: p.name }))
    );
}
  