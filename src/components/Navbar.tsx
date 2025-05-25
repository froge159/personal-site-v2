import Image from "next/image";
import Link from "next/link";
import pfp from "../../public/images/defaultfrog 3.png";
import {motion} from "motion/react";
import {useState} from "react";
import {satoshiBold, satoshiRegular} from "../components/fonts";



export default function Navbar({ text }: { text: string; }) {
    const [isHovered, setHover] = useState<boolean>(false);

    return (
        <div className="flex w-[85vw] justify-between m-auto relative top-[40px]">
            <div className="flex">
                <Image
                    src={pfp}
                    width={60}
                    height={60}
                    alt="profile picture"
                    className = "rounded-3xl"/>
                <h3 className={`${satoshiBold.variable} font-bold ml-5 pt-5`}>froge</h3>
            </div>
            <div className="flex flex-col">
                <Link href= {text === "blog" ? `/${text}` : '/'} className={`${satoshiRegular.variable} font-normal pt-5`} onMouseEnter = {() => setHover(true)} onMouseLeave = {() => setHover(false)}>{text}</Link>
                <motion.div
                    style={{
                        marginTop: "-3px",
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'white',
                    }}

                    initial={{clipPath: "inset(0% 100% 0% 0%)"}}
                    
                    animate={{
                        clipPath: isHovered
                        ? 'inset(0% 0% 0% 0%)'
                        : 'inset(0% 100% 0% 0%)',
                    }}
                    transition={{ duration: 0.3}}
                />
            </div>
        </div>
    );
}