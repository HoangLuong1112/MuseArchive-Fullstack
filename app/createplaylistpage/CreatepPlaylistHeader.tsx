'use client';

import { useState, useEffect, useRef } from 'react';
import ColorThief from 'colorthief'
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';

export default function CreatePlaylistHeader() {
  const [image, setImage] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>('rgb(40,40,40)');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setBgColor('rgb(40,40,40)');
  };

  useEffect(() => {
    if (imageRef.current && image) {
      const img = imageRef.current;
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const colorThief = new ColorThief();
        try {
          const color = colorThief.getColor(img);
          setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        } catch (err) {
          console.error('Error extracting color:', err);
        }
      };
    }
  }, [image]);

  return (
    <div className="w-full px-8 rounded-lg" style={{ background: `linear-gradient(to bottom, ${bgColor}, #121212)` }}>
      <div className="flex items-center gap-6 p-6">
        <div className="relative group">
          <label className="cursor-pointer block relative w-48 h-48 bg-[#282828] rounded-md overflow-hidden">
            <Image
              ref={imageRef}
              src={image || '/covers/1989-deluxe.jpg'}
              alt="Playlist"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-70 transition">
              <span className="text-white text-sm bg-[#1DB954] px-3 py-1 rounded">Chọn ảnh</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {image && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition"
              title="Xóa ảnh"
            >
              <FaTrash />
            </button>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Nhập tên playlist"
            className="text-white text-3xl font-bold bg-transparent outline-none border-none"
          />
          <p className="text-gray-300 mt-2">Tên người tạo • {new Date().getFullYear()}</p>
          <p className="text-gray-300">10 bài hát, 35 phút</p>
        </div>
      </div>
    </div>
  );
}
