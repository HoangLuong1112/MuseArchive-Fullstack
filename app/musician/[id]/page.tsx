'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Musician } from '@/types/song'
import Image from 'next/image'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaCheck, FaFacebook, FaInstagram, FaPlay, FaTwitter, FaYoutube } from 'react-icons/fa'
import SongList from '@/app/component/SongList'
import Carousel from '@/app/component/Carousel'
import AlbumCard from '@/app/component/AlbumCard'
import Link from 'next/link'
// import SongList from '@/app/component/SongList'


export default function MusicianDetail() {
    const { id } = useParams();           //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const [musician, setMusician] = useState<Musician | null>(null);
    const [activeTab, setActiveTab] = useState<'popular' | 'albums'>('popular');
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        fetch(`/api/musicians/${id}`)
        .then(res => res.json())
        .then(data => setMusician(data))
    }, [id])

    // hàm theo dõi, làm tạm cập nhập follower
    const toggleFollow = () => {
        if (!musician) return;
        const follower = musician.follower ?? 0;

        const updatedMusician = {
            ...musician,
            follower: isFollowing ? follower - 1 : follower + 1
        };
        setMusician(updatedMusician)

        setIsFollowing(!isFollowing);
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
                                <button onClick={toggleFollow} className={`px-4 py-1 rounded-full font-semibold ${isFollowing ? 'bg-white text-black' : 'bg-transparent border border-white'}`}>
                                    {isFollowing ? 'Following' : 'Follow'}
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
                        <span>Các bài hát phổ biến</span>
                        {/* Nút phát */}
                        <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full mb-6 flex items-center gap-2">
                            <FaPlay /> Play
                        </button>
                        {/* Danh sách bài hát phổ biến */}
                        <SongList songlist={musician.topSongs} />
                    </div>
                ) : (
                    <div>
                        {/* Danh sách album */}
                        <Carousel title={`Các album của ${musician.musicianName}`} items={musician.albums ?? []} renderItem={(al, i) => (
                            <AlbumCard key={i} id={al.id} albumName={al.albumName} coverUrl={al.coverUrl} musician={al.musician}/>
                        )}/>
                    </div>
                )}

                {/* Giới thiệu nghệ sĩ */}
                <div className="mt-12 flex flex-col gap-5   ">
                    <h2 className="text-2xl font-bold">About</h2>
                    <p className="text-gray-300 max-w-3xl">{musician.about}</p>
                    <div className='flex gap-5 items-center'>
                        {musician.socialMedia?.xLink && (
                            <Link href={musician.socialMedia.xLink}><FaTwitter size={24} /></Link>
                        )}
                        {musician.socialMedia?.faceLink && (
                            <Link href={musician.socialMedia.faceLink}><FaFacebook size={24} /></Link>
                        )}
                        {musician.socialMedia?.instaLink && (
                            <Link href={musician.socialMedia.instaLink}><FaInstagram size={30} /></Link>
                        )}
                        {musician.socialMedia?.youtubeLink && (
                            <Link href={musician.socialMedia.youtubeLink}><FaYoutube size={30} /></Link>
                        )}
                    </div>
                </div>

                
            </div>

        </div>
    )
}
