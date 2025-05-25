import Link from "next/link";
import {satoshiRegular, satoshiLight} from "../components/fonts";

interface BlogCard {
    title: string,
    desc: string,
    date: string,
    slug: string
}

export default function BlogCard({title, desc, date, slug}: BlogCard) {
    return (
            <li>
                <Link href={`/blog/${slug}`}>
                    <h3 className={`${satoshiRegular.variable} font-regular mb-2`}>{title}</h3>
                    <p className={`${satoshiLight.variable} font-light text-[0.9rem]`}>{`${desc} | ${date}`}</p>
                </Link>
            </li>
        
    )
}