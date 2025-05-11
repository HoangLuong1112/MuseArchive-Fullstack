'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaEllipsisH, FaTrash, FaPlay } from 'react-icons/fa';
import Image from 'next/image';

interface Song {
    id: number;
    title: string;
    artist: string;
    album: string;
    duration: string;
    image: string;
}

const sampleSongs: Song[] = [
    {
        id: 1,
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        album: 'Divide',
        duration: '3:53',
        image: '/covers/1989-deluxe.jpg',
    },
    {
        id: 2,
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: '3:20',
        image: '/covers/1989-deluxe.jpg',
    },
    {
        id: 3,
        title: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        duration: '3:23',
        image: '/covers/1989-deluxe.jpg',
    },
];

export default function PlaylistSongList() {
    const [songs, setSongs] = useState<Song[]>([]); // Playlist bài hát
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Song[]>([]); // Kết quả tìm kiếm từ dữ liệu mẫu
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [showMenuIndex, setShowMenuIndex] = useState<number | null>(null);

    const handleRemoveSong = (indexToRemove: number) => {
        const newSongs = songs.filter((_, index) => index !== indexToRemove);
        setSongs(newSongs);
        setShowMenuIndex(null); // Ẩn menu sau khi xoá
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowMenuIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleAddSongs = (song: Song) => {
        setSongs((prevSongs) => [...prevSongs, song]);
    };

    const toggleMenu = (index: number) => {
        setShowMenuIndex(showMenuIndex === index ? null : index);
    };



    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

        if (e.target.value) {
            const results = sampleSongs.filter((song) =>
                song.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]); // Không có kết quả tìm kiếm
        }
    };

    const handlePlayAll = () => {
        console.log("Đang phát tất cả bài hát trong playlist", songs);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full mt-6 text-white px-8 rounded-lg">
            {/* Nếu playlist có bài hát, hiển thị nút phát tất cả */}
            {songs.length > 0 && (
                <div className="mb-6">
                    <button
                        onClick={handlePlayAll}
                        className="bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-green-600 transition"
                    >
                        <FaPlay />
                        Phát tất cả
                    </button>
                </div>
            )}

            <div className="grid grid-cols-12 py-2 px-4 text-gray-400 text-sm border-b border-gray-700">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Tiêu đề</div>
                <div className="col-span-3">Album</div>
                <div className="col-span-3 text-right pr-4">Thời lượng</div>
            </div>

            {songs.map((song, index) => (
                <div
                    key={index}
                    className="rounded-sm grid grid-cols-12 items-center px-4 py-3 hover:bg-[#2a2a2a] transition group cursor-pointer relative"
                >
                    <div className="col-span-1 text-gray-400 group-hover:text-white">{index + 1}</div>

                    <div className="col-span-5 flex items-center gap-4">
                        <Image
                            src={song.image}
                            alt={song.title}
                            className="w-12 h-12 object-cover rounded"
                            width={12}
                            height={12}
                        />
                        <div>
                            <p className="font-semibold">{song.title}</p>
                            <Link href="/musicianpage"><p className="text-sm text-gray-400">{song.artist}</p></Link>
                        </div>
                    </div>

                    <div className="col-span-3 text-sm text-gray-300">{song.album}</div>
                    <div className="col-span-3 text-sm text-gray-400 text-right pr-4">
                        {song.duration}
                    </div>

                    {/* Nút 3 chấm mở menu */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(index);
                        }}

                        className="col-span-1 text-gray-500 cursor-pointer ml-2 group-hover:text-white absolute right-2"
                    >
                        <FaEllipsisH />
                    </div>

                    {/* Menu Pop-up */}
                    {showMenuIndex === index && (
                        <div
                            ref={menuRef}
                            className="absolute bg-gray-800 p-2 rounded-lg top-12 right-0 shadow-lg w-40"
                        >
                            <ul>
                                <li
                                    onClick={() => handleRemoveSong(index)}
                                    className="px-4 py-2 text-red-500 hover:bg-gray-700 cursor-pointer rounded-md"
                                >
                                    <FaTrash className="inline mr-2" />
                                    Xóa bài hát
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            {/* Textbox tìm kiếm bài hát từ dữ liệu mẫu */}
            <div className="mt-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Tìm bài hát..."
                    className="w-full p-3 text-white bg-gray-800 rounded-lg outline-none placeholder-gray-400"
                />
            </div>

            {/* Hiển thị kết quả tìm kiếm */}
            {searchResults.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white">Kết quả tìm kiếm</h3>
                    <div className="mt-4">
                        {searchResults.map((song) => (
                            <div
                                key={song.id}
                                className="rounded-sm flex justify-between items-center py-2 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleAddSongs(song)}
                            >
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={song.image}
                                        alt={song.title}
                                        className="w-12 h-12 object-cover rounded"
                                        width={12}
                                        height={12}
                                    />
                                    <div>
                                        <p className="font-semibold">{song.title}</p>
                                        <Link href="/musician/id"><p className="text-sm text-gray-400">{song.artist}</p></Link>
                                    </div>
                                </div>
                                <button className="text-green-500 bg-transparent border-2 border-green-500 text-sm px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition mr-2">
                                    Thêm
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Nếu chưa có bài hát, hiển thị phần tìm kiếm hoặc đề xuất để thêm bài hát */}
            {/* {songs.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-20 text-white">
                    <FaSearch className="text-5xl mb-6 text-gray-500" />
                    <button
                        onClick={() => setSongs([])} // Xử lý logic thêm bài hát ở đây
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition text-white font-semibold px-5 py-2 rounded-full"
                    >
                        <FaPlus />
                        Tìm bài hát
                    </button>
                </div>
            )} */}
        </div>
    );
}
