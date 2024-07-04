import { BotShardsProps } from "@/interfaces/Shard";

export default function BotShards({ lang, error, shards }: BotShardsProps) {
    return (
        <div className="flex justify-center">
            {error ? (
                <div className="bg-[#414141] text-center py-5 px-10 rounded m-5">
                    <p>{ lang == "thai" ? "ไม่สามารถเข้าถึงบอทได้" : ""}</p>
                    <p className="text-[#f73c7a]">{ lang == "thai" ? "ออฟไลน์" : "Offline"}</p>
                </div>
            ) : (
                shards.map((value: any, index) => (
                    <div className="bg-[#414141] text-center py-5 px-10 rounded m-5" key={index}>
                        <p>Shard: {index}</p>
                        {value.online ? (
                            <p className="text-[#3cf783]">{ lang == "thai" ? "ออนไลน์" : "Online"}</p>
                        ) : (
                            <p className="text-[#f73c7a]">{ lang == "thai" ? "ออฟไลน์" : "Offline"}</p>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}
