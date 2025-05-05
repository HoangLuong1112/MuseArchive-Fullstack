'use client';
import { useEffect, useState } from 'react';
import MusicPlayer, { SongProps } from './MusicPlayer';

type AlbumDetailProps = {
  albumId: string;
};

export default function AlbumDetail({ albumId }: AlbumDetailProps) {
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [selectedSong, setSelectedSong] = useState<SongProps | null>(null);

  useEffect(() => {
    async function fetchAlbumAndSongs() {
      const res = await fetch(`/api/albums/${albumId}`);
      const album = await res.json();

      const songDetails = await Promise.all(
        album.songs.map(async (songId: string) => {
          const res = await fetch(`/api/songs/${songId}`);
          return await res.json();
        })
      );

      setSongs(songDetails.map(song => ({
        title: song.name,
        artist: song.musician,
        albumArt: song.cover,
        audioSrc: song.audio,
      })));
    }

    fetchAlbumAndSongs();
  }, [albumId]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Songs in Album</h2>
      <ul className="divide-y divide-gray-700">
        {songs.map((song, idx) => (
          <li key={idx} 
              className="py-2 px-2 hover:bg-zinc-800 cursor-pointer rounded"
              onClick={() => setSelectedSong(song)}>
            <div className="flex items-center gap-4">
              <img src={song.albumArt} className="w-10 h-10 rounded object-cover" />
              <div>
                <p className="text-sm">{song.title}</p>
                <p className="text-xs text-zinc-400">{song.artist}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedSong && <MusicPlayer song={selectedSong} />}
    </div>
  );
}
