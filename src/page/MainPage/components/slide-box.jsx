import { useSpring , animated } from "@react-spring/web" 
import { pageController } from "../../../store/pageController"
export default function Slidebox(){ 
    const{slide}=pageController() 
    const slider = useSpring({
        to:{marginLeft: slide == 2? '0%': slide==3?'68%':slide==1?'-70%': '0%'}
    })
    return(
      <animated.div style={slider} className='h-full w-[35%] bg-[#3791E7]'></animated.div>   
    )
}