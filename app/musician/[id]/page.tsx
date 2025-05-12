'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Musician } from '@/types/song'
import Image from 'next/image'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaCheck, FaPlay } from 'react-icons/fa'
// import SongList from '@/app/component/SongList'


export default function MusicianDetail() {
    const { id } = useParams();           //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const [musician, setMusician] = useState<Musician | null>(null);
    const [activeTab, setActiveTab] = useState<'popular' | 'albums'>('popular');

    useEffect(() => {
        fetch(`/api/musicians/${id}`)
        .then(res => res.json())
        .then(data => setMusician(data))
    }, [id])

    // hàm theo dõi, làm tạm cập nhập follower
    const toggleFollow = () => {
        if (!musician) return
        const isFollowing = musician.isFollowing ?? false;
        const follower = musician.follower ?? 0;

        const updatedMusician = {
            ...musician,
            isFollowing: !isFollowing,
            follower: isFollowing ? follower - 1 : follower + 1
        };
        setMusician(updatedMusician)
    }

    if (!musician) return <div className="p-4">Đang tải...</div>

    return (
        <div className="text-white min-h-screen rounded-lg">
            {/* Header với ảnh cover */}
            <div className="relative  rounded-lg">
                <div className="h-64 w-full bg-gradient-to-b from-purple-900 to-black rounded-lg"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${musician.coverPic})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    <div className="absolute bottom-0 left-0 p-6 flex items-end gap-6">
                        <Image src={musician.avatarPic} alt={musician.musicianName} width={50} height={50} unoptimized
                            className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-black" />
                        <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <h1 className="text-5xl font-bold">{musician.musicianName}</h1>
                                {musician.isVerified && (
                                    <span className="bg-blue-500 text-white text-xs px-1 rounded-full">
                                        <FaCheck className="inline" />
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-1">
                                    <BsFillPeopleFill />
                                    <span>{musician.follower} follower</span>
                                </div>
                                <button onClick={toggleFollow} className={`px-4 py-1 rounded-full font-semibold ${musician.isFollowing ? 'bg-white text-black' : 'bg-transparent border border-white'}`}>
                                    {musician.isFollowing ? 'Following' : 'Follow'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nội dung chính */}
            <div className="p-6 bg-gradient-to-b from-black-500 to-gray-900 px-8  rounded-lg">
                {/* Tab điều hướng */}
                <div className="flex gap-6 border-b border-gray-800 mb-6">
                    <button onClick={() => setActiveTab('popular')} className={`pb-2 ${activeTab === 'popular' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}>
                        Popular
                    </button>
                    <button onClick={() => setActiveTab('albums')} className={`pb-2 ${activeTab === 'albums' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}>
                        Albums
                    </button>
                </div>

                {/* Nội dung tab */}
                {activeTab === 'popular' ? (
                    <div>
                        {/* Nút phát */}
                        <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full mb-6 flex items-center gap-2">
                            <FaPlay /> Play
                        </button>

                        {/* Danh sách bài hát phổ biến */}
                        fav
                    </div>
                ) : (
                    <div>
                        {/* Danh sách album */}
                        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {artist.albums.map(album => (
                                <div key={album.id} className="group">
                                    <div className="relative mb-3">
                                        <Image
                                            src={album.coverImage}
                                            alt={album.title}
                                            width={50}
                                            height={50}
                                            className="w-full aspect-square object-cover rounded shadow-lg group-hover:opacity-80 transition"
                                        />
                                        <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition">
                                            <FaPlay className="text-black" />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{album.title}</h3>
                                        <p className="text-sm text-gray-400">{album.year} • Album</p>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                )}

                {/* Giới thiệu nghệ sĩ */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">About</h2>
                    <p className="text-gray-300 max-w-3xl">{musician.about}</p>
                </div>

                
            </div>

        </div>
    )
}
