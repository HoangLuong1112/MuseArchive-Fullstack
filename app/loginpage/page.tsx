'use client'

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Kiểm tra email và mật khẩu (có thể tích hợp với backend)
    if (email === "user@example.com" && password === "password") {
      // Đăng nhập thành công
      alert("Đăng nhập thành công!");
      router.push("/");
    } else {
      // Hiển thị lỗi
      setError("Thông tin đăng nhập không chính xác.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#191414]">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Đăng nhập</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 bg-[#333] text-white rounded-md"
              placeholder="Nhập email của bạn"
              required
            />
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#1DB954] text-white rounded-md hover:bg-[#1ED760]"
          >
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
