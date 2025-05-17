export type SongProps = {
    id: string;
    title: string;
    artist: {
        id: string;
        name: string;
    };
    albumArt: string;
    audioSrc: File; //audioSrc: string;
    duration?: number;

    dayAdd: string; //yyyy-mm-dd 
    views: number;
    album: {
        id: string;
        name: string;
    };
    videoSrc: File;//videoSrc: string;
    // các bài hát đơn ko có album gọi là track
};

export type Album = {
    id: string;
    albumName: string;
    coverUrl: string;
    musician: {
        id: string;
        name: string;
    };
    dayAdd?: string;
    songs?: SongProps[]; //backend trả dữ liệu bài hát về khi nhấn vào chi tiết bài hát
}

export type Playlist ={
    id: string;
    playlistName: string;
    coverUrl: string;
    description?: string;
    createdby?: string; //hiển thị user đã tạo cái playlist này hoặc khỏi hiện luôn
    dayAdd?: string;
    dayUpdate: string;
    songs?: SongProps[];
}

export type Musician = {
    id: string;
    musicianName: string;
    avatarPic: string;  //ảnh avatar
    coverPic?: string;  //ảnh bìa
	follower?: number;
	about?: string;
	socialMedia?: {
        xLink?: string;
        faceLink?: string;
        instaLink?: string;
        youtubeLink?: string;   
    }
    isVerified?: boolean;

    topSongs?: SongProps[]; //  2 cái danh sách top song và album, hoạt động như songs?: SongProps[] trên album
    albums?: Album[];   //      danh sách album của nhạc sĩ đó, để id rồi search bài hát ?
}

export type Account = {
    userName: string;
    password: string;
    email: string;
    gender: boolean;
    birthday: string;
    avatarPic: string;
    
    likedSong: string[];    // danh sách các bài hát yêu thích, trả id bài hát ["shake-it-off", "alabama-sweet-home"]
    followed: string[];     //các nhạc sĩ mà user đã nhấn theo dõi, trả id nhạc sĩ
    userPlaylist: string[];  //để id playlist mà user đã tạo
}
