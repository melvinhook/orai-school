import { CiUser } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { useApi } from '../../../store/useApi'
import LInput from "./linput";
import Loading from "./loadingIndicator";
import { useSpring, animated } from "@react-spring/web"; 

export default function LoginR() {
    const {
        login,
        username, 
        password,
        setislogin,
        setlabel,
        label,
        setusername,
        setpassword,
        islogin, 
        isloading,  
        lempty, 
        lerrormessage, 
        isloginerror 
    } = useApi()
    const logindiv = useSpring({
        to: { opacity: islogin ? 0 : 1, marginLeft: islogin ? '0%' : '-8%' }
    }) 
    const errorempty = useSpring({
        to: {opacity: lerrormessage? 1 : 0}
    }) 
    return (
        <animated.div style={logindiv} className="h-auto">
            <h1 className='text-[25px] font-bold '>Sign In</h1>
            <p>Don't have an account? <span onClick={() => !isloading && setislogin(true)} className='text-blue-700 cursor-pointer'>Sign Up</span></p>
            <LInput mt={'mt-[10%]'} tags={CiUser} label={label} setlabel={setlabel} setValue={setusername} type={'text'} isempty={lempty.includes('username') ? true : false}>Username</LInput>
            <LInput mt={'mt-[4%]'} tags={IoLockClosedOutline} label={label} setlabel={setlabel} setValue={setpassword} type={'password'} isempty={lempty.includes('password') ? true : false}>Password</LInput>
            <div onClick={() => !isloading && login(username, password)} className={`${!isloading && "cursor-pointer hoverz"} hover:bg-blue-400 mt-[5%] h-10 w-[130%] rounded-lg bg-blue-500 flex justify-center items-center text-white font-bold `}>{isloading? <Loading/>: "SIGN IN"}</div> 
            <animated.div style={errorempty} className={` text-red-500 mt-[2%]`}>{lerrormessage}</animated.div> 
            <h1 className={`text-red-500 ${isloginerror ? '' : 'hidden'}`}>Invalid Username or Password</h1>
        </animated.div>
    )
}