import Image from "next/image";
import Link from "next/link";

export type Banner = {
    type: string;
    coverUrl: string;
    name: string;
    description?: string;
    musician?: {
        id: string;
        name: string;
    };
    createdBy?: string;
    numberofsong?: number;
    duration: string;
    dayAdd?: string;
    views?: number;
    album?: {
        id: string;
        name: string;
    }
}

export default function Banner({type, coverUrl, name, description, musician, createdBy, dayAdd, numberofsong, duration, views, album}: Banner) {
    const year= dayAdd?.split('-')[0];

    return(
        <div className='flex gap-5 p-5 h-[300px]' 
            style={{
                backgroundImage: `url('${coverUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <Image src={coverUrl} alt='Cover' height={350} width={350} className='rounded-2xl' />
            <div className='w-full h-full bottom-0 flex flex-col gap-3 justify-end'>
                <p>{type}</p>
                <p className="title">{name}</p>
                <p className='card-subtitle'>{description}</p>	
                <div>
                    <Link href={`/musician/${musician?.id}`} className="font-bold hover:underline">{musician?.name}</Link>
                    {createdBy && (
                        <span className="text-gray-300 hover:underline">Tạo bởi {createdBy}</span>
                    )}
                    {album &&(
                        <span className="before:content-['•'] before:mx-2">
                            <Link href={`/album/${album.id}`} className="text-gray-300 hover:underline">{album.name}</Link>
                        </span>
                    )}
                    {dayAdd &&(
                        <span title={dayAdd} className="before:content-['•'] before:mx-2 text-gray-300">{year}</span>
                    )}
                    { numberofsong && (
                        <span className="before:content-['•'] before:mx-2 text-gray-300">{numberofsong} bài hát</span>
                    )}
                    <span className="before:content-['•'] before:mx-2 text-gray-300">{duration}</span>
                    { views && (
                        <span title="Lượt xem" className="before:content-['•'] before:mx-2 text-gray-300">{views}</span>
                    )}
                </div>
            </div>
        </div>


    )
}