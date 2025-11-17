import { animated, useSpring } from "@react-spring/web"
import { useEffect, useState } from "react"
export default function UserMenu({ content , icon}) {
    const [hover, setHover] = useState('')
    const [container, containerApi] = useSpring(() => ({
        from: {    
            color:'#2c2e30',
        }
    }))
    useEffect(() => {
        if (content == hover) {
            containerApi.start({
                to: {
                    color: '#3791E7', 
                  
                }
            })
        } else {
        containerApi.start({
            to:{
               
                color:'#2c2e30',
            }
        })
        }

    }, [hover, container]) 
    const Icon = icon
    return (
        <>
            <animated.div style={container} onMouseEnter={() => setHover(content)} onMouseLeave={() => setHover('')} onClick={()=>alert('Content Not Available || Under Development ~ Dev ~')} className="flex flex-row mt-[2%] cursor-pointer xl:text-[20px] lg:text-[15px] md:text-[10px]">
                <Icon className="mt-[2%]" />
                <h1 className="ml-[2%] ">{content}</h1>
            </animated.div>
        </>
    )
}