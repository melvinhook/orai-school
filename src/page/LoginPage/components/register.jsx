import { CiUser } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { useApi } from '../../../store/useApi'
import { CiMail } from "react-icons/ci";
import Input from './input';
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";
export default function Register() {
    const [isHidden, setIsHidden] = useState(false)
    const {
        username,
        password,
        email,
        setislogin,
        setlabel,
        label,
        setemail,
        setusername,
        setpassword,
        islogin,
        empty,
        errormessage,
        registercheckphase1,
        iscompleteaccount,
        setiscompleteaccountphase
    } = useApi()
    const [registerdiv, registerapi] = useSpring(() => ({
        from: {
            opacity: 0,
            marginRight: '0%'
        }
    }))
    {/* 
        to: { opacity: islogin ? 1 : 0, marginRight: islogin ? '-8%' : '0%' }
    */}
    const errorempty = useSpring({
        to: { opacity: errormessage ? 1 : 0 }
    })
    useEffect(() => {
        if (islogin) {
            registerapi.start({
                to: {
                    opacity: 1,
                    marginRight: '-8%'
                }
            })
        } else {
            registerapi.start({
                to: {
                    opacity: 0,
                    marginRight: '0%',
                    onRest: () => {
                        setIsHidden('hidden')
                    }
                }
            })
        }
        if (iscompleteaccount) {
            console.log("Start ending animation phase 1")
            registerapi.start({
                to: {
                    opacity: 0,
                    marginRight: '0%',

                },
                onRest: () => {
                    setIsHidden(true)
                    setiscompleteaccountphase(2)
                    console.log("Phase 2")
                }
            })
        }

    }, [islogin, iscompleteaccount])
    return (
        <animated.div style={registerdiv} className={`${isHidden && 'hidden'}`}>
            <h1 className='font-bold mt-[10%]'>REGISTER NOW</h1>
            <h1 className='text-[25px] font-bold'>Sign Up For Free</h1>
            <p >Already have an account? <span onClick={() => islogin && setislogin(false)} className='text-blue-700 cursor-pointer'>Sign In</span></p>
            <Input mt={'mt-[10%]'} tags={CiUser} label={label} setlabel={setlabel} type={'text'} setValue={setusername} isempty={empty.includes('Username') ? true : false}>Username</Input>
            <Input mt={'mt-[4%]'} tags={CiMail} label={label} setlabel={setlabel} type={'text'} setValue={setemail} isempty={empty.includes('Email') ? true : false}>Email</Input>
            <Input mt={'mt-[4%]'} tags={IoLockClosedOutline} label={label} setlabel={setlabel} type={'password'} setValue={setpassword} isempty={empty.includes('Password') ? true : false}>Password</Input>
            <div className={`cursor-pointer hoverz hover:bg-blue-400 mt-[5%] h-10 w-[130%] rounded-lg bg-blue-500 flex justify-center items-center text-white font-bold `} onClick={() => registercheckphase1(username, email, password)}>SIGNUP</div>
            <animated.div style={errorempty} className={`text-red-500 mt-[2%]`}>{errormessage}</animated.div>
        </animated.div>
    )
}