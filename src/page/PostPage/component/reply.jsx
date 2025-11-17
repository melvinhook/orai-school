import { animated, useSpring } from "@react-spring/web"
import { useEffect, useState } from "react"
import { pageController } from "../../../store/pageController"
import { IoMdSend } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { postApi } from "../../../store/postApi";
import { useApi } from "../../../store/useApi";
import { useQuery } from "@tanstack/react-query"; 
import loading from '../assets/bouncing-circles.svg'
export default function Reply({ comment_id }) {
    const { setSelectedIsReply, selectedIsReply, replyIsSent } = pageController()
    const { setReplyContent, replyContent, postreply } = postApi()
    const { getUser } = useApi()
    const [isReply, setIsReply] = useState(false)
    const [animCount, setAnimCount] = useState(4) 
    const replybutton = useSpring({       ///   <------ ini yang tombol
        to: { opacity: isReply ? 0 : 1 },
        onRest: () => {
            animButtonController()
        }
    })
    const replyinput = useSpring({       ///  <---- ini yang inputan
        to: { opacity: isReply ? 1 : 0 }
    }) 
    const inputUnderline=useSpring({
        to:{width:isReply?'100%':'0%'}, 
        config:{tension:120,friction:30}
    })
    const { data: userz } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    }); 
    function animButtonController() {
        if (animCount == 2) {
            console.log("animCount set to 4")
            setAnimCount(4)
        } else {
            setAnimCount(2)
        }
    }
    useEffect(() => {
        if (selectedIsReply === comment_id) {
            console.log("is empty true", comment_id)
            setIsReply(true)
        } else {
            console.log("is empty false", comment_id)
            setIsReply(false)
        }
    }, [selectedIsReply]) 
    return (
        <> 
            <img src={loading} className={`w-[3%] w-[3%] ${replyIsSent ? "" : "hidden"}`}/>
            <animated.p onClick={() => isReply ? {} : setSelectedIsReply(comment_id)} style={replybutton} className={`${isReply ? '' : 'cursor-pointer'}  text-[#3791E7] absolute z-10 ${animCount === 2 ? "hidden" : ""}`}>Reply</animated.p>
            <animated.div style={replyinput} className={`w-full mt-[1%] mt-[1%] ${replyIsSent ? "hidden" : ""}`}>
                <div className="flex flex-row w-full">
                    <div className="w-[80%]">
                        <input type="text" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} className="bg-transparent border-0 outline-none focus:outline-none focus:ring-0 shadow-none p-0 m-0" disabled={!isReply} />
                        <animated.div style={inputUnderline} className="border border-[#3791E7]"></animated.div>
                    </div>
                    <IoMdSend size={30} className="ml-[3%] text-[#3791E7] cursor-pointer" onClick={() => { postreply(comment_id, userz?.id); console.log("comment_id:", comment_id, "user_id", userz?.id) }} />
                    <IoCloseOutline size={30} className="ml-[1%] text-[#3791E7] cursor-pointer" onClick={() => setSelectedIsReply("")} />
                </div>
            </animated.div>
        </>
    )
}