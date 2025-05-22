import Image from "next/image";
import Link from "next/link";

type PlaylistCardProps = {
    id: string;
    coverUrl: string;
    description?: string;
}

export default function PlaylistCard({id, coverUrl, description} : PlaylistCardProps ) {
    return (
        <Link href={`/playlist/${id}`}>
            <div className="w-[200px] h-[250px] hover:bg-zinc-950 p-2 rounded-2xl flex flex-col gap-2">
                <div className="w-full flex justify-center">
                    <Image src={coverUrl} alt={id} width={180} height={180} className="w-[180px] h-[180px] rounded-2xl object-cover" />
                </div>
                <div className="card-subtitle">
                    <p className=" line-clamp-2">{description}</p>
                </div>
            </div>
        </Link>
    )
}