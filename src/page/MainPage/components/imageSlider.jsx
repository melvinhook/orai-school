import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Anzu from "../assets/Anzu.png";
import Azusa from "../assets/Azusa.jpg";
import Mako from "../assets/Mako.jpg";
import { pageController } from "../../../store/pageController";
export default function ImageSlider() {
 const{setRef}=pageController()
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-48 h-48 overflow-hidden rounded-full border-4 border-gray-300 shadow-md">
        <Swiper
          onSwiper={(swiper) => {
            setRef.current = swiper;
          }}
          spaceBetween={0}
          allowTouchMove={false} 
          loop={true}
        >
          <SwiperSlide>
            <img src={Anzu} alt="Anzu" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Azusa} alt="Other1" className="w-full h-full object-fill" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Mako} alt="Other2" className="w-full h-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
