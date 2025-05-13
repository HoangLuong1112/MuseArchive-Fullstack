'use client'

import React, { useState } from "react";
import Image from "next/image";
import ProfileCard from "../component/ProfileCard";
import { playlists } from "../api/playlists/data";
import SongList from "../component/SongList";

const UserProfile = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState([]); 



    return (
        <div className="text-white bg-neutral-900 min-h-screen">
            {/* Header Section */}
            <ProfileCard account={{
                userName: "maitrinh22",
                password: "123456",
                email: "user@example.com",
                gender: false,
                birthday: new Date("22-11-2004")
            }} />

            {/* Playlists Section */}
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {playlists.map((pl, index) => (
                        <div
                            key={index}
                            className="bg-neutral-800 rounded-lg p-4 hover:bg-neutral-700 transition transform hover:scale-105"
                        >
                            <Image
                                src={pl.coverUrl}
                                alt={pl.playlistName}
                                className="w-full h-40 object-cover rounded mb-3"
                                width={40}
                                height={40}
                            />
                            <h3 className="font-medium text-lg">{pl.playlistName}</h3>
                            <p className="text-sm text-neutral-400">{pl.description}</p>
                            <p className="text-sm text-neutral-500">By {pl.musician}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Playlist Songs Section */}
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>
                {recentlyPlayed.length > 0 &&
                    <SongList songlist={recentlyPlayed} />
                }
            </div>
        </div>
    );
};

export default UserProfile;
