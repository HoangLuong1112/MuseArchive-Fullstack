import { NextResponse } from 'next/server';
import { accounts } from '../accounts/data'; // JSON tạm chứa danh sách user

//  API xử lý đăng nhập
export async function POST(req: Request) {
	const { email, password } = await req.json();

	const found = accounts.find(acc => acc.email === email && acc.password === password);

	if (!found) {
		return NextResponse.json({ error: 'Email đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
	}

	return NextResponse.json({ success: true, user: found });
}
