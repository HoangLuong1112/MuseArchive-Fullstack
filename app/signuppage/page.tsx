'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        gender: true,
        birthday: ''
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.password || !formData.email) {
            setError('Vui lòng điỞn đầy đủ thông tin bắt buộc.');
            return;
        }

        // TODO: Gửi dữ liệu đến backend

        setError('');
        setSuccess('Ğăng ký thành công!');
        router.push("/loginpage");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#191414]">
            <div className="w-full max-w-lg p-8 bg-black rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Ğăng ký tài khoản</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-white block">User name</label>
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 bg-[#333] text-white rounded-md"
                            placeholder="Nhập tên ngưỞi dùng"
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
                        <label className="text-white block"></label>
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
                        Ğăng ký
                    </button>

                    <div className="mt-4 text-center text-white">
                        <p>
                            Ğã có tài khoản?{' '}
                            <a href="/loginpage" className="text-[#1DB954] hover:underline">
                                Ğăng nhập ngay
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
