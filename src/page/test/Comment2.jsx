import { useQuery } from "@tanstack/react-query"
import { postApi } from "../../store/postApi"; 
import { animated , useSpring } from "@react-spring/web";
import { useEffect } from "react";
export default function Comment2() {
  const { posttest } = postApi()
  const { data } = useQuery({
    queryKey: ["title"],
    queryFn: posttest, 
    refetchInterval: 3000,
  }); 
  const [divz, divApi] = useSpring(() => ({
    opacity: 0,
    width: "0%", 
    height: "0%",
  }));  
  const [text, textApi] = useSpring(()=>({
    opacity:0 ,
    marginLeft: "-5%"
  }))
  useEffect(() => {
    if (data?.new_ids?.length > 0) {
      // Trigger animasi setiap kali data baru muncul
      divApi.start({
        from: { opacity: 0, width: "0%" ,height: "0%",},
        to: { opacity: 1, width: "100%",height: "33%", },  
        onRest: ()=>{
            textApi.start({
                to : {opacity:1,marginLeft:'0%'}
            })
        }
      });
    }
  }, [data?.new_ids, divApi]);
  if (!data?.new_ids || data.new_ids.length === 0) return null;
  return (
    <>
      {data.new_ids.map((x) => (
        <animated.div key={x.id} style={divz} className="shadow-lg p-5 gap-4">
          <animated.h1 style={text} className="text-[25px] font-bold">{x.title}</animated.h1>
          <animated.p style={text}>{x.desc}</animated.p>
        </animated.div>
      ))}
    </>
  );
}
