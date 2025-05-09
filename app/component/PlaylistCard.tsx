import { Playlist } from "@/types/song";
import Image from "next/image";

export default function PlaylistCard( props : Playlist ) {
    return (
        <div className="bg-amber-300 p-2">
            <Image src={props.coverUrl} alt={props.playlistName} width={120} height={120} />
        </div>
    )
}