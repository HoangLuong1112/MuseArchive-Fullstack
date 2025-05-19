'use client'
import AlbumPage from "./album/page";
import MusicianPage from "./musician/page";
import PlaylistPage from "./playlist/page";
import TrackPage from "./track/page";

export default function Home() {
	return (
		<div className="grid grid-cols-1 gap-8">
			<PlaylistPage />
			<AlbumPage />
			<MusicianPage />
			<TrackPage />	
		</div>
	);
}
