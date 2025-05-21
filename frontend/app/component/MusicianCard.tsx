import { Musician } from "@/types/song";
import Image from "next/image";
import Link from "next/link";

export default function MusicianCard( props : Musician ) {
    return (
        <Link href={`/musician/${props.id}`}>
            <div className="w-[200px] h-[250px] hover:bg-zinc-800 p-2 rounded-2xl flex flex-col gap-2">
                <div className="w-full flex justify-center">
                    <Image src={props.avatarPic} alt={props.musicianName} width={180} height={180} className="w-[180px] h-[180px] rounded-full object-cover" />
                </div>
                <div className="card-title">
                    {props.musicianName}
                </div>
            </div>
        </Link>
    )
}