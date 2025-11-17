import { animated, useSpring } from '@react-spring/web'

export default function LInput({ mt, tags: Icon, children, label, setlabel , type, setValue, isempty}) {
    const border  = useSpring({
        to: { borderColor: label === children ? '#3791E7' : isempty? '#ff0000ff' :'#d1d5db' }
    })
    const logo = useSpring ({
        to: { color: label === children ? '#3791E7' : isempty? '#ff0000ff' : '#9ca3af' }
    })
    return (
        <>
            <h1 className={`${mt} font-bold`}>{children}</h1>
            <animated.div style={border} onClick={() => setlabel(children)} className='flex flex-row h-[9%] w-[130%] border border-gray-300 rounded-lg mt-[1%] p-2 '>
                <input type={type} onChange={(e)=>setValue(e.target.value)} className='focus:outline-none w-[90%]' />
                <animated.div style={logo}>
                    {Icon && <Icon  size={23} />}
                </animated.div>
            </animated.div>
        </>
    )
}