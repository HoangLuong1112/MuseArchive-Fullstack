'use client'
import PlaylistPage from "./playlist/page";

export default function Home() {
	return (
		<div>
			<PlaylistPage />
			<div className="w-fit h-[5000px] bg-amber-400">Test page scroll</div>
		</div>
	);
}
