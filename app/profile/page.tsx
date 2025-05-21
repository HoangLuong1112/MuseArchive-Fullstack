'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { Pencil } from "lucide-react";
import { Account } from "@/types/song_final";

const UserProfile = () => {
    const { currentUser, getAccessToken, setCurrentUser } = useAuth();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const [localProfile, setLocalProfile] = useState<Account | null>(null);

    // useEffect(()=>{
    //     const fetchProfile = async () => {
    //         const token = await getAccessToken();
    //         if (!token) { console.warn('Không tìm thấy access token'); return; }

    //         try {
    //             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/profile/`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 }
    //             });
    //             if(!res.ok) {
    //                 console.error('Failed to fetch user profile');
    //                 return;
    //             }
    //             const data = await res.json();
    //             console.log('Chi tiết profile: ', data);

    //             //chuyển đổi sang type Account
    //             // const formattedData: Account = {
    //             //     id: data.id,
    //             //     userName: data.username,
    //             //     email: data.email,
    //             //     gender: data.gender,
    //             //     birthday: data.birthday,
    //             //     avatarPic: data.profile_image,
    //             // }
                
    //             // setProfile(formattedData);
    //         } catch (err) {
    //             console.error('Error fetching musicians: ', err);
    //         }
    //     };
    //     fetchProfile();
    // })

    const [formData, setFormData] = useState({
        // id: currentUser?.id ,
        // username: currentUser?.userName ,
        // email: currentUser?.email ,
        // birthday: currentUser?.birthday ,
        // gender: currentUser?.gender ?? false,
        // profile_image: currentUser?.avatarPic ,
        id: currentUser?.id ?? "",
        username: currentUser?.userName ?? "",
        email: currentUser?.email ?? "",
        birthday: currentUser?.birthday ?? "",
        gender: currentUser?.gender ?? false,
        profile_image: currentUser?.avatarPic ?? "",
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
            setFormData(prev => ({ ...prev, profile_image: imageUrl })); // Chỉ để preview
            setSelectedFile(file); // Cái này mới quan trọng để upload
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        try {
            const token = await getAccessToken();

            const formDataToSend = new FormData();

            formDataToSend.append("username", formData.username || "");
            formDataToSend.append("email", formData.email || "");
            formDataToSend.append("birthday", formData.birthday || "");
            formDataToSend.append("gender", formData.gender.toString());

            if (selectedFile) {
                formDataToSend.append("profile_image", selectedFile);
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/profile/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (!res.ok) throw new Error(`Lỗi cập nhật: ${res.status}`);
            const result = await res.json();
            console.log('Cập nhật thành công:', result);


            const updateLocal: Account = {
                id: formData.id,
                userName: formData.username,
                email: formData.email,
                gender: formData.gender,
                birthday: formData.birthday,
                avatarPic: formData.profile_image,
            }
            console.log('Cập nhật thành công local:', updateLocal);
            alert("Cập nhật thành công");
            setCurrentUser(updateLocal);
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            alert("Cập nhật thất bại. Vui lòng thử lại.");
        }
    };

    if (!currentUser) return null;

    return (
        <div className="text-white bg-neutral-900 min-h-screen p-6">
            <form onSubmit={handleSubmit}>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative group">
                        <Image
                            src={formData.profile_image || '/covers/avatar/default-avatar.jpg'}
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
                        <h1 className="text-3xl font-bold">{formData.username}</h1>
                        <p className="text-sm text-neutral-400">Thông tin hồ sơ cá nhân</p>
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Tên người dùng</label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
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
                            required
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
                            required
                            className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Giới tính</label>
                        <select
                            name="gender"
                            value={formData.gender.toString()}
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    gender: e.target.value === "true",
                                }));
                            }}
                            className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
                        >
                            <option value="true">Nam</option>
                            <option value="false">Nữ</option>
                        </select>
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-10">
                    <button type="submit" className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded text-white font-medium transition">
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;
