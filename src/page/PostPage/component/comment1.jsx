
import { postApi } from "../../../store/postApi"
import { useQuery } from '@tanstack/react-query'
import { useApi } from "../../../store/useApi"
import { AiOutlineLike } from "react-icons/ai";  

import Reply from "./reply";
export default function Comment1() {
    const { getUser } = useApi()
    const {  replylikes, getcomment } = postApi()
    const { data } = useQuery({
        queryKey: ["content"],
        queryFn: getcomment,
    });
    const { data: userz } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    }); 
    return (
        <>
            {/*<----------------COMMENT SECTION--------------------->*/}
            {data?.comment?.map((x) => (
                <div className="w-full flex flex-row p-5">
                    <img src={x.users.profile_photos} className="xl:h-10 md:h-8 xl:w-10 md:w-8  rounded-full"></img>
                    <div className="pl-[3%] w-full">
                        <h1 className="text-[130%] font-bold">{x.users.first_name} {x.users.last_name}</h1>
                        <div className="flex flex-row justify-between  -green-500">
                            <p className="mt-[1%]">{x.content}</p>
                            <div className="flex flex-row text-[#3791E7]  -blue-500">
                                <AiOutlineLike className="h-full md:text-[15px] xl:text-[20px]  hover:text-blue-200 lovess" onClick={() => { replylikes(y.id, userz.id); console.log("reply_id:", y.id, "user_id", userz.id) }} />
                                {x?.commentlikes?.length > 0 ? x?.commentlikes?.length : ""}
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
                                        <div className="flex flex-row cursor-pointer">
                                            <AiOutlineLike  className="h-[25%] te hover:text-blue-200 lovess" onClick={() => { replylikes(y.id, userz.id); console.log("reply_id:", y.id, "user_id", userz.id) }} />
                                            {y?.replylikes?.length > 0 ? y?.replylikes?.length : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </>
    )
}