'use client'

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Account } from "@/types/song";
import { Pencil } from "lucide-react";

const UserProfileHeader = ({ account }: { account: Account }) => {
  const [avatar, setAvatar] = useState<string>("/default-avatar.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-[#1e1e1e] to-[#121212] rounded-xl shadow-lg">
      <div className="relative group">
        <Image
          src={avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border border-neutral-600 shadow-md"
          width={32}
          height={32}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <button
            onClick={handleButtonClick}
            className="text-white bg-neutral-800 bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full"
            title="Đổi ảnh đại diện"
          >
            <Pencil size={20} />
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div>
        <p className="uppercase text-sm text-neutral-400 font-medium mb-1">Hồ sơ cá nhân</p>
        <h1 className="text-4xl font-bold text-white">{account.userName}</h1>
      </div>
    </div>
  );
};

export default UserProfileHeader;
