'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirm: '',
        email: '',
        gender: true,
        birthday: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setError('');
		setSuccess('');

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/register/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: formData.username,
					password: formData.password,
                    password_confirm: formData.password_confirm,
					email: formData.email,
					gender: formData.gender,
					birthday: formData.birthday
				})
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || 'Đăng ký thất bại');
			}

			setSuccess('Đăng ký thành công!');
			setTimeout(() => {
				router.push('/loginpage');
			}, 1500);
		} catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Đã xảy ra lỗi không xác định");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#191414]">
            <div className="w-full max-w-lg p-8 bg-black rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Đăng ký tài khoản</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-white block">Tên người dùng</label>
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 bg-[#333] text-white rounded-md"
                            placeholder="Nhập tên người dùng"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-white block">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 bg-[#333] text-white rounded-md"
                            placeholder="Nhập email"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-white block">Mật khẩu</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 bg-[#333] text-white rounded-md"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>

                     <div>
                        <label className="text-white block">Nhập lại mật khẩu</label>
                        <input
                            name="password_confirm"
                            type="password"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 bg-[#333] text-white rounded-md"
                            placeholder="Nhập lại mật khẩu"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-white block">Ngày sinh</label>
                            <input
                                name="birthday"
                                type="date"
                                value={formData.birthday}
                                onChange={handleChange}
                                className="w-full p-3 mt-1 bg-[#333] text-white rounded-md"
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <label className="text-white mb-1">Giới tính</label>
                            <div className="flex items-center gap-4">
                                <label className="text-white flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={formData.gender === true}
                                        onChange={() => setFormData(prev => ({ ...prev, gender: true }))}
                                    />
                                    Nam
                                </label>
                                <label className="text-white flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={formData.gender === false}
                                        onChange={() => setFormData(prev => ({ ...prev, gender: false }))}
                                    />
                                    Nữ
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#1DB954] text-white rounded-md hover:bg-[#1ED760]"
                    >
                        Đăng ký
                    </button>

                    <div className="mt-4 text-center text-white">
                        <p>
                            Đã có tài khoản?{' '}
                            <a href="/loginpage" className="text-[#1DB954] hover:underline">
                                Đăng nhập ngay
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
