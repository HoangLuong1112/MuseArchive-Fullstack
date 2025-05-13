'use client'

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { playlists } from "../api/playlists/data";
import { albums } from "../api/albums/data";
import { Playlist, Album } from "@/types/song";

import Link from "next/link";

const likedSongs = {
  playlistName: "Bài hát đã thích",
  coverUrl: "/images/liked-songs.png",
  description: "Danh sách các bài hát bạn đã thả tim.",
};

const Library: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Thẻ bài hát đã thích */}
      <Link href="/likedsongpage"><div className="flex items-center gap-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-4 shadow-lg hover:shadow-xl transition cursor-pointer my-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden">
          <Image src={likedSongs.coverUrl} alt="Liked Songs" className="w-full h-full object-cover"  width={32} height={32}/>
        </div>
        <div>
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <Heart className="text-pink-400" size={20} />
            {likedSongs.playlistName}
          </h2>
          <p className="text-sm text-white/80">{likedSongs.description}</p>
        </div>
      </div></Link>

      {/* Danh sách Playlist */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Playlist của bạn</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map((playlist, index) => (
            <div key={index} className="bg-neutral-800 rounded-xl p-4 hover:bg-neutral-700 transition cursor-pointer">
              <Image src={playlist.coverUrl} alt={playlist.playlistName} className="w-full h-40 object-cover rounded-lg mb-3"  width={40} height={40}/>
              <h4 className="text-white font-semibold text-lg">{playlist.playlistName}</h4>
              <p className="text-sm text-neutral-400">{playlist.description}</p>
              {playlist.musician && (
                <p className="text-xs text-neutral-500 mt-1">By {playlist.musician}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Album gần đây */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Album gần đây</h3>
        <div className="flex gap-4 overflow-x-auto">
          {albums.map((album: Album, index) => (
            <div key={index} className="min-w-[150px] bg-neutral-800 p-3 rounded-lg hover:bg-neutral-700 transition cursor-pointer">
              <Image src={album.coverUrl} alt={album.albumName} className="w-full h-32 object-cover rounded-md mb-2" width={32} height={32}/>
              <p className="text-white text-sm font-medium">{album.albumName}</p>
              {album.musician && (
                <p className="text-xs text-neutral-400">by {album.musician}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
