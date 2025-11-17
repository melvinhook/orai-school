import { animated, useSpring } from '@react-spring/web'
import { useApi } from '../../../store/useApi'
export default function Input({ mt, tags: Icon, children, label, setlabel, type, setValue, isempty }) {
    const {removeEmpty, isfirstchecked} = useApi() 
    {/* 
        const isfirstchecked = useApi((state) => state.isfirstchecked);
    */}
    const border = useSpring({
        to: { borderColor: label === children ? '#3791E7' : isempty ? '#ff0000ff' : '#d1d5db' }
    })
    const logo = useSpring({
        to: { color: label === children ? '#3791E7' : isempty ? '#ff0000ff' : '#9ca3af' }
    })
    function handleChange(e) { 
        const newValue = e.target.value; 
        setValue(newValue) 
        if (isfirstchecked) { 
            console.log("changed")
            if (newValue.trim() === '') {
                console.log('Input is EMPTY.'); 
            } else {
                setValue(newValue) 
                removeEmpty(children)
            }
        }  
    }
    return (
        <>
            <h1 className={`${mt} font-bold`}>{children}</h1>
            <animated.div style={border} onClick={() => setlabel(children)} className='flex flex-row h-[9%] w-[130%] border border-gray-300 rounded-lg mt-[1%] p-2 '>
                <input type={type} onChange={(e) => handleChange(e)} className='focus:outline-none w-[90%]' />
                <animated.div style={logo}>
                    {Icon && <Icon size={23} />}
                </animated.div>
            </animated.div>
        </>
    )
}