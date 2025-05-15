'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Playlist } from '@/types/song';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

const CreatePlaylistModal = ({ onCreate }: { onCreate: (playlist: Playlist) => void }) => {
	const { currentUser } = useAuth();
	const [playlistName, setPlaylistName] = useState('');
	const [description, setDescription] = useState('');
	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setCoverFile(e.target.files[0]);
			setPreviewUrl(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!playlistName || !coverFile || !currentUser) return;

		const newPlaylist: Playlist = {
			id: uuidv4(),
			playlistName,
			description: description || '',
			coverUrl: previewUrl || '', // dùng preview tạm, bạn có thể thay bằng server upload sau
			createdby: currentUser.userName,
			dayAdd: new Date().toISOString(),
			songList: [],
			songs: []
		};

		onCreate(newPlaylist);
		setPlaylistName('');
		setDescription('');
		setCoverFile(null);
		setPreviewUrl(null);
	};

	return (
		<form onSubmit={handleSubmit} className="bg-zinc-500 p-6 rounded-lg shadow-md w-full max-w-md text-white space-y-4">
			<h2 className="text-2xl font-bold mb-4">Tạo Playlist Mới</h2>

			<div>
				<label className="block mb-1">Tên playlist *</label>
				<input
					value={playlistName}
					onChange={(e) => setPlaylistName(e.target.value)}
					className="w-full p-2 rounded bg-zinc-800"
					required
				/>
			</div>

			<div>
				<label className="block mb-1">Mô tả</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full p-2 rounded bg-zinc-800"
				/>
			</div>

			<div>
				<label className="block mb-1">Ảnh bìa *</label>
				<input type="file" accept="image/*" onChange={handleFileChange} className='' required />
				{previewUrl && (
					<Image src={previewUrl} alt="preview" width={128} height={128} className="mt-2 object-cover rounded" />
				)}
			</div>

			<button type="submit" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
				Tạo Playlist
			</button>
		</form>
	);
};

export default CreatePlaylistModal;
