"use client"
import {motion} from "motion/react";
import Link from "next/link";
import { useState } from "react";
import {satoshiBold, satoshiLight} from "../components/fonts";

interface Article {
    title: string;
	pub_date: string;
    body: string;
}

export default function BlogPageContent({article} : {article: Article}){ 
    const [isHovered, setHover] = useState<boolean[]>([false, false]);
    
    
    function onInside(i: number) {
		const newIsHover = [...isHovered];
		newIsHover[i] = !newIsHover[i];
		setHover(newIsHover);
	}

    return (
        <motion.div initial={{opacity: 0}}
		animate={{opacity: 1}}
		exit={{opacity: 0}}
		transition={{duration: 0.3}}>
            <div className="flex w-[180px] justify-between relative top-[60px] ml-auto mr-[144px]">
                <div>
                    <Link href="/" onMouseEnter={() => onInside(0)} onMouseLeave={() => onInside(0)}>home</Link>
                    <motion.div
                        style={{
                            marginTop: "-3px",
                            width: '100%',
                            height: '1px',
                            backgroundColor: 'white',
                        }}
                        initial={{clipPath: "inset(0% 100% 0% 0%"}}
                        animate={{
                            clipPath: isHovered[0]
                                ? 'inset(0% 0% 0% 0%)'
                                : 'inset(0% 100% 0% 0%)',
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div>
                    <Link href="/blog" onMouseEnter={() => onInside(1)} onMouseLeave={() => onInside(1)}>blog</Link>
                    <motion.div
                        style={{
                            marginTop: "-3px",
                            width: '100%',
                            height: '1px',
                            backgroundColor: 'white',
                        }}
                        initial={{clipPath: "inset(0% 100% 0% 0%"}}
                        animate={{
                            clipPath: isHovered[1]
                                ? 'inset(0% 0% 0% 0%)'
                                : 'inset(0% 100% 0% 0%)',
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
            <div className= "m-auto w-[670px] mt-32 text-container">
                <h1 className={`${satoshiBold.variable} font-bold text-[30px]`}>{article.title}</h1>
                <p className={`${satoshiLight.variable} font-light mb-10`}>{article.pub_date}</p>
                <section className="mb-20 article-text" dangerouslySetInnerHTML={{ __html: article.body }}/>
            </div>
        </motion.div>
    )
}