interface Song {
  id: string;
  name: string;
  audio: string;
  cover: string;
  duration: number;
  musician: string;
}

interface Album {
  id: string;
  name: string;
  musician: string;
  songs: string[];
}

export default async function AlbumPage({ params }: { params: { id: string } }) {
  const albumRes = await fetch(`http://localhost:3000/api/albums/${params.id}`);
  if (!albumRes.ok) return <div>Album không tồn tại.</div>;
  const album: Album = await albumRes.json();

  const songPromises = album.songs.map(songId =>
    fetch(`http://localhost:3000/api/songs/${songId}`).then(res => res.json())
  );
  const songs: Song[] = await Promise.all(songPromises);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{album.name} - {album.musician}</h1>
      <ul className="mt-4">
        {songs.map(song => (
          <li key={song.id} className="mb-4">
            <p className="font-medium">{song.name}</p>
            <audio controls src={song.audio} />
          </li>
        ))}
      </ul>
    </div>
  );
}
