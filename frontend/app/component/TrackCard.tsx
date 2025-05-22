import Image from "next/image";
import Link from "next/link";

type TrackCardProps = {
    id: string;
    trackName: string;
    coverUrl: string;
}

export default function TrackCard({id, trackName, coverUrl} : TrackCardProps ) {
    return (
        <Link href={`/track/${id}`}>
            <div className="w-[200px] h-[250px] hover:bg-zinc-950 p-2 rounded-2xl flex flex-col gap-2">
                <div className="w-full flex justify-center">
                    <Image src={coverUrl} alt={trackName} width={180} height={180} className="w-[180px] h-[180px] rounded-2xl object-cover" />
                </div>
                <div>
                    <p className="card-title">{trackName}</p>
                </div>
            </div>
        </Link>
    )
}