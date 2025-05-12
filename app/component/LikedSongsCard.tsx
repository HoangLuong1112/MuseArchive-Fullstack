'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ColorThief from 'colorthief';

interface LikedSongsCardProps {
  likedSongs: any[]; // Cần thay thế với kiểu dữ liệu chính xác của likedSongs // tam thoi
}

const LikedSongsCard: React.FC<LikedSongsCardProps> = ({ likedSongs }) => {
  const [bgColor, setBgColor] = useState<string>('rgb(40,40,40)');
  const imageRef = useRef<HTMLImageElement>(null);

  const coverImage = '/covers/1989-deluxe.jpg'; // Đổi sang ảnh bạn muốn (ảnh mặc định cho Liked Songs)

  const number = likedSongs?.length || 0;

  const totalTime = likedSongs?.reduce((acc, song) => acc + (song.duration || 0), 0) || 0;
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };


  useEffect(() => {
    if (imageRef.current) {
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
  }, [likedSongs]); // Đảm bảo color thay đổi nếu likedSongs thay đổi

  return (
    <div
      className="w-full px-8 rounded-lg"
      style={{
        background: `linear-gradient(to bottom, ${bgColor}, #121212)`,
      }}
    >
      <div className="flex items-center gap-6 p-6">
        <div className="w-48 h-48 bg-[#282828] rounded-md overflow-hidden relative">
          <Image
            ref={imageRef}
            src={coverImage}
            alt="Liked Songs"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="uppercase text-xs text-white font-bold">Playlist</p>
          <h1 className="text-white text-4xl font-bold">Liked Songs</h1>
          <p className="text-gray-300 mt-2">Bạn • {new Date().getFullYear()}</p>
          <p className="text-gray-300">{number} bài hát • {formatTime(totalTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default LikedSongsCard;
