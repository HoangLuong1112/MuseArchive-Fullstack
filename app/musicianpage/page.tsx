'use client';

import { useState} from 'react';
import { FaPlay, FaEllipsisH, FaHeart, FaRegHeart, FaCheck } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { BsFillPeopleFill } from 'react-icons/bs';
import Image from 'next/image';

interface Song {
    id: number;
    title: string;
    duration: string;
    plays: number;
    isLiked: boolean;
}

interface Album {
    id: number;
    title: string;
    year: string;
    coverImage: string;
}

interface Artist {
    id: number;
    name: string;
    monthlyListeners: string;
    bio: string;
    profileImage: string;
    coverImage: string;
    isVerified: boolean;
    isFollowing: boolean;
    popularSongs: Song[];
    albums: Album[];
    similarArtists: {
        id: number;
        name: string;
        image: string;
    }[];
}

const mockArtist: Artist = {
    id: 1,
    name: 'Taylor Swift',
    monthlyListeners: '82.4M',
    bio: 'Taylor Swift is an American singer-songwriter. Her discography spans multiple genres, and her songwriting—often inspired by her personal life—has received critical praise and wide media coverage.',
    profileImage: '/covers/1989-deluxe.jpg',
    coverImage: '/covers/1989-deluxe.jpg',
    isVerified: true,
    isFollowing: false,
    popularSongs: [
        { id: 1, title: 'Cruel Summer', duration: '2:58', plays: 1200000000, isLiked: false },
        { id: 2, title: 'Anti-Hero', duration: '3:20', plays: 980000000, isLiked: true },
        { id: 3, title: 'Blank Space', duration: '3:51', plays: 1500000000, isLiked: true },
        { id: 4, title: 'Lover', duration: '3:41', plays: 850000000, isLiked: false },
        { id: 5, title: 'Cardigan', duration: '3:59', plays: 750000000, isLiked: false },
    ],
    albums: [
        { id: 1, title: 'Midnights', year: '2022', coverImage: '/covers/1989-deluxe.jpg' },
        { id: 2, title: 'Folklore', year: '2020', coverImage: '/covers/1989-deluxe.jpg' },
        { id: 3, title: 'Lover', year: '2019', coverImage: '/covers/1989-deluxe.jpg' },
        { id: 4, title: '1989', year: '2014', coverImage: '/covers/1989-deluxe.jpg' },
    ],
    similarArtists: [
        { id: 1, name: 'Olivia Rodrigo', image: '/covers/1989-deluxe.jpg' },
        { id: 2, name: 'Lana Del Rey', image: '/covers/1989-deluxe.jpg' },
        { id: 3, name: 'Billie Eilish', image: '/covers/1989-deluxe.jpg' },
        { id: 4, name: 'Ariana Grande', image: '/covers/1989-deluxe.jpg' },
    ],
};

export default function ArtistDetailPage() {
    const [artist, setArtist] = useState<Artist>(mockArtist);
    const [activeTab, setActiveTab] = useState<'popular' | 'albums'>('popular');

    const toggleFollow = () => {
        setArtist(prev => ({
            ...prev,
            isFollowing: !prev.isFollowing
        }));
    };

    const toggleLike = (songId: number) => {
        setArtist(prev => ({
            ...prev,
            popularSongs: prev.popularSongs.map(song =>
                song.id === songId ? { ...song, isLiked: !song.isLiked } : song
            )
        }));
    };

    const formatPlays = (plays: number): string => {
        if (plays >= 1000000000) {
            return `${(plays / 1000000000).toFixed(1)}B`;
        }
        if (plays >= 1000000) {
            return `${(plays / 1000000).toFixed(1)}M`;
        }
        if (plays >= 1000) {
            return `${(plays / 1000).toFixed(1)}K`;
        }
        return plays.toString();
    };

    return (
        <div className="text-white min-h-screen rounded-lg">
            {/* Header với ảnh cover */}
            <div className="relative  rounded-lg">
                <div
                    className="h-64 w-full bg-gradient-to-b from-purple-900 to-black  rounded-lg"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${artist.coverImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute bottom-0 left-0 p-6 flex items-end gap-6">
                        <Image
                            src={artist.profileImage}
                            alt={artist.name}
                            width={48}
                            height={48}
                            className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-black"
                        />
                        <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <h1 className="text-5xl font-bold">{artist.name}</h1>
                                {artist.isVerified && (
                                    <span className="bg-blue-500 text-white text-xs px-1 rounded-full">
                                        <FaCheck className="inline" />
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-1">
                                    <BsFillPeopleFill />
                                    <span>{artist.monthlyListeners} monthly listeners</span>
                                </div>
                                <button
                                    onClick={toggleFollow}
                                    className={`px-4 py-1 rounded-full font-semibold ${artist.isFollowing ? 'bg-white text-black' : 'bg-transparent border border-white'}`}
                                >
                                    {artist.isFollowing ? 'Following' : 'Follow'}
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
                    <button
                        onClick={() => setActiveTab('popular')}
                        className={`pb-2 ${activeTab === 'popular' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
                    >
                        Popular
                    </button>
                    <button
                        onClick={() => setActiveTab('albums')}
                        className={`pb-2 ${activeTab === 'albums' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
                    >
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
                        <div className="mb-8">
                            <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm border-b border-gray-800 pb-2 mb-4">
                                <div className="col-span-1">#</div>
                                <div className="col-span-6">Title</div>
                                <div className="col-span-3 flex justify-end">
                                    <IoMdTime />
                                </div>
                                <div className="col-span-2"></div>
                            </div>

                            {artist.popularSongs.map((song, index) => (
                                <div
                                    key={song.id}
                                    className="grid grid-cols-12 gap-4 py-3 hover:bg-gray-800 rounded-lg px-2 items-center"
                                >
                                    <div className="col-span-1 text-gray-400">{index + 1}</div>
                                    <div className="col-span-6">
                                        <div className="font-medium">{song.title}</div>
                                        <div className="text-sm text-gray-400">{formatPlays(song.plays)} plays</div>
                                    </div>
                                    <div className="col-span-3 text-gray-400 text-right">
                                        {song.duration}
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-3">
                                        <button
                                            onClick={() => toggleLike(song.id)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            {song.isLiked ? <FaHeart className="text-green-500" /> : <FaRegHeart />}
                                        </button>
                                        <button className="text-gray-400 hover:text-white">
                                            <FaEllipsisH />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Danh sách album */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                        </div>
                    </div>
                )}

                {/* Giới thiệu nghệ sĩ */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">About</h2>
                    <p className="text-gray-300 max-w-3xl">{artist.bio}</p>
                </div>

                {/* Nghệ sĩ tương tự */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Fans also like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {artist.similarArtists.map(artist => (
                            <div key={artist.id} className="group text-center">
                                <div className="relative mb-3">
                                    <Image
                                        src={artist.image}
                                        alt={artist.name}
                                        width={100}
                                        height={100}
                                        className="w-full aspect-square object-cover rounded-full shadow-lg group-hover:opacity-80 transition"
                                    />
                                    <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
                                        <FaPlay className="text-black text-sm" />
                                    </button>
                                </div>
                                <h3 className="font-semibold">{artist.name}</h3>
                                <p className="text-sm text-gray-400">Artist</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}