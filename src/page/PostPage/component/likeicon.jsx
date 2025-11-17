import { AiOutlineLike } from "react-icons/ai";
import { animated, useSpring } from "@react-spring/web";
export default function Likeicon({clicked}) {
    const [like, likeApi] = useSpring(() => ({
        from: {
            height: '10%',
            transform: 'rotate(0deg)'
        },
    }))
    function animate() {
        console.log("Clicked")
        likeApi.start({
            to: {
                height: '15%'
            },
            config: { duration: 100 },
            onRest: () => {
                likeApi.start({
                    to: {
                        transform: 'rotate(12deg)'
                    },
                    config: { duration: 50 },
                    onRest: () => {
                        likeApi.start({
                            to: {
                                transform: 'rotate(-12deg)'
                            },
                            config: { duration: 50 },
                            onRest: () => {
                                likeApi.start({
                                    to: {
                                        transform: 'rotate(12deg)'
                                    },
                                    onRest: () => {
                                        likeApi.start({
                                            to: {
                                                height: '10%',
                                                transform: 'rotate(0deg)'
                                            },
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    return (
        <>
            <animated.div onClick={() => animate()} style={like} >
                <AiOutlineLike className="text-blue-500 h-100 w-100" />
            </animated.div>
        </>
    )
}