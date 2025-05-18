'use client'

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
	const {login} = useAuth();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || "Đăng nhập thất bại");
			}

			const data = await response.json();
			if (response.ok && data.user) {
				login(data.user); // <-- lưu thông tin user
				router.push('/');
			} else {
				setError(data.error || 'Lỗi đăng nhập');
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Đã xảy ra lỗi không xác định");
			}
		}
	};

	return (
		<div className="flex items-center justify-center h-screen w-full bg-[#191414]">
			<div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold text-white text-center mb-6">Đăng nhập</h2>
				
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-white">Email đăng nhập</label>
						<input
							type="text"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-3 mt-2 bg-[#333] text-white rounded-md"
							placeholder="Nhập tên đăng nhập"
							required />
					</div>

					<div className="mb-6">
						<label htmlFor="password" className="block text-white">Mật khẩu</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-3 mt-2 bg-[#333] text-white rounded-md"
							placeholder="Nhập mật khẩu của bạn"
							required />
					</div>

					<button type="submit" className="w-full p-3 bg-[#1DB954] text-white rounded-md hover:bg-[#1ED760]">
						Đăng nhập
					</button>
				</form>

				<div className="mt-4 text-center text-white">
					<p>Chưa có tài khoản? <a href="/signuppage" className="text-[#1DB954]">Đăng ký ngay</a></p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
