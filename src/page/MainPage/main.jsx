import './main.css';
import { useEffect } from 'react';
import { useSpring} from '@react-spring/web'; 
import Maincomponent from './components/main-component'; 
import { useRef } from 'react'; 
import { pageController } from '../../store/pageController';
export default function MainPage(){    
    const section2=useRef(); 
    const section3=useRef(); 
    const section4=useRef(); 
    const section5=useRef();
    const{setPageUnlock, animation, setAnimation, slideCard, setSlideCard, setRef}=pageController() 
    const video=useSpring({
        to:{opacity: animation >=4 ? 1: 0},onRest:()=>{setAnimation(5)} 
    })
    const bottomdiv = useSpring({
        to:{opacity: animation >=5 ? 1: 0}, onRest:()=>{setAnimation(6);setPageUnlock(2)} 
    })
    const introdiv = useSpring({
        to: {opacity: animation >=7 ? 1 : 0 , marginLeft: animation>=7? '5%':'0%'}, 
    })
    const pin = useSpring({ 
        to:{opacity:  animation >=7 ? 1 : 0,transform: animation>=7? 'rotate(180deg)' : 'rotate(0deg)'}
    })
    const photo1section2  = useSpring({
        to:{opacity:  animation >= 7? 1 : 0,marginTop: animation>=7?'25%':'0%'}
    })
    const photo2section2 = useSpring({
        to:{opacity:  animation >= 7 ? 1 : 0,marginTop: animation>=7 ? '8%' : '16%'}
    })   
    const viewSection4 = useSpring({
      to:{opacity: animation>=9 ? 1 : 0}
    }) 
    const viewSection5 = useSpring({
      to:{opacity: animation>=10 ? 1 : 0, marginTop: animation>=10 ? '0%':'5%'}
    }) 
    function slideLeft(){
      setRef.current?.slidePrev() 
      setSlideCard(slideCard < 0 ? slideCard-1:0)
    } 
    function slideRight(){
      setRef.current?.slideNext() 
      setSlideCard(slideCard < 2 ? slideCard+1 : 0)
    }
    useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { 
          if(animation<7){
            setAnimation(7)
          }
        }
      },
      { threshold: 0.5 } 
    );
    const sections2 = section2.current;
    if (sections2) observer.observe(sections2);
    return () => {
      if (sections2) observer.unobserve(sections2);
    };
  }, [animation, setAnimation]); 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Section3")  
          if(animation<8){
              setAnimation(8)
          }
        }
      },
      { threshold: 0.5 } 
    );
    const sections3 = section3.current;
    if (sections3) observer.observe(sections3);
    return () => {
      if (sections3) observer.unobserve(sections3);
    };
  }, [animation, setAnimation]);  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Section4")  
          if(animation<9){
            setAnimation(9)
          }
        }
      },
      { threshold: 0.5 } 
    );
    const sections4 = section4.current;
    if (sections4) observer.observe(sections4);
    return () => {
      if (sections4) observer.unobserve(sections4);
    };
  }, [animation, setAnimation]);  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Section4")  
          if(animation<10){
            setAnimation(10)
          }
        }
      },
      { threshold: 0.5 } 
    );
    const sections5 = section5.current;
    if (sections5) observer.observe(sections5);
    return () => {
      if (sections5) observer.unobserve(sections5);
    };
  }, [animation, setAnimation]);   
  
  return (
        <>
            <Maincomponent slideLeft={slideLeft} slideRight={slideRight} section5={section5} section4={section4} viewSection5={viewSection5} viewSection4={viewSection4} video={video} bottomdiv={bottomdiv} section2={section2} section3={section3} introdiv={introdiv} pin={pin} photo1section2={photo1section2} photo2section2={photo2section2}/>
        </>
    )
}