import Logo from './assets/logo.png'
import Navitem from "./nav-item"
import { CiUser } from "react-icons/ci";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { pageController } from '../store/pageController'; 
import { useNavigate } from 'react-router-dom';
import { useApi } from '../store/useApi';
export default function Navigate({ role }) {
    const { getUser, islogin, setislogin } = useApi() 
    const { animation, setAnimation, set } = pageController() 
    const navigate = useNavigate()
    const navbaridle = useSpring({
        height: '13%',
        opacity: 1
    })
    const [navbar] = useSpring(() => ({
        from: { opacity: 0, height: '0%' },
        to: { height: role === "main" ? '13%' : '0%', opacity: role === "main" ? 1 : 0 },
        onRest: () => { role === "main" ? setAnimation(2) : console.log("") }
    }))
    const navitem = useSpring({
        to: { opacity: animation >= 2 ? 1 : 0, marginTop: animation >= 2 ? '0%' : '-4%' }, onRest: () => { setAnimation(3) }
    })
    const user = useSpring({
        to: { opacity: animation >= 3 ? 1 : 0, marginRight: animation >= 3 ? '5%' : '0%' }, onRest: () => { setAnimation(4); set(true) }
    })
    const [hovered, sethovered] = useState('')
    const logo = useSpring({
        to: { opacity: animation >= 3 ? 1 : 0, marginLeft: animation >= 3 ? '5%' : '0%' }, onRest: () => { setAnimation(4) }
    })
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    }); 
    async function backToLogin(path){
        if(path==='login'){
            await setislogin(false) 
            navigate('/login')
        }else if(path==='register'){
            await setislogin(true) 
            navigate('/login')
        }
    }
    return (
        <>
            {
                <animated.div style={role === "main" ? navbar : navbaridle} className={`w-full shadow-lg flex flex-row justify-between xl:p-5 lg:p-5 md:p-7`}>
                    <animated.img style={role === "main" ? logo : {}} src={Logo} alt="" className="lg:h-15 md:h-13 xl:h-20"/>
                    <animated.div style={role === "main" ? navitem : {}} className='flex flex-row gap-4 lg:mt-2'>
                        <Navitem hovered={hovered} sethovered={sethovered} slug={''}>Home</Navitem>
                        <Navitem hovered={hovered} sethovered={sethovered} slug={'Our-Posts'}>Our Posts</Navitem>
                        <Navitem hovered={hovered} sethovered={sethovered} slug={'Media'}>Media</Navitem>
                        <Navitem hovered={hovered} sethovered={sethovered} slug={'Events'}>Events</Navitem>
                        <Navitem hovered={hovered} sethovered={sethovered} slug={'Submission'}>Submission</Navitem>
                    </animated.div>
                    <animated.div style={role === "main" ? user : {}} className='flex justify-center items-center p-5 xl:text-[130%] md:text-[100%]'>
                        {data ? (
                            <div className="flex items-center space-x-3">
                                <div className="rounded-full h-10 w-10 bg-gray-300 overflow-hidden">
                                    {data.img ? (
                                        <img src={data.img} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <CiUser className="h-full w-full p-1" size={30} />
                                    )}
                                </div>
                                <h1>{`${data.first_name} ${data.last_name}`}</h1>
                            </div>
                        ) : (
                            <h1><span onClick={()=>backToLogin('login')} className='text-[#3791E7] cursor-pointer'>Login</span> || <span onClick={()=>backToLogin('register')} className='text-[#3791E7] cursor-pointer'>Register</span></h1>
                        )}

                    </animated.div>
                </animated.div>
            }
        </>
    )
}