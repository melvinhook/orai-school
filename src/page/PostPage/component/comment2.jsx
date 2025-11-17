import { postApi } from "../../../store/postApi"
import { useQuery } from '@tanstack/react-query'
import { useApi } from "../../../store/useApi"
import { AiOutlineLike } from "react-icons/ai"; 
import { animated , useSpring } from "@react-spring/web";
import Reply from "./reply";
import { useEffect } from "react";
export default function Comment2() {
    const {  getUser } = useApi()
    const { commentlikes, replylikes, getcomment} = postApi()
    const { data } = useQuery({
        queryKey: ["content"],
        queryFn: getcomment,
        refetchInterval: 3000,
    });
    const { data: userz } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });  
    const [container,containerApi]=useSpring(()=>({
        opacity:1,  
        width: '100%', 
    })) 
    useEffect(()=>{
        if(data?.new_ids.length > 0){ 
            containerApi.start({ 
                from:{
                    opacity:0,  
                    width: '0%'
                },
                to:{
                    opacity:1 , 
                    width: '100%'
                }
            })
        }
    },[data?.new_ids,containerApi]) 
    if (!data?.new_ids || data.new_ids.length === 0) return null;
    return (
        <>              
                    {/*<----------------COMMENT SECTION--------------------->*/}
                    {data?.new_ids?.map((x) => (
                        <animated.div style={container} className=" flex flex-row p-5 "> 
                            <img src={x.users.profile_photos} className="h-10 md:h-8 w-10 md:w-8 rounded-full"></img>
                            <div className="pl-[3%] w-full">
                                <h1 className="text-[130%] font-bold">{x.users.first_name} {x.users.last_name}</h1>
                                <div className="flex flex-row justify-between">
                                    <p className="mt-[1%]">{x.content}</p>
                                    <div className="flex flex-row text-[#3791E7]">
                                        <AiOutlineLike className="ml-[1%] md:text-[15px] hover:text-blue-200 lovess cursor-pointer" onClick={()=>commentlikes(x.id,userz.id)}/>
                                        {x?.commentlikes?.length>0 ? x?.commentlikes?.length : ""}
                                    </div>
                                </div>
                                <div className="mt-[1%]">
                                    <Reply comment_id={x.id} />
                                </div>
                                {x.reply?.map((y) => (
                                    <div className="ml-[5%] pt-[5%] flex flex-row">
                                        <img src={y.users.profile_photos} className="h-10 w-10 rounded-full"></img>
                                        <div className="pl-[3%] w-full">
                                            <h1 className="text-[130%] font-bold">{y.users.first_name} {y.users.last_name}</h1>
                                            <p className="mt-[1%]">{y.content}</p>
                                            <div className="w-full flex flex-row justify-between text-[#3791E7] pr-[5%] cursor-pointer">
                                                <p className="cursor-pointer">Reply</p>
                                                <div className="flex flex-row cursor-pointer">
                                                    <AiOutlineLike size={25} className="hover:text-blue-200 lovess" onClick={()=>{replylikes(y.id,userz.id);console.log("reply_id:",y.id,"user_id",userz.id)}}/>
                                                    {y?.replylikes?.length>0 ? y?.replylikes?.length : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>



                        

                        </animated.div>
                    ))}
             
        </>
    )
}