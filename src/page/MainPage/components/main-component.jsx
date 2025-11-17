
import Bg from '../assets/background.png'
import Photo1 from '../assets/photo1.jpg'
import Photo2 from '../assets/photo2.jpg'
import Pin from '../assets/PIN1.png'
import Card from './card'
import Slidebox from './slide-box'
import Slider from './slider'
import Imageslider from './imageSlider'
import Testimony from './testimany' 
import Navigate from '../../../components/navigate'
import { Md360 } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { animated } from '@react-spring/web';
import { pageController } from '../../../store/pageController'   
import { FaFacebook } from "react-icons/fa"; 
import { SiYoutubemusic } from "react-icons/si"; 
import { FaInstagram } from "react-icons/fa"; 
import { FaLinkedin } from "react-icons/fa";
import Jtank from '../assets/j-tank.png'
import { useEffect } from 'react'
export default function Maincomponent({slideLeft, slideRight, section5, section4, viewSection5, viewSection4, logo , user , video, bottomdiv, section2, section3, introdiv, pin, photo1section2, photo2section2 }) { 
    const { pageUnlock, setSelected} = pageController() 
    useEffect(()=>{
        setSelected("Home")
    },[])
    return (
        <>
            <section className="h-screen w-screen">
                <Navigate role={"main"}/>
                <div className="relative h-[87%]">
                    <animated.div style={bottomdiv} className='w-full  flex flex-row justify-between bottom-0 text-white absolute z-10 p-15'>
                        <div className='w-[50%]'>
                            <h1 className=' text-[50px] font-bold'>Unleashing Potential<br /> Of Sensha Do</h1>
                            <div className='mt-[5%] p-3  w-[35%] bg-[#3791E7] font-bold'>Get to know more</div>
                        </div>
                        <div className='w-[50%] p-5 pl-20'>
                            <h1 className='font-bold text-[25px]'>King of Sensha Do</h1>
                            <p>Won almost every match</p>
                            <h1 className='font-bold text-[25px]'>True future of Woman</h1>
                            <p>Over-powered female student with dicipline</p>
                        </div>
                    </animated.div>
                    <animated.div style={video} className="h-full overflow-hidden">
                        <img src={Bg} className="h-full w-full object-cover" />
                    </animated.div>
                </div>
            </section>
            <section className={`h-screen w-screen flex flex-row justify-center p-20 gap-4 ${pageUnlock >= 2 ? "" : "hidden"}`}>
                <div className='w-[30%] flex flex-row gap-4 relative'>
                    <animated.img style={pin} className='absolute z-10 mt-[20%] rotate-180' src={Pin} alt="" />
                    <animated.img style={photo1section2} src={Photo1} alt="" className='h-[70%] w-[50%] object-cover' />
                    <animated.img style={photo2section2} src={Photo2} alt="" className='h-[70%] w-[50%] object-cover' />
                </div>
                <div className='w-[50%] pt-10'>
                    <animated.div style={introdiv} className='w-[80%]' ref={section2}>
                        <h1 className='font-bold text-[50px] '>About Academy</h1>
                        <p>Ōarai Girls' Academy is a fictional school from the anime Girls und Panzer, set aboard a massive carrier ship and located in the coastal town of Ōarai, Japan. Known for its revival of the traditional martial art of Sensha-dō—tank warfare practiced by schoolgirls—the academy becomes the heart of the story as its students rally to save their school from closure by competing in national tank battles. The school is characterized by its diverse student teams, each themed around different animals and operating tanks from various countries, creating a colorful and dynamic cast. Despite its modest reputation compared to elite rivals, Ōarai’s charm lies in its underdog spirit, teamwork, and the personal growth of its characters as they navigate both battlefield tactics and high school life</p>
                        <div className='flex flex-row gap-2'>
                            <div onClick={()=>alert('Too much effort XD im lazy af \n ~ Dev ~')} className='p-2 flex flex-row border border-[#3791E7] gap-2 text-[#3791E7] mt-[2%] hoverss cursor-pointer'>
                                <Md360 size={30} />
                                View School
                            </div>
                            <div onClick={()=>alert('Haha u think i have money ?? XD \n ~ Dev ~')} className='p-2 flex flex-row border border-[#3791E7] gap-2 text-[#3791E7] mt-[2%] hoverss cursor-pointer'>
                                <FaBook size={30} />
                                Request Book
                            </div>
                        </div>
                    </animated.div>
                </div>
            </section>
            <section ref={section3} className={`h-screen w-screen flex flex-col p-20 gap-4 ${pageUnlock >= 2 ? "" : "hidden"}`}>
                <div className='w-full h-[50%] flex flex-row justify-between overflow-visible '>
                    <div className='flex items-center justify-center h-full w-[30%] font-bold text-[25px]'>
                        Our Academics
                    </div>
                    <div className='h-full w-[80%] overflow-hidden '>
                        <Card />
                    </div>
                </div>
            </section>
            <animated.section ref={section4} style={viewSection4} className={`h-screen w-screen pl-10 pr-10 pb-10 ${pageUnlock >= 2 ? "" : "hidden"}`}>
                <h1 className='text-[25px] font-bold text-center'>Programs and Academics</h1>
                <div className='w-full h-[70%] flex flex-row justify-center relative mt-[2%]'>
                    <Slidebox />
                    <div className='h-full w-full flex flex-row justify-center absolute'>
                        <Slider slides={1}>
                            <h1 className='font-bold text-[25px]'>History and Strategy</h1>
                            <div className='p-3 border mt-[3%]'>Tank Warfare</div>
                            <div className='p-3 border mt-[3%]'>Battlefield Formation</div>
                            <div className='p-3 border mt-[3%]'>Live Simulation</div>
                            <div className='p-3 border mt-[3%]'>Specialized Armored Warfare</div>
                        </Slider>
                        <Slider slides={2}>
                            <h1 className='font-bold text-[25px]'>Maritime & Coastal Environmental Studies</h1>
                            <div className='p-3 border mt-[3%]'>Coastal Economy</div>
                            <div className='p-3 border mt-[3%]'>Marine ecosystems</div>
                            <div className='p-3 border mt-[3%]'>fishing and agricultur</div>
                            <div className='p-3 border mt-[3%]'>A coastal-focused academic track</div>
                        </Slider>
                        <Slider slides={3}>
                            <h1 className='font-bold text-[25px]'>Cultural Heritage & Tourism Development</h1>
                            <div className='p-3 border mt-[3%]'>Regional History & Heritage Studies</div>
                            <div className='p-3 border mt-[3%]'>Tourism & Event Planning</div>
                            <div className='p-3 border mt-[3%]'>Media & Pop-Culture Tourism</div>
                            <div className='p-3 border mt-[3%]'>Business & Sustainability</div>
                        </Slider>
                    </div>
                </div>
            </animated.section>
            <animated.section ref={section5} style={viewSection5} className={`h-[80vh] w-screen ${pageUnlock >= 2 ? "" : "hidden"}`}>
                <div className='text-center font-bold text-[25px] '>Something about this Academy</div>
                <div className='h-full w-full flex flex-row justify-center'>
                    <div onClick={() => {
                        slideLeft()
                    }} className='h-full flex items-center justify-center mr-[10%] text-[#3791E7]'>
                        <FaArrowLeft size={30} />
                    </div>
                    <div className='h-full w-[35%] flex items-center justify-center'>
                        <div className='p-7'>
                            <div className='w-full flex flex-row justify-center '>
                                <Imageslider />
                            </div>
                            <Testimony />
                        </div>
                    </div>
                    <div onClick={() => {
                        slideRight()
                    }} className='h-full flex items-center justify-center ml-[10%] text-[#3791E7]'>
                        <FaArrowRight size={30} />
                    </div>
                </div>
            </animated.section> 
            <section className={`mt-[5%] h-[65vh] w-screen ${pageUnlock >= 2 ? "" : "hidden"} relative `}>  
                <div className='absolute font-bold text-white p-22 '> 
                    <h1>Oarai Girls Academy</h1>  
                    <h1 className='mt-[0.5%]'>Home port in the coastal town of Ōarai, in Ibaraki Prefecture, Japan.</h1> 
                    <h1 className='mt-[0.5%] italic'>Oarai Girls Academy admits students of any race, color, national and ethnic origin to all the rights, privileges, programs, and activities generally accorded or made available to students at the school.  It does not discriminate on the basis of race, color, national and ethnic origin in administration of its educational policies, admission policies, scholarship and loan programs, and athletic and other school-administered programs.</h1> 
                    <div className='flex flex-row text-white gap-5 mt-5'> 
                        <div className='cursor-pointer p-3 rounded-md w-[15%] flex items-center justify-center bg-[#3791E7] text-white'>Inquire or Apply</div>
                        <div className='cursor-pointer p-3 border border-white rounded-md w-[15%] flex items-center justify-center bottoms'>Calendar</div>
                        <div className='cursor-pointer p-3 border border-white rounded-md w-[15%] flex items-center justify-center bottoms'>Directory</div>
                        <div className='cursor-pointer p-3 border border-white rounded-md w-[15%] flex items-center justify-center bottoms'>EthicsPoint Reporting</div>
                    </div> 
                    <div className='flex flex-row gap-5 mt-5 text-gray-300 text-[30px] '> 
                        <FaFacebook/> 
                        <SiYoutubemusic/> 
                        <FaInstagram/> 
                        <FaLinkedin />
                    </div> 
                    <h1 className='mt-5'>© 2025 Oarai Girls Academy School Privacy Policy</h1>
                </div>
                <img src={Jtank} alt="" className='object-cover h-full w-full' /> 
            </section> 
       
        </>
    )
}