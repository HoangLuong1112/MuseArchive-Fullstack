export type SongProps = {
    title: string;
    artist: string;
    albumArt: string;
    audioSrc: string;
};

export type Album = {
    albumName: string;
    coverUrl: string;
    musician: string;
    songslist: SongProps[];
}

export type Playlist ={
    playlistName: string;
    coverUrl: string;
    description?: string;
    musician?: string;
    songList?: SongProps[];
}

export type SocialMedia = {
    facebook: string;
    insta: string;
    youtube: string;   
}

export type Mucician = {
    musicianName: string;
	follower : number;
	introduce : string;
	socialMedia?: SocialMedia;
}

export type Account = {
    userName: string;
    password: string;
    email: string;
    gender: boolean;
    birthday: Date;
}
