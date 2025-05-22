import { Album } from "@/types/song";
import Image from "next/image";
import Link from "next/link";

export default function AlbumCard( props : Album ) {
    return (
        <Link href={`/album/${props.id}`}>
            <div className="w-[200px] h-[250px] hover:bg-zinc-950 p-2 rounded-2xl flex flex-col gap-2">
                <div className="w-full flex justify-center">
                    <Image src={props.coverUrl} alt={props.albumName} width={180} height={180} className="w-[180px] h-[180px] rounded-2xl object-cover" />
                </div>
                <div>
                    <p className="card-title">{props.albumName}</p>
                    <p className="card-subtitle">{props.musician.name}</p>
                </div>
            </div>
        </Link>
    )
}