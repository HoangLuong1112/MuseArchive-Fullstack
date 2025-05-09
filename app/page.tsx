'use client'
import Link from "next/link";
import PlaylistPage from "./playlist/page";
// import Playlist from "./component/Playlist";

export default function Home() {
	return (
		<div>
			{/* <div className="">
				HomePage <br/>
				<p>Wellcome Summonner</p>
				<Link href={"/playlist"} className="font-bold text-5xl">Playlist Testing</Link><br/>
				<Playlist />
			</div> */}
			<PlaylistPage />
		</div>
	);
}
