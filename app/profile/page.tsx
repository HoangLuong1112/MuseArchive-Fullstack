'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { Pencil } from "lucide-react";

const UserProfile = () => {
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        userName: currentUser?.userName || '',
        email: currentUser?.email || '',
        birthday: currentUser?.birthday || '',
        gender: currentUser?.gender || false,
        avatarPic: currentUser?.avatarPic || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, avatarPic: imageUrl }));
        }
    };

    const handleSave = () => {
        console.log("Lưu thông tin:", formData);
        // TODO: Gửi formData lên server hoặc context để lưu
    };

    if (!currentUser) return null;

    return (
        <div className="text-white bg-neutral-900 min-h-screen p-6">
            {/* Avatar + Name */}
            <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                    <Image
                        src={formData.avatarPic || '/covers/avatar/default-avatar.jpg'}
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover border border-neutral-600 shadow-md"
                        width={128}
                        height={128}
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <label className="text-white bg-neutral-800 bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full cursor-pointer" title="Đổi ảnh đại diện">
                            <Pencil size={20} />
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold">{formData.userName}</h1>
                    <p className="text-sm text-neutral-400">Thông tin hồ sơ cá nhân</p>
                </div>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Tên người dùng</label>
                    <input
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Ngày sinh</label>
                    <input
                        name="birthday"
                        type="date"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm text-neutral-400 mb-1">Giới tính</label>
                    <select name="gender" value={formData.gender.toString()}
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                gender: e.target.value === "true",
                            }));
                        }}
                        className="w-full p-2 rounded bg-neutral-800 text-white outline-none">
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                    </select>
                </div>
            </div>

            {/* Save button */}
            <div className="mt-10">
                <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded text-white font-medium transition">
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
