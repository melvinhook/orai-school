import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slide({ isLogin, setIsLogin }) {
    const [swiperInstance, setSwiperInstance] = useState(null);
    // Animate sliding div when isLogin changes
    const div = useSpring({
        to: { marginLeft: isLogin ? '50%' : '0%' },
    });
    // Sync Swiper with isLogin state
    useEffect(() => {
        if (swiperInstance) {
            if (isLogin) {
                swiperInstance.slideTo(1);
            } else {
                swiperInstance.slideTo(0);
            }
        }
    }, [isLogin, swiperInstance]);

    // Toggle state on click
    const handleToggle = () => {
        setIsLogin((prev) => !prev);
    };
    return (
        <>
            <animated.div
                style={div}
                className="h-full bg-gray-200 w-[50%] rounded-lg absolute"
            >
                <Swiper
                    className="h-full w-full rounded-lg"
                    slidesPerView={1}
                    loop={false}
                    navigation={false}
                    pagination={false}
                    onSwiper={setSwiperInstance}
                >
                    <SwiperSlide>
                        <img src={img1} alt="Slide 1" className="h-full w-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img2} alt="Slide 2" className="h-full w-full object-cover" />
                    </SwiperSlide>
                </Swiper>
            </animated.div>
        </>
    );
}
