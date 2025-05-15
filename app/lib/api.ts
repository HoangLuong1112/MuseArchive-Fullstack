const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(path: string, method = 'GET', data?: any, token?: string) {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (token) headers['Authorization'] = `Bearer ${token}`;

	const res = await fetch(`${API_BASE}${path}`, {
		method,
		headers,
		body: data ? JSON.stringify(data) : undefined,
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.detail || 'Lỗi API');
	}

	return await res.json();
}
