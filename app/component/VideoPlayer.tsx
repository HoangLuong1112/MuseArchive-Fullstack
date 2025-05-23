'use client'

import React, { useState } from 'react'

type VideoPlayerProps = {
    videoSrc: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
    const [showVideo, setShowVideo] = useState(false);
    if (!videoSrc) return null;

    return (
        <div className="space-y-4">
            <div className='flex item-center gap-5 text-white font-semibold'>
                <button onClick={() => setShowVideo(!showVideo)} className='bg-blue-600 hover:bg-blue-700 rounded-lg transition py-2 px-4'>
                    {showVideo ? 'Ẩn video âm nhạc': 'Xem video nhạc'}
                </button>
                <div>
                    <a href={videoSrc} download className="inline-block bg-blue-600 hover:bg-blue-700 rounded-lg transition py-2 px-4 ">Tải video về</a>
                </div>
            </div>
            
            {showVideo && (
                <div className='space-y-4'>
                    <h2 className="text-xl font-semibold">Music Video</h2>
                    <video className="w-full rounded-2xl shadow-md" controls>
                        <source src={videoSrc} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                </div>
            )}
            

            
        </div>
    );
};

export default VideoPlayer;
