import { useApi } from '../../../store/useApi';
import { animated, useSpring } from '@react-spring/web'
import { FaCalendarAlt } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { useEffect, useState } from "react";
import Tube from "../assets/tube-spinner.svg"
export default function CompleteAccount() {
    const [isHidden, setIsHidden] = useState(true)
    const { profilePreview, getprofile, iscompleteaccountphase, register, empty, setfirstname, setlastname, setborndate,
        username,
        email,
        password,
        firstname,
        lastname,
        borndate,
        isloading
    } = useApi()
    const [div, divapi] = useSpring(() => ({
        from: {
            opacity: 0
        }
    }))
    useEffect(() => {
        if (iscompleteaccountphase == 2) {
            console.log("Now complete your account")
            setIsHidden(false)
            divapi.start({
                to: {
                    opacity: 1
                }
            })
        }else if(iscompleteaccountphase == 3){
            setIsHidden(true)
            divapi.start({
                to: {
                    opacity: 0
                }
            })
        }
    }, [iscompleteaccountphase])
    return (
        <>
            <animated.div style={div} className={`${isHidden ? 'hidden' : ''}`}>
                <h1 className='font-bold mt-[10%]'>COMPLETE YOUR ACCOUNT</h1>
                <div className="gap-3 w-full h-24 pl-5 pt-2 flex flex-row justify-between">
                    {/* profileImage Upload Container */}
                    <div className="rounded-full w-30 h-20 bg-gray-200 flex items-center justify-center overflow-hidden">
                        {profilePreview ? (
                            <img
                                src={profilePreview}
                                alt="Uploaded"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FaCamera className="text-gray-300" size={20} />
                        )}
                        {/* Hidden file input */}

                        <input
                            type="file"
                            accept="profileImage/*"
                            className="hidden"
                            id="upload"
                            onChange={getprofile}
                        />
                        {/* Label to trigger input */}

                        <label
                            htmlFor="upload"
                            className="absolute w-30 h-20 cursor-pointer"
                        ></label>
                    </div>

                    {/* Button */}
                    <div className="h-full w-full flex flex-col justify-center">
                        <label
                            htmlFor="upload"
                            className="h-10 w-[80%] p-2 text-white bg-blue-500 rounded-lg flex justify-center items-center cursor-pointer"
                        >
                            Upload your photo
                        </label>
                    </div>
                </div>
                <div className="w-full h-20 flex flex-row justify-between mt-[5%]">
                    <div className="">
                        <h1 className="font-bold">First Name</h1>
                        <input type="text" onChange={(e) => setfirstname(e.target.value)} className={`pl-3 border ${empty.includes("firstname") ? 'border-red-500' : 'border-gray-300'} mt-[10%] w-full h-[50%] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg`} />
                    </div>
                    <div className=" ml-[10%] mr-[10%]">
                        <h1 className="font-bold">Last Name</h1>
                        <input type="text" onChange={(e) => setlastname(e.target.value)} className={`pl-3 border ${empty.includes("lastname") ? 'border-red-500' : 'border-gray-300'} mt-[10%] w-full h-[50%] focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg`} />
                    </div>
                </div>
                <div className="mt-[2%]">
                    <h1 className="font-bold">Born Date</h1>
                    <div className={`flex flex-row mt-[1%] h-10 w-[90%] border ${empty.includes("borndate") ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 gap-2`}>
                        <div className="h-full flex flex-col justify-center text-gray-400">
                            <FaCalendarAlt />
                        </div>
                        <div className="h-full w-full flex flex-col justify-center">
                            <input type="date" onChange={(e) => setborndate(e.target.value)} className="focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                    </div>
                    <div onClick={() => register(username, email, password, firstname, lastname, borndate)} className="mt-[5%] w-[90%] h-10 rounded-lg border bg-blue-500  font-bold text-white flex items-center justify-center">
                        {isloading ? (
                            <img src={Tube} alt="loading..." className="w-5 h-5 " />
                        ) : (
                            <h1>SAVE</h1>
                        )}
                    </div>
                </div>

            </animated.div>
        </>
    )
}