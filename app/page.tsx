'use client'
import { useRouter } from "next/navigation";
import AlbumPage from "./album/page";
import { useAuth } from "./context/AuthContext";
import MusicianPage from "./musician/page";
import PlaylistPage from "./playlist/page";
import TrackPage from "./track/page";
import { useEffect } from "react";

export default function Home() {
	//isLoading để đảm bảo chỉ redirect khi đã load xong currentUser
	const { currentUser, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !currentUser) {
			router.push('/loginpage'); // Chuyển hướng nếu chưa đăng nhập
		}
	}, [isLoading, currentUser, router]);

	if (isLoading) 
		return <div className="text-white p-4">Đang tải...</div>;

	// Tránh render nội dung khi đang redirect
	if (!currentUser) return null;

	return (
		<div className="grid grid-cols-1 gap-8">
			<PlaylistPage />
			<AlbumPage />
			<MusicianPage />
			<TrackPage />	
		</div>
	);
}
