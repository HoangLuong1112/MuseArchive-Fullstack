export type SongProps = {
    title: string;
    artist: string;
    albumArt: string;
    audioSrc: string;
    duration?: number;
};

export type Album = {
    albumName: string;
    coverUrl: string;
    musician?: string;
    songList?: SongProps[];
}

export type Playlist ={
    playlistName: string;
    coverUrl: string;
    description?: string;
    musician?: string;
    songList?: SongProps[];
}

export type SocialMedia = {
    faceLink: string;
    instaLink: string;
    youtubeLink: string;   
}

export type Musician = {
    musicianName: string;
    avatarPic: string;
    coverPic?: string;
	follower?: number;
	about?: string;
	socialMedia?: SocialMedia;
    isVerified?: boolean;
    isFollowing?: boolean;
}

export type Account = {
    userName: string;
    password: string;
    email: string;
    gender: boolean;
    birthday: Date;
}
