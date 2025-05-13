import Image from "next/image";
import Link from "next/link";

type TrackCardProps = {
    trackName: string;
    coverUrl: string;
    description?: string;
}

export default function TrackCard({trackName, coverUrl} : TrackCardProps ) {
    return (
        <Link href={`/track/${trackName}`}>
            <div className="w-[200px] h-[250px] hover:bg-zinc-800 p-2 rounded-2xl flex flex-col gap-2">
                <div className="w-full flex justify-center">
                    <Image src={coverUrl} alt={trackName} width={180} height={180} className="rounded-2xl" />
                </div>
                <div>
                    <p className="card-title">{trackName}</p>
                </div>
            </div>
        </Link>
    )
}