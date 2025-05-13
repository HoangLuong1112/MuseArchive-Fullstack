import Image from "next/image";
import Link from "next/link";

export type Banner = {
    type: string;
    coverUrl: string;
    name: string;
    description?: string;
    musician: string;
}

export default function Banner({type, coverUrl, name, description, musician}: Banner) {
    return(
        <div className='flex gap-5 p-5'>
            <Image src={coverUrl} alt='Cover' height={350} width={350} className='rounded-2xl' />
            <div className='w-full h-full bottom-0 flex flex-col'>
                <p>{type}</p>
                <p className="title">{name}</p>
                <p className='card-subtitle'>{description}</p>		
                <Link href={`/musician/${musician}`} className="font-bold hover:underline">{musician}</Link>
            </div>
        </div>
    )
}