'use client';
import React from 'react';
import Playlist, { SongProps } from './Playlist';

interface MainContentProps {
    onSelectSong: (song: SongProps) => void;
}

const MainContent = ({ onSelectSong }: MainContentProps) => {
    const samplePlaylists = [
        {
            id: 1,
            name: 'Top Hits',
            image: '/album.jpg',
            songCount: 50,
        },
        {
            id: 2,
            name: 'Chill Vibes',
            image: '/album.jpg',
            songCount: 30,
        },
        {
            id: 3,
            name: 'Rock Classics',
            image: '/album.jpg',
            songCount: 60,
        },
        {
            id: 4,
            name: 'Workout Playlist',
            image: '/album.jpg',
            songCount: 40,
        },
    ];
    return (
        <div className="flex-1 p-6 bg-[#1b1b1b] text-white overflow-y-auto rounded-lg">
            {/* Header with 3 buttons */}
            <div className="flex items-center mb-6 text-black">
                <button className="px-2 py-1 w-15 h-7 bg-[#fff] rounded-lg hover:bg-gray-600 text-sm mr-2">
                    All
                </button>
                <button className="px-2 py-1 w-15 h-7 bg-[#fff] rounded-lg hover:bg-gray-600 text-sm mr-2">
                    Songs
                </button>
                <button className="px-2 py-1 w-15 h-7 bg-[#fff] rounded-lg hover:bg-gray-600 text-sm mr-2">
                   Playlist
                </button>
            </div>

            {/* Featured Playlist Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Featured Playlists</h1>
                <p className="text-lg mt-2">Handpicked playlists just for you.</p>
                <div className="mt-4 grid grid-cols-6 gap-6">
                    {/* Example of Playlist Preview */}
                    {samplePlaylists.map((playlist) => (
                        <div key={playlist.id} className="rounded-lg overflow-hidden song-child">
                            <img
                                src={playlist.image}
                                alt={playlist.name}
                                className="w-40 h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{playlist.name}</h3>
                                <p className="text-sm text-gray-400">{playlist.songCount} songs</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Tracks Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Top Tracks</h1>
                <p className="text-lg mt-2">Listen to the most popular songs right now.</p>
                <div className="space-y-4 mt-4">
                    <Playlist onSelect={onSelectSong} />
                </div>
            </div>

            {/* Recently Played Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Recently Played</h1>
                <p className="text-lg mt-2">Your recently played songs and playlists.</p>
                <div className="mt-4 grid grid-cols-6 gap-6">
                    {/* Example of Recent Play */}
                    {samplePlaylists.map((playlist) => (
                        <div key={playlist.id} className=" rounded-lg overflow-hidden song-child">
                            <img
                                src={playlist.image}
                                alt={playlist.name}
                                className="w-40 h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{playlist.name}</h3>
                                <p className="text-sm text-gray-400">{playlist.songCount} songs</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommended Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Recommended For You</h1>
                <p className="text-lg mt-2">We think you'll love these tracks.</p>
                <div className="mt-4 grid grid-cols-6 gap-6 ">
                    {/* Example of Recommendation */}
                    <div className="rounded-lg overflow-hidden song-child">
                        <img src="/album.jpg" alt="Rec 1" className="w-40 h-40 object-cover" />
                        <h3 className="text-lg mt-2">Track 1</h3>
                        </div>
                </div>
            </div>

        </div>
    );
};

export default MainContent;
