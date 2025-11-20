import { useSpring, animated } from "@react-spring/web"
import { useEffect, useState } from "react" 
import { pageController } from "../store/pageController"
export default function Navitem({ children, hovered, sethovered, slug }) {  
    const {selected} = pageController()
    const [hover, sethover] = useState(false)
    const underline = useSpring({
        to: { width: hover ? '100%' : selected==children? '100%': '0%', opacity: hover ? 1 : selected==children? 1: 0 }
    }) 
    function navigate(){ 
        window.location.href = `/${slug}`;
    }
    useEffect(() => {
        sethover(children === hovered);
    }, [hovered, children]);  
    return (
        <div onClick={()=>{navigate()}} onMouseEnter={() => sethovered(children)} onMouseLeave={() => sethovered('')} className='h-full flex flex-col justify-center cursor-pointer xl:text-[130%] lg:text-[115%] md:text-[100%]'>
            <h1>{children}</h1>
            <div className='w-full flex flex-row justify-center'>
                <animated.div style={underline} className='w-full border'></animated.div>
            </div>
        </div>
    )
}