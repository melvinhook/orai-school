import { useApi } from "../../../store/useApi"
import { useQuery } from "@tanstack/react-query"
import { pageController } from "../../../store/pageController";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";
export default function Testimony() {  
  const { gettestimony } = useApi();
  const { slideCard } = pageController()
  const { data, isLoading, error } = useQuery({
    queryKey: ["desc"],
    queryFn: gettestimony,
  });
  const [displayIndex, setDisplayIndex] = useState(slideCard);
  // spring for fading
  const [styles, api] = useSpring(() => ({
    opacity: 1,
    config: { tension: 200, friction: 20 }
  }));

  useEffect(() => {
    // fade out first
    api.start({
      opacity: 0,
      onRest: () => {
        // after fade out, change text and fade in
        setDisplayIndex(slideCard);
        api.start({ opacity: 1 });
      }
    });
  }, [slideCard, api]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>; 

  const testimony = data?.[displayIndex];
  if (!testimony) return null;

  return (
    <animated.div style={styles}>
      <h1 className='mt-[5%] h-45 flex flex-col justify-center text-center'>
        "{testimony.desc}"
      </h1>
      <h1 className='mt-[5%] text-center font-bold text-[#3791E7]'>
        {testimony.name}
      </h1>
      <h1 className='text-center font-bold'>
       {testimony.role}
      </h1>
    </animated.div>
  )
}
