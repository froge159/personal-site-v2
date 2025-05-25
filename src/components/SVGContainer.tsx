import {motion} from "motion/react";

interface SVGContainer {
    link: string;
    index: number;
    color: string;
    handleInside: (i:number) => void;
    checkInside: boolean[];
    children: React.ReactNode;
}

export default function SVGContainer({link, index, color, handleInside, checkInside, children} : SVGContainer) {
    return (
        <motion.a
            href={link}
            onMouseEnter={() => handleInside(index)} 
            onMouseLeave={() => handleInside(index)}  
            animate={checkInside[index] ? {boxShadow: `0px 0px 60px 0px ${color}`} : {boxShadow: 'none'}} 
            transition={{duration:0.4, ease:"easeInOut"}}
            className="rounded-full"
            target="_blank">
            {children}
        </motion.a>
    )
}