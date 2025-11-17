import { IoMdSend } from "react-icons/io";
import { postApi } from "../../../store/postApi"
import { useQuery } from '@tanstack/react-query'
import { useApi } from "../../../store/useApi" 
import { useNavigate } from "react-router-dom";
import Comment2 from "./comment2";
import Comment1 from "./comment1";
import { animated, useSpring } from "@react-spring/web";
import loading from "../assets/bouncing-circles.svg"
export default function Comment() {
    const { getpost, getUser, setislogin, islogin} = useApi()
    const { content, setContent, postcomment, commentIsLoading, id} = postApi() 
    const navigate = useNavigate()
    const { data } = useQuery({
        queryKey: ["posts"],
        queryFn: getpost,
    });
    const { data: userz } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });
    const loadingz = useSpring({
        to: { opacity: commentIsLoading ? 1 : 0 }
    })
    const input = useSpring({
        to: { opacity: commentIsLoading ? 0 : 1 }
    }) 
    async function backToLogin(path){
        if(path==='register'){
            setislogin(true) 
            await navigate('/login')
        }else if(path==='login'){
            setislogin(false) 
            await navigate('/login')
        }
    }
    return (
        <>
            <div className="mt-[5%] pl-[3%] absolute w-full h-[70%] overflow-y-scroll">
                {/*<----------------COMMENT EDITOR--------------------->*/}
                <div className="w-full flex flex-row p-4 justify-center gap-4 mt-[2%] shadow shadow-lg">
                    {userz ? (
                        <>
                            <img src={userz?.profile_photo} alt="" className="h-15 w-15 rounded-full object-cover" />
                            <div className="p-2 pb-5 pt-2 w-[80%]">
                                <animated.img style={loadingz} src={loading} className="w-[3%] h-[3%] absolute" />
                                <animated.input style={input} type="text" value={content} onChange={(e) => { setContent(e.target.value) }} className="w-full h-full p-3 rounded-lg focus:outline-none" placeholder="Add comment" />
                            </div>
                            <div className="h-15 flex flex-col justify-center">
                                <IoMdSend onClick={() => {
                                    console.log("sending comment:", {
                                        post_id: data?.posts?.[0]?.id,
                                        user_id: userz?.id,
                                        content,
                                    });
                                    postcomment(id, userz?.id);
                                }} className="text-blue-400" size={30} />
                            </div>
                        </>
                    ) : (
                        <> 
                            <div className="flex justify-center items-center text-center md:text-[10px] xl:text-[20px]"> 
                                <div>
                                    <h1><span onClick={()=>backToLogin('login')} className="text-[#3791E7] cursor-pointer">Login</span> to interact</h1> 
                                    <h1>Don't have account?</h1> 
                                    <h1 onClick={()=>backToLogin('register')} className="text-[#3791E7] cursor-pointer">Register</h1>
                                </div>
                            </div>
                        </>
                    )}

                </div>
                <div className="w-full h-full  flex flex-col p-4  gap-4  md:text-[10px] xl:text-[15px]">
                    {/*<----------------COMMENT SECTION--------------------->*/}
                    <Comment2 />
                    <Comment1 />
                </div>
            </div>
        </>
    )
}