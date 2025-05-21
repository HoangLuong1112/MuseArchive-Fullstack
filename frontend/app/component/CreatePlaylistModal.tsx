'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';
import { Playlist } from '@/types/song_final';

type CreatePlaylistModalProps = {
	mode?: 'create' | 'edit';
	playlist?: Playlist;
	onSuccess?: () => void;
};

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ mode = 'create', playlist, onSuccess }) => {
	console.log('Playlist đang nhận: ', playlist);
	const { getAccessToken } = useAuth();
	const [playlistName, setPlaylistName] = useState('');
	const [description, setDescription] = useState('');
	const [isPublic, setIsPublic] = useState(true);
	const [coverFile, setCoverFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (mode === 'edit' && playlist) {
			setPlaylistName(playlist.playlistName);
			setDescription(playlist.description || '');
			setIsPublic(playlist.isPublic || false);
			setPreviewUrl(playlist.coverUrl);
		}
	}, [mode, playlist]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setCoverFile(e.target.files[0]);
			setPreviewUrl(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (mode === 'create' && !coverFile) {
			alert('Thiếu ảnh bìa!');
			return;
		}

		try {
			const token = await getAccessToken();
			const formData = new FormData();
			formData.append('playlist_name', playlistName);
			formData.append('description', description || '');
			// formData.append('cover_image', coverFile);
			formData.append('is_public', isPublic ? 'true' : 'false');
			if (coverFile) {
				formData.append('cover_image', coverFile);
			}

			const url = `${process.env.NEXT_PUBLIC_API_URL}api/user-playlists/${mode === 'edit' ? `${playlist?.id}/` : ''}`;
			const method = mode === 'edit' ? 'PUT' : 'POST';

			const res = await fetch(url,{
				method: method,
				headers: {
					'Authorization': `Bearer ${token}`,
				},
				body: formData,
			})
			if (!res.ok) throw new Error(`Lỗi khi tạo playlist: ${res.status}`);
			const result = await res.json();
			console.log('Thành công:', result);

			// setPlaylistName('');
			// setDescription('');
			// setCoverFile(null);
			// setPreviewUrl(null);
			alert(mode === 'edit' ? 'Cập nhật thành công!' : 'Tạo playlist thành công!');
			if (onSuccess) onSuccess();
			location.reload();
		} catch (err) {
			console.error('Error: ', err);
			alert('Xảy ra lỗi. Vui lòng thử lại.');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="bg-zinc-500 p-6 rounded-lg shadow-md w-full max-w-md text-white space-y-4">
			<h2 className="text-2xl font-bold mb-4">{mode === 'edit' ? 'Chỉnh sửa Playlist' : 'Tạo Playlist Mới'}</h2>

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
				<label className='block mb-1'>Công khai playlist</label>
				<select className='w-full p-2 rounded bg-zinc-800' onChange={(e) => setIsPublic(e.target.value === 'true')} value={isPublic.toString()}>
					<option value="true">Công khai</option>
					<option value="false">Riêng tư</option>
				</select>
			</div>

			<div>
				<label className="block mb-1">Ảnh bìa {mode === 'create' ? '*' : ''}</label>
				<input type="file" accept="image/*" onChange={handleFileChange} required={mode === 'create'}/>
				{previewUrl && (
					<Image src={previewUrl} alt="preview" width={128} height={128} className="mt-2 object-cover rounded" />
				)}
			</div>

			<button type="submit" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
				{mode === 'edit' ? 'Lưu thay đổi' : 'Tạo Playlist'}
			</button>
		</form>
	);
};

export default CreatePlaylistModal;
