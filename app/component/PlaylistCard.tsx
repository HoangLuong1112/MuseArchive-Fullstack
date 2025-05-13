import Image from "next/image";
import Link from "next/link";

type PlaylistCardProps = {
    playlistName: string;
    coverUrl: string;
    description?: string;
}

export default function PlaylistCard({playlistName, coverUrl, description} : PlaylistCardProps ) {
    return (
        <Link href={`/playlist/${playlistName}`}>
            <div className="w-[200px] h-[250px] hover:bg-zinc-800 p-2 rounded-2xl flex flex-col gap-2">
                <div className="w-full flex justify-center">
                    <Image src={coverUrl} alt={playlistName} width={180} height={180} className="rounded-2xl" />
                </div>
                <div className="card-subtitle">
                    <p className=" line-clamp-2">{description}</p>
                </div>
            </div>
        </Link>
    )
}