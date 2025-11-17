import { animated, useSpring } from "@react-spring/web"
import { useEffect, useState } from "react"

export default function Content({ content }) {
    const [hover, setHover] = useState('')
    const [text, textApi] = useSpring(() => ({
        from: {
            color: '#a8a9a9',
            marginLeft: '0%'
        }
    }))
    useEffect(() => {
        if (hover == content) {
            textApi.start({
                to: {
                    color: '#00AEFF',
                    marginLeft: '5%'
                }
            })
        } else {
            textApi.start({
                to: {
                    color: '#a8a9a9',
                    marginLeft: '0%'
                }
            })
        }
    }, [hover, text])
    return (
        <>
            <animated.h1 className="cursor-pointer" onMouseEnter={() => setHover(content)} onMouseLeave={() => setHover('')} style={text}>{content}</animated.h1>
        </>
    )
}