'use client'
import Link from "next/link";
import Playlist from "./component/Playlist";

export default function Home() {
	return (
		<div>
			<div className="">
				HomePage <br/>
				<Link href={"/mainpage"} className="font-bold text-5xl">MainPage</Link><br />
				<Link href={"/settingpage"} className="font-bold text-5xl">Setting</Link><br/>
				<Link href={"/playlist"} className="font-bold text-5xl">Playlist</Link><br/>
				<Playlist />
			</div>
		</div>
	);
}
