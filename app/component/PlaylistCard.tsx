import { Playlist } from "@/types/song";
import Image from "next/image";
import Link from "next/link";

export default function PlaylistCard( props : Playlist ) {
    return (
        <Link href={`/playlist/${props.playlistName}`}>
            <div className="w-[200px] h-[250px] hover:bg-zinc-800 p-2 rounded-2xl flex flex-col gap-2">
                <div className="w-full flex justify-center">
                    <Image src={props.coverUrl} alt={props.playlistName} width={180} height={180} className="rounded-2xl" />
                </div>
                <div className="card-subtitle">
                    <p className=" line-clamp-2">{props.description}</p>
                </div>
            </div>
        </Link>
    )
}