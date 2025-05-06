'use client'
import Link from "next/link";
import Playlist from "./component/Playlist";
import AlbumList from "./component/AlbumList";

export default function Home() {
	return (
		<div>
			<div className="">
				HomePage <br/>
				Testing Mainpage <br/>
				<Link href={"/mainpage"} className="font-bold text-5xl">MainPage</Link><br />
				<Link href={"/setting"} className="font-bold text-5xl">Setting</Link><br/>
				<Playlist />
				<AlbumList />				
			</div>
		</div>
	);
}
