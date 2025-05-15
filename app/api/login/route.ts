import { NextResponse } from 'next/server';
import { accounts } from '../accounts/data'; // JSON tạm chứa danh sách user

//  API xử lý đăng nhập
export async function POST(req: Request) {
	const { userName, password } = await req.json();

	const found = accounts.find(acc => acc.userName === userName && acc.password === password);

	if (!found) {
		return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
	}

	return NextResponse.json({ success: true, user: found });
}
