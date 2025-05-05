'use client';
import { useEffect, useState } from "react";
import AlbumDetail from './AlbumDetail';

type Album = {
  id: string;
  name: string;
  musician: string;
  cover: string;
};

export default function AlbumList() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/dummy_data/albums-list.json')
      .then(res => res.json())
      .then(setAlbums)
      .catch(err => console.error("Failed to load albums", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Albums</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map(album => (
          <div key={album.id}
               className="cursor-pointer hover:scale-105 transition"
               onClick={() => setSelectedAlbumId(album.id)}>
            <img src={album.cover} className="rounded shadow-md w-full h-40 object-cover" />
            <h2 className="text-sm font-semibold mt-2">{album.name}</h2>
            <p className="text-xs text-gray-500">{album.musician}</p>
          </div>
        ))}
      </div>

      {selectedAlbumId && (
        <div className="mt-8">
          <AlbumDetail albumId={selectedAlbumId} />
        </div>
      )}
    </div>
  );
}