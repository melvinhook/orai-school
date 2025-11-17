import { useEffect } from "react"
import { pageController } from "../../../store/pageController"
import Tank from '../assets/tank.png' 
import { useSpring, animated } from "@react-spring/web" 
import { useApi } from "../../../store/useApi" 
export default function registerCompleted() {
    const { isRegisteredNotification , setIsRegisteredNotification} = pageController()     
    const {setislogin, setiscompleteaccountphase} = useApi()
    const [divz, divzapi]=useSpring(()=>({ 
        from:{
            opacity: 0
        },
    }))  
   useEffect(() => {
    if (isRegisteredNotification) {
        divzapi.start({
            to: { 
                opacity: 1 
            },
            delay: 4000,
            onRest: () => {  
                setiscompleteaccountphase(3)
                setIsRegisteredNotification(false)
                setislogin(false) 
                divzapi.start({
                    to:{
                        opacity: 0
                    }
                })
            }
        })
    }
}, [isRegisteredNotification])

    return (
        <>
            {
                isRegisteredNotification &&
                (
                    <animated.div style={divz} className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Background overlay (behind modal) */}
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        {/* Modal content (above overlay) */}
                        <div className="relative z-10 h-[20%] w-[20%] bg-white flex flex-col items-center justify-center text-center rounded-lg shadow-lg ">
                            <img src={Tank} className="w-[15%] h-[25%] " alt="tank" />
                            <h1 className="font-bold text-[25px]">Registered Successfully</h1>
                            <p>Now log into your account</p>
                        </div>
                    </animated.div>
                )
            }

        </>
    )
}