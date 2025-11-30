import "./main.css"
/*-----------COMPONENT-----------------------*/
import Navigate from "../../components/navigate"
import Comment from "./component/comment"
import Content from "./component/Left-Bar/content"
import UserMenu from "./component/Left-Bar/usermenu"
/*-------------ASSET--------------------------*/
import Bg from "./assets/green.jpg"
import Upgrade from "./assets/upgrade.png"
import User from "./assets/user.png"
import Is3 from "./assets/is-3.png"
import Training from "./assets/trainingwithbundeswehr.png"
/*-----------REACT-ICON----------------------*/
import { IoEyeSharp } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
/*------------REACT-QUERY--------------------*/
import { useQuery } from '@tanstack/react-query' 
/*------------REACT-NAVIGATE-----------------*/ 
import { useNavigate } from 'react-router-dom';
/*------------ZUSTAND------------------------*/
import { postApi } from "../../store/postApi";
import { useApi } from "../../store/useApi";
import { pageController } from "../../store/pageController";
import { animated, useSpring, } from "@react-spring/web";
import { useState, useEffect } from "react";
export default function postPage() { 
    /*---------------RENDER-STATE---------------*/
    const [postPageAnimation, setPostPageAnimation] = useState(1);
    const { setSelected, LeftBarContent} = pageController()
    const { postlikes } = postApi()
    const { getpost, getUser ,setislogin , islogin} = useApi();  
    /*--------------------MISC------------------*/
    const navigate = useNavigate(); 
    /*------------------REACT-QUERY-------------*/
    const { data } = useQuery({
        queryKey: ["posts"],
        queryFn: getpost,
    });
    const { data: userz } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    }); 
    /*-----------------USE-SPRING--------------*/
    const bg = useSpring({
        from: { opacity: 0, height: "0%" },
        to: { opacity: 1, height: "13%" },
        config: { tension: 120, friction: 28 },
        onRest: () => {
            setPostPageAnimation(2)
        },
    });
    const lb = useSpring({
        to: {
            opacity: postPageAnimation > 1 ? 1 : 0,
            width: postPageAnimation > 1 ? "25%" : "0%",
        },
        config: { tension: 120, friction: 28 },
        onRest: () => {
            setPostPageAnimation(3)
        },
    })
    const mp = useSpring({
        to: { opacity: postPageAnimation > 2 ? 1 : 0 },
        config: { tension: 120, friction: 23 },
        onRest: () => {
            setPostPageAnimation(4)
        },
    })
    const rb = useSpring({
        to: {
            opacity: postPageAnimation > 3 ? 1 : 0,
            marginRight: postPageAnimation > 3 ? "0%" : "20%",
        },
        config: { tension: 120, friction: 28 },
    })  
    /*-----------------FUNCTION--------------*/
    async function backToLogin(path){ 
        if(path==="register"){
            await setislogin(true)
            navigate('/login');
        }else if(path==="login"){
            await setislogin(false) 
            navigate('/login') 
        }
       // window.location.href="/login"
    } 
    /*-----------------USE-EFFECT------------*/
    useEffect(() => {
        if (postPageAnimation === 2) {
            console.log("postPageAnimation is 2");
        }
    }, [postPageAnimation]);
    useEffect(() => {
        setSelected("Our Posts")
    }, [])
    return (
        <>
            <section className="h-screen w-[100%] text-[#2c2e30]">
                <Navigate role={"post"} />
                <animated.div style={bg} className="w-full">
                    <img src={Bg} alt="" className="h-full w-full object-cover" />
                </animated.div>
                <div className=" flex flex-row justify-between p-10 pl-[1%] bg-[#f6f8fb]">
                    {/*------------------- LEFT SIDE BAR ------------------------*/}
                    <animated.div style={lb} className="h-full w-[25%] p-[2%]">
                        <div className="mt-[20%] bg-[#fffeff] w-full h-[30%]">
                            {userz ?
                                (<>
                                    <div className="flex flex-row justify-center">
                                        <div className="xl:h-35 lg:h-25 md:h-20 xl:w-35 lg:w-25 md:w-20">
                                            {
                                                userz ?
                                                    (
                                                        <img src={userz?.img} alt="" className="h-full w-full object-cover rounded-full" />
                                                    ) :
                                                    (
                                                        <img src={User} alt="" className="h-full w-full object-cover rounded-full" />
                                                    )
                                            }

                                        </div>
                                    </div>
                                    <h1 className="font-bold text-center xl:text-[25px]">{userz?.firstname} {userz?.lastname}</h1>
                                    <UserMenu content={"Create Post"} icon={IoAddCircleOutline} />
                                    <UserMenu content={"Saved Post"} icon={FaRegBookmark} />
                                </>)
                                :
                                (<>
                                    <div className="text-center md:text-[10px] xl:text-[20px]">
                                        <h1><span onClick={()=>backToLogin('login')} className="text-[#3791E7] cursor-pointer ">Login</span> to interact.</h1>
                                        <h1>Don't have account?</h1>
                                        <h1 onClick={()=>backToLogin('register')} className="text-[#3791E7] cursor-pointer">Register</h1>
                                    </div>
                                </>)}

                            <h1 className="text-[20px] font-bold text-center mt-[15%] md:text-[15px] xl:text-[25px]">Category</h1>
                            <div className="mt-[15%] text-[#a8a9a9] md:text-[10px] xl:text-[20px]">
                                {LeftBarContent.map((x) => (
                                    <Content content={x} />
                                ))}
                            </div>
                        </div>

                        {/*
                                    <div className="mt-[20%] bg-[#fffeff] w-full h-[30%] flex justify-center items-center text-center">
                                        <div> 
                                            <h1><span className="text-[#3791E7] cursor-pointer">Login</span> to interact.</h1> 
                                            <h1>Don't have account?</h1> 
                                            <h1 className="text-[#3791E7] cursor-pointer">Register</h1>
                                        </div>
                                    </div>
                    */}
                    </animated.div>
                    {/*------------------- MENU ------------------------*/}
                    <animated.div style={mp} className=" w-[70%] relative bg-[#fffeff]  ">
                        <h1 className="font-bold xl:text-[35px] lg:text-[25px] md:text-[20px] ">Tournaments</h1>
                        <div className=" w-full xl:h-[20%] lg:h-[10%] md:h-[10%] mt-[3%]">
                            <img src={data?.cover} className="h-full w-full object-cover"></img>
                        </div>
                        <div className="pl-[10%] pr-[5%] w-full mt-3 ">
                            <div className="flex flex-row justify-between ">
                                <div className="p-3 md:p-2 bg-red-200 text-red-400 font-bold md:text-[10px] xl:text-[20px]">Tank Collection</div>
                                <div className="flex flex-row gap-4 font-bold text-[#3791E7] md:text-[10px] xl:text-[20px]">
                                    <AiOutlineLike className="hover:text-blue-200 lovess md:text-[15px] xl:text-[25px]" onClick={() => { postlikes(data?.posts.id, userz?.id); console.log("post_id", data?.posts.id, "user_id", userz?.id) }} />
                                    {data?.postlikes?.length ?? 0}
                                    <LiaCommentSolid  className="md:text-[15px] xl:text-[25px]"/>
                                    {data?.comment?.length ?? 0}

                                </div>
                            </div>
                            <h1 className="font-bold xl:text-[250%] xl:text-[200%] lg:text-[150%] md:text-[100%]"> {data?.title}</h1>
                            <h1 className="xl:text-[150%] md:text-[80%]">By: {data?.users.first_name} {data?.users.last_name}</h1>
                            <h1 className="xl:text-[100%] md:text-[80%]">{data?.created_at}</h1>
                            <p className="mt-[5%] lg:text-[100%] md:text-[80%] whitespace-pre-line"> {data?.content?.replace(/\\n/g, "\n")}</p>
                        </div>
                        <Comment />
                    </animated.div>
                    {/*------------------- RIGHT SIDE BAR ------------------------*/}
                    <animated.div style={rb} className="ml-[3%] w-[35%] ">
                        <div className="flex flex-row justify-between">
                            <h1 className="font-bold xl:text-[35px] lg:text-[25px] md:text-[20px]">Other News</h1>
                            <div className="flex flex-end font-bold mt-[8%] md:text-[10px] xl:text-[15px]">See all</div>
                        </div>
                        <div className="mt-[4%] w-full h-[1000px]  overflow-y-auto"> {/*<---- Can you Fix This one*/}
                            <div className="w-full xl:h-[30%] md:h-[15%]  pb-8 bg-[#fffeff]">
                                <div className="w-full h-[50%] md:h-[50%]">
                                    <img src={Is3} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-row justify-between pl-5 pr-5 mt-2">
                                    <div className="p-4 lg:p-2 md:p-2 bg-purple-200 text-purple-400 md:text-[10px] xl:text-[20px]">Tank Collection</div>
                                    <div className="flex flex-row gap-3 mt-3">
                                        <IoEyeSharp className="lg:text-[20px]" />
                                        <h1 className="lg:text-[15px] md:text-[10px]">2.1m</h1>
                                    </div>
                                </div>
                                <h1 className="font-bold xl:text-[25px] xl:text-[20px] lg:text-[15px] md:text-[10px] p-3">The IS-3 has arrived at Pravda. Pravda now has a beast</h1>
                            </div>
                            <div className="w-full h-[30%]  pb-8 mt-3 bg-[#fffeff]">
                                <div className="w-full h-[50%]">
                                    <img src={Training} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-row justify-between pl-5 pr-5 mt-2">
                                    <div className="p-4 md:p-2 bg-oramge-200 text-orange-400 md:text-[10px] xl:text-[20px]">Collaboration</div>
                                    <div className="flex flex-row gap-3 mt-3">
                                        <IoEyeSharp className="lg:text-[20px]" />
                                        <h1 className="lg:text-[15px] md:text-[10px]">2.1m</h1>
                                    </div>
                                </div>
                                <h1 className="font-bold xl:text-[25px] p-3 xl:text-[20px] lg:text-[15px] md:text-[10px]">Who dares to become a sigma female? We’re training with the masters of battle — the Bundeswehr</h1>
                            </div>
                            <div className="w-full xl:h-[30%]  pb-8 mt-[8%] xl:mt-[10%] bg-[#fffeff] ">
                                <div className="w-full h-[50%]">
                                    <img src={Upgrade} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-row justify-between pl-5 pr-5 mt-2">
                                    <div className="p-4 md:p-2 bg-blue-200 text-blue-400 font-bold md:text-[10px] xl:text-[20px]">Engineering</div>
                                    <div className="flex flex-row gap-3 mt-3">
                                        <IoEyeSharp className="lg:text-[20px]" />
                                        <h1 className="lg:text-[15px] md:text-[10px]">2.1m</h1>
                                    </div>
                                </div>
                                <h1 className="font-bold xl:text-[25px] xl:text-[20px] p-3 lg:text-[15px] md:text-[10px]">From Short to Sharp: Ankou’s 75mm Evolution</h1>
                            </div>
                        </div>
                    </animated.div>
                </div>
            </section>
        </>
    )
}