'use client'
import { useRouter } from "next/navigation";
import AlbumPage from "./album/page";
import { useAuth } from "./context/AuthContext";
import MusicianPage from "./musician/page";
import PlaylistPage from "./playlist/page";
import TrackPage from "./track/page";
import { useEffect } from "react";

export default function Home() {
	const { currentUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!currentUser) {
			router.push('/loginpage'); // Chuyển hướng nếu chưa đăng nhập
		}
	}, [currentUser, router]);

	if (!currentUser) {
		// Tránh render nội dung khi đang redirect
		return null;
	}
	return (
		<div className="grid grid-cols-1 gap-8">
			<PlaylistPage />
			<AlbumPage />
			<MusicianPage />
			<TrackPage />	
		</div>
	);
}
