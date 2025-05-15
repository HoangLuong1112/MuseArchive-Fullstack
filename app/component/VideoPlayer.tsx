'use client'

import React from 'react'

type VideoPlayerProps = {
    videoSrc: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
    if (!videoSrc) return null;

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Music Video</h2>
            <video className="w-full rounded-2xl shadow-md" controls>
                <source src={videoSrc} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
            </video>

            {/* <div>
                <a href={videoSrc} download className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                    Tải video về
                </a>
            </div> */}
        </div>
    );
};

export default VideoPlayer;
