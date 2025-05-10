import { Playlist } from "@/types/song";
import Image from "next/image";
import Link from "next/link";

export default function PlaylistCard( props : Playlist ) {
    return (
        <Link href={`/playlist/${props.playlistName}`}>
            <div className="bg-amber-300 p-2">
                <Image src={props.coverUrl} alt={props.playlistName} width={120} height={120} />
                <div>{props.description}</div>
            </div>
        </Link>
    )
}