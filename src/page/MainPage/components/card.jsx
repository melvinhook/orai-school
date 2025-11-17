import { useEffect } from 'react'
import img from '../assets/card1.jpg'  
import leadership from '../assets/leadership.jpg' 
import engineering from '../assets/engineering.jpg'
import { useSpring , animated} from '@react-spring/web' 
import {pageController} from '../../../store/pageController'
export default function Card() {  
    const{animation, setAnimation}=pageController()
    const [alldiv,alldivapi]=useSpring(()=>({
        from:{opacity: 0, marginLeft:'50%'}
    })) 
    useEffect(()=>{
        if(animation>=8){
            alldivapi.start({
                to:{opacity:1,marginLeft:'35%'}, 
                onRest:()=>{
                    alldivapi.start({  
                        to:{opacity:1,marginLeft:'20%'}, 
                        onRest:()=>{
                            alldivapi.start({ 
                                to:{opacity:1,marginLeft:'0%'} 
                            }) 
                        }
                    })
                }
            })
        }
    },[animation])
    return (
        <animated.div style={alldiv} className='w-[70%] h-[40%] flex flex-row absolute'>
            <div className='w-[30%] shadow-xl '> 
                <div className='w-full h-[40%]'>
                    <img src={img} alt="" className='h-full w-full object-cover'/> 
                </div>
                <div className='p-5'> 
                      <h1 className='text-[35px] font-bold'>Sensha Do</h1> 
                    <p>Meet the best attraction of martial art from Oarai "Sensha Do". It Provides many things about Tanks and Tactics. Join us to see how awesome it is!</p>
                </div>
            </div>
            <div className='w-[30%] shadow-xl pl-[2%]'>  
                <div className='w-full h-[40%]'>
                    <img src={leadership} alt="" className='h-full w-full object-cover'/> 
                </div>
                <div className='p-5'> 
                      <h1 className='text-[35px] font-bold'>Leadership</h1> 
                    <p>Leadership in sensha-dō demands tactical acumen, unwavering composure, and the ability to inspire teamwork under pressure in the heat of tank combat.</p>
                </div>
            </div>
            <div className='w-[30%] shadow-xl pl-[2%]'> 
                <div className='w-full h-[40%]'>
                    <img src={engineering} alt="" className='h-full w-full object-cover'/> 
                </div>
                <div className='p-5'> 
                      <h1 className='text-[35px] font-bold'>Engineering</h1> 
                    <p>Engineering in sensha-dō focuses on optimizing tank performance, battlefield durability, and mechanical reliability to support agile, coordinated combat operations.</p>
                </div>
            </div>
            <div className='w-[30%] shadow-xl pl-[2%]'> 
                <div className='w-full h-[40%]'>
                    <img src={img} alt="" className='h-full w-full object-cover'/> 
                </div>
                <div className='p-5'> 
                      <h1 className='text-[35px] font-bold'>Sensha Do</h1> 
                    <p>Meet the best attraction of martial art from Oarai "Sensha Do". It Provides many things about Tanks and Tactics. Join us to see how awesome it is!</p>
                </div>
            </div>
        </animated.div>
    )
}