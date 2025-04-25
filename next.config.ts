import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['upload.wikimedia.org'], // Thêm domain của logo vào đây
  },
  reactStrictMode: true,  // Bật chế độ kiểm tra nghiêm ngặt cho React
};

export default nextConfig;
