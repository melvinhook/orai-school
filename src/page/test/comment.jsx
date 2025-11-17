import { useQuery } from "@tanstack/react-query"
import { postApi } from "../../store/postApi";

export default function Comment() {
    const { posttest } = postApi()
    const { data } = useQuery({
        queryKey: ["title"],
        queryFn: posttest,
        refetchInterval: 3000,
    });

    return (
        <>
            {data?.map((x) => (
                <div className="w-full shadow-lg p-5 gap-4">
                    <h1 className="text-[25px] font-bold">{x.content}</h1>
                    <p>{x.content}</p>
                </div>
            ))}
        </>
    )
}