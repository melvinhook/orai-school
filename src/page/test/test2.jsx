import { AiOutlineLike } from "react-icons/ai";
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
export default function Test2() {
    const [like, likeApi] = useSpring(() => ({
        from: {
            height: '50%',
            transform: 'rotate(0deg)'
        },
    }))
    function animate() {
        console.log("Clicked")
        likeApi.start({
            to: {
                height: '80%'
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
                                                height: '50%' ,
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
            <section className="h-screen w-screen flex justify-center items-center">
                <animated.div onClick={() => animate()} style={like} >
                    <AiOutlineLike className="text-blue-500 h-full w-full" />
                </animated.div>

            </section>
        </>
    )
}