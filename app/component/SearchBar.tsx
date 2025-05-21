// components/SearchBar.tsx

import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface Musician {
    id: string;
    musician_name: string;
    avatar_pic: string;
    is_verified: boolean;
}

interface Album {
    id: string;
    album_name: string;
    coverurl: string;
}

interface Playlist {
    id: string;
    playlist_name: string;
    cover_image: string;
    description: string;
}

interface Song {
    id: string;
    title: string;
    albumArt: string;
    duration: number;
    album: {
        id: string;
        album_name: string;
    };
    musicians: {
        id: string;
        musician_name: string;
    }[];
}

type SearchResults = {
    songs: Song[];
    albums: Album[];
    musicians: Musician[];
    playlists: Playlist[];
};

const SearchBar: React.FC = () => {
    const { getAccessToken } = useAuth();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults>({
        songs: [],
        albums: [],
        musicians: [],
        playlists: [],
    });

    const fetchResults = useCallback( async (searchText: string) => {
        try {
            const token = await getAccessToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/search?q=${encodeURIComponent(searchText)}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Failed to fetch');
            const data: SearchResults = await res.json();
            setResults(data);
            console.log('Search results:', data);
        } catch (error) {
            console.error('Search error:', error);
            setResults({ songs: [], albums: [], musicians: [], playlists: [] });
        }
    },[getAccessToken]);

    const debouncedSearch = useCallback(
        debounce((val: string) => {
            if (val.trim()) {
                fetchResults(val);
            } else {
                setResults({ songs: [], albums: [], musicians: [], playlists: [] });
            }
        }, 500),[fetchResults]
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    return (
        <div className='relative w-full max-w-md'>
            <div className="flex items-center bg-neutral-800 px-3 py-1.5 rounded-full w-full max-w-md hover:bg-neutral-700 transition">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Tìm kiếm bài hát, nghệ sĩ..." value={query} onChange={handleChange} className="bg-transparent outline-none text-sm text-white ml-2 w-full placeholder-gray-400"/>
            </div>
            
            {query && (results.songs.length > 0 || results.albums.length > 0 || results.musicians.length > 0) && (
                <div className="absolute top-full mt-4 w-full max-h-[300px] overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-md shadow-lg z-50 p-4 space-y-4">
                    
                    
                    {results.songs.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-white mb-1">Songs</h3>
                            <div className="space-y-1">
                                {results.songs.map((song) => (
                                    <Link href={`/track/${song.id}`} key={song.id} onClick={() => setQuery('')} className="flex items-center gap-5 text-gray-300 hover:text-white hover:bg-neutral-600 transition">
                                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                            <Image src={song.albumArt} alt={song.title} className="w-full h-full object-cover" width={25} height={25}/>
                                        </div>
                                        
                                        <p className='text-[18px]'>{song.title}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.albums.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-white mb-1">Albums</h3>
                            <div className="space-y-1">
                                {results.albums.map((album) => (
                                    <Link href={`/album/${album.id}`} key={album.id} onClick={() => setQuery('')} className="flex items-center gap-5 text-gray-300 hover:text-white hover:bg-neutral-600 transition">
                                        <div className="w-12 h-12 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                                            <Image src={album.coverurl} alt={album.album_name} className="w-full h-full object-cover" width={25} height={25}/>
                                        </div>
                                        
                                        <p className='text-[18px] '>{album.album_name}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.musicians.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-white mb-1">Artists</h3>
                            <div className="space-y-1">
                                {results.musicians.map((artist) => (
                                    <Link href={`/musician/${artist.id}`} key={artist.id} onClick={() => setQuery('')} className="flex items-center gap-5 text-gray-300 hover:text-white hover:bg-neutral-600 transition">
                                        <div className="w-12 h-12 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                                            <Image src={artist.avatar_pic} alt={artist.musician_name} className="w-full h-full object-cover" width={25} height={25}/>
                                        </div>
                                        
                                        <p className='text-[18px]'>{artist.musician_name}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.playlists.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-white mb-1">Playlists</h3>
                            <div className="space-y-1">
                                {results.playlists.map((playlist) => (
                                    <Link href={`/playlist/${playlist.id}`} key={playlist.id} onClick={() => setQuery('')} className="flex items-center gap-5 text-gray-300 hover:text-white hover:bg-neutral-600 transition">
                                        <div className="w-12 h-12 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                                            <Image src={playlist.cover_image} alt={playlist.playlist_name} className="w-full h-full object-cover" width={25} height={25}/>
                                        </div>
                                        
                                        <p className='text-[18px] '>{playlist.playlist_name}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
        
        
    );
};

export default SearchBar;
