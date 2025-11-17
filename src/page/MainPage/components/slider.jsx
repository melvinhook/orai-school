import { pageController } from "../../../store/pageController" 
import { useSpring, animated } from "@react-spring/web"
export default function Slider({slides, children}){ 
    const{setSlide , slide}=pageController() 
    const color = useSpring({
        to:{color: slide==slides? '#FFFFFF':'#000000'}
    })
    return( 
            <animated.div style={color} onMouseEnter={()=>{setSlide(slides)}} className='h-full w-[35%] p-10 text-white'>{children}</animated.div> 
    )
}