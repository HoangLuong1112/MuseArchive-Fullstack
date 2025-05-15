export type SongProps = {
    id: string;
    title: string;
    artist: {
        id: string;
        name: string;
    };
    albumArt: string;
    audioSrc: string;
    duration?: number;

    dayAdd: string;
    views: number;
    album: {
        id: string;
        name: string;
    };
    videoSrc: string;
    // các bài hát đơn ko có album gọi là track
    // làm lại DATA, có thêm id cho data, thử gộp DATA từng loại thành từng file DATA khác nhau coi nó chạy được không !!!!!
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
    songList?: string[]; //chỉ để lưu id bài hát
    songs?: SongProps[]; // trường này ko lưu dữ liệu sẵn (trong data của album sẽ ko có sẵn, chỉ khi qua trang bên trong playlist nó lấy danh sách từ songList nạp từ [id] qua)
}

export type Playlist ={
    id: string;
    playlistName: string;
    coverUrl: string;
    description?: string;
    createdby?: string; //hiển thị user đã tạo cái playlist này hoặc khỏi hiện luôn
    dayAdd?: string;
    songList?: string[];
    songs?: SongProps[];
}

export type Musician = {
    id: string;
    musicianName: string;
    avatarPic: string;
    coverPic?: string;
	follower?: number;
	about?: string;
	socialMedia?: {
        xLink?: string;
        faceLink?: string;
        instaLink?: string;
        youtubeLink?: string;   
    }
    isVerified?: boolean;

    // 2 cái danh sách top song và album, hoạt động như songs?: SongProps[] trên album
    topSongs?: SongProps[];
    albums?: Album[];   //danh sách album của nhạc sĩ đó
}

export type Account = {
    userName: string;
    password: string;
    email: string;
    gender: boolean;
    birthday: string;
    avatarPic: string;
    
    likedSong: string[]; //["shake-it-off", "alabama-sweet-home"]
    followed: string[];    //các nhạc sĩ mà user đã nhấn theo dõi
    userPlaylist: string[];  //để id các playlist mà user đã tại
}
