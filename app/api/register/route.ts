import { NextResponse } from 'next/server';
import { accounts } from '../accounts/data';
import { Account } from '@/types/song'; // sửa lại đường dẫn đúng với project của bạn

// API xử lý đăng nhập
export async function POST(req: Request) {
	const body = await req.json();
	const { userName, email, password, birthday, gender, avatarPic } = body;

	if (!userName || !email || !password) {
		return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
	}

	const existed = accounts.find(
		acc => acc.userName === userName || acc.email === email
	);

	if (existed) {
		return NextResponse.json({ error: 'Tên đăng nhập hoặc email đã tồn tại' }, { status: 409 });
	}

	const newAccount: Account = {
		userName,
		email,
		password,
		birthday,
		gender,
		avatarPic,
		likedSong: [],
		followed: [],
		userPlaylist: []
	};

	accounts.push(newAccount); // Chỉ là in-memory, nếu bạn dùng DB thật thì insert ở đây

	return NextResponse.json({ success: true, user: newAccount });
}
