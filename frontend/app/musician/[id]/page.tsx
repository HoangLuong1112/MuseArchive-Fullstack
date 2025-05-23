'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Musician, SongProps, SongPropsFromJSON } from '@/types/song_final'
import Image from 'next/image'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaCheck, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import SongList from '@/app/component/SongList'
import Carousel from '@/app/component/Carousel'
import AlbumCard from '@/app/component/AlbumCard'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'


export default function MusicianDetail() {
    const { id } = useParams();           //Dùng useParams() để lấy id từ URL: ví dụ /playlist/1 → id = '1'
    const { currentUser,getAccessToken } = useAuth();
    const [musician, setMusician] = useState<Musician | null>(null);
    const [activeTab, setActiveTab] = useState<'popular' | 'albums'>('popular');
    const [isFollowing, setIsFollowing] = useState(false);

    const [localFollowers, setLocalFollowers] = useState(0);
    const [topSongs, setTopSongs] = useState<SongProps[]>([]);

    useEffect(() => {
        const fetchMusicianDetail = async () => {
            const token = await getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                //lấy thông tin chi tiết nhạc sĩ
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/musicians/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!res.ok) {
                    console.error('Failed to fetch musician detail');
                    return;
                }
                const data = await res.json();
                console.log('Chi tiết nhạc sĩ: ', data);

                //chuyển đổi sang type Musician
                const formattedData: Musician = {
                    id: data.id,
                    musicianName: data.musician_name,
                    avatarPic: data.avatar_pic,
                    coverPic: data.cover_pic,
                    follower: data.number_of_follower,
                    about: data.about,
                    socialMedia: {
                        xLink: data.social_media.xLink,
                        faceLink: data.social_media.faceLink,
                        instaLink: data.social_media.instaLink,
                        youtubeLink: data.social_media.youtubeLink, 
                    }, 
                    isVerified: data.is_verified,
                    isFollowed: data.is_followed,
                    topSongs: [],
                    albums: [],
                }
                setIsFollowing(data.is_followed);
                setLocalFollowers(data.number_of_follower);
                setMusician(formattedData);
            } catch (err) {
                console.error('Error fetching musicians: ', err);
            }
        };
        fetchMusicianDetail();
    }, [getAccessToken, id])

    useEffect(()=> {
        const fetchMusicianTopSongs = async () => {
            const token = await getAccessToken();
            if (!token) {
                console.warn('Không tìm thấy access token');
                return;
            }

            try {
                //lấy thông tin 
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/songs/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if(!res.ok) {
                    console.error('Failed to fetch song detail - Musician');
                    return;
                }
                const data = await res.json();
                console.log('Trả về danh sách bài hát: ', data);

                //lấy danh sách bài từ json
                const songlistfromjson: SongProps[] = data.map((item: SongPropsFromJSON) => ({
                    id: item.id,
                    title: item.title,
                    artist: {
                        id: item.musicians[0].id,
                        name: item.musicians[0].musician_name,
                    },
                    albumArt: item.albumArt,
                    duration: item.duration,
                    dayAdd: item.day_add,
                    views: item.views,
                    album: {
                        id: item.album?.id,
                        name: item.album?.album_name,
                    },
                }))



                let topSongs: SongProps[] = [];
                //lọc ra danh sách bài hát của nhạc sĩ
                topSongs = songlistfromjson.filter((song: SongProps) => song.artist.id === musician?.id);
                //sắp sếp theo views
                topSongs.sort((a: SongProps, b: SongProps) => b.views - a.views);
                //lấy 10 bài đầu
                topSongs = topSongs.slice(0, 10);
                setTopSongs(topSongs);

                

            } catch (err) {
                console.error('Error fetching songs list: ', err);
            }
        };
        fetchMusicianTopSongs();
    })
    

    // hàm theo dõi, làm tạm cập nhập follower
    const toggleFollow = async () => {
        try {
            const token = await getAccessToken();
            const url = `${process.env.NEXT_PUBLIC_API_URL}api/musicians/${musician?.id}/${isFollowing ? 'unfollow':'follow'}/`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: currentUser?.id }),
            })
            if (!res.ok) throw new Error(`Lỗi khi ${isFollowing ? 'theo dõi' : 'huỷ theo dõi'}`);

            setIsFollowing(!isFollowing);
            setLocalFollowers(prev => isFollowing ? prev - 1 : prev + 1);
                
        } catch (err) {
            console.error('Lỗi khi nhấn theo dõi:', err);
            alert('Có lỗi khi nhấn theo dõi');
        }
    }

    if (!musician) return <div className="p-4">Đang tải...</div>

    return (
        <div className="text-white min-h-screen rounded-lg">
            {/* Header với ảnh cover */}
            <div className="relative rounded-lg">
                <div className="h-64 w-full bg-gradient-to-b from-purple-900 to-black rounded-lg"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${musician.coverPic})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    <div className="absolute bottom-0 left-0 p-6 flex items-end gap-6">
                        <Image src={musician.avatarPic} alt={musician.musicianName} width={50} height={50} unoptimized
                            className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-black" />
                        <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <h1 className="text-5xl font-bold">{musician.musicianName}</h1>
                                {musician.isVerified && (
                                    <span className="bg-blue-500 text-white text-xs px-1 rounded-full">
                                        <FaCheck className="inline" />
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-1">
                                    <BsFillPeopleFill />
                                    {/* <span>{musician.follower} follower</span> */}
                                    <span>{localFollowers} follower</span>
                                </div>
                                <button onClick={toggleFollow} className={`px-4 py-1 rounded-full font-semibold ${isFollowing ? 'bg-white text-black' : 'bg-transparent border border-white'}`}>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nội dung chính */}
            <div className="p-6 bg-gradient-to-b from-black-500 to-gray-900 px-8  rounded-lg">
                {/* Tab điều hướng */}
                <div className="flex gap-6 border-b border-gray-800 mb-6">
                    <button onClick={() => setActiveTab('popular')} className={`pb-2 ${activeTab === 'popular' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}>
                        Popular
                    </button>
                    <button onClick={() => setActiveTab('albums')} className={`pb-2 ${activeTab === 'albums' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}>
                        Albums
                    </button>
                </div>

                {/* Nội dung tab */}
                {activeTab === 'popular' ? (
                    <div>
                        <div className='flex gap-10 items-center mb-6'>
                            <span className='text-4xl font-bold'>Các bài hát phổ biến</span>
                        </div>
                        {/* Danh sách bài hát phổ biến */}
                        <SongList songlist={topSongs} />
                    </div>
                ) : (
                    <div>
                        {/* Danh sách album */}
                        <Carousel title={`Các album của ${musician.musicianName}`} items={musician.albums ?? []} renderItem={(al, i) => (
                            <AlbumCard key={i} id={al.id} albumName={al.albumName} coverUrl={al.coverUrl} musician={al.musician}/>
                        )}/>
                    </div>
                )}

                {/* Giới thiệu nghệ sĩ */}
                <div className="mt-12 flex flex-col gap-5   ">
                    <h2 className="text-2xl font-bold">About</h2>
                    <p className="text-gray-300 max-w-3xl">{musician.about}</p>
                    <div className='flex gap-5 items-center'>
                        {musician.socialMedia?.xLink && (
                            <Link href={musician.socialMedia.xLink}><FaTwitter size={24} /></Link>
                        )}
                        {musician.socialMedia?.faceLink && (
                            <Link href={musician.socialMedia.faceLink}><FaFacebook size={24} /></Link>
                        )}
                        {musician.socialMedia?.instaLink && (
                            <Link href={musician.socialMedia.instaLink}><FaInstagram size={30} /></Link>
                        )}
                        {musician.socialMedia?.youtubeLink && (
                            <Link href={musician.socialMedia.youtubeLink}><FaYoutube size={30} /></Link>
                        )}
                    </div>
                </div>

                
            </div>

        </div>
    )
}
