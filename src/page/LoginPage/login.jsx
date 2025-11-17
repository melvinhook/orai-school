import { useApi } from '../../store/useApi'
import Slide from './components/slide'
import Register from "./components/register";
import LoginR from "./components/login";
import CompleteAccount from './components/completeAccount';
import RegisterCompleted from './components/registerCompleted'; 
import Sakura from './assets/sakura.png'
import { useSpring, animated } from '@react-spring/web';
import './login.css'
import { useEffect } from 'react';
export default function Login() {
    const {
        setislogin,
        islogin,
        isloggedin,
        setiswelcome,
        iswelcome,
    } = useApi()
    const [welcome, welcomeapi] = useSpring(() => ({
        from: { opacity: 0 }
    }))
    const [animsection, sectionapi] = useSpring(() => ({
        from: { opacity: 1 }
    }))
    const divs = useSpring({
        to: {
            opacity: isloggedin ? 0 : 1
        },
        onRest: () => {
            setiswelcome(true)
            welcomeapi.start({
                to: {
                    opacity: 1
                },
                onRest: () => {
                    setTimeout(() => {
                        sectionapi.start({
                            to: {
                                opacity: 0
                            },
                            onRest: () => {
                                window.location.href = "/Home";
                            }
                        })
                    }, 4000);
                },

            })
        }
    }) 
    useEffect(()=>{
        console.log("SO IT WILL BE",islogin)
    },[])
    return (
        <>
            <animated.section style={animsection} className="relative h-screen w-screen flex justify-center items-center bg-blue-200">
                <RegisterCompleted />  
                <div className='h-screen w-screen flex justify-center items-center absolute'>
                    <div className={`rounded-lg h-[65%] w-[50%]  ${iswelcome ? "flex justify-center items-center" : ""} shadow-lg bg-white relative `}>
                        <animated.div style={welcome} className={`${iswelcome ? "" : "hidden"} `}>
                            <h1 className='text-[50px] '>いらっしゃいませ</h1>
                            <h1 className='italic text-center'>You are logged in!</h1>
                        </animated.div>
                        <animated.div style={divs} className={iswelcome ? "hidden" : ""}>
                            <Slide isLogin={islogin} setislogin={setislogin} />
                            <div className='h-full w-[90%] flex flex-row justify-between'>
                                <div className='p-7 '>
                                    <Register />
                                    <CompleteAccount />
                                </div>
                                <div className='p-7'>
                                    <LoginR />
                                </div>
                            </div>
                        </animated.div>
                    </div>
                </div>
            </animated.section>
        </>
    )
}
