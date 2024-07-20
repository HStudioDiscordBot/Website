"use client";

import BotShards from "@/components/BotShards";
import { Shard } from "@/interfaces/Shard";
import { Skeleton } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

function formatBytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function Status() {
    const currentLanguage = getCookie("language");
    const router = useRouter();

    const [serverName, setServerName] = useState("");
    const [cpu, setCpu] = useState("");
    const [ram, setRam] = useState("");
    const [player, setPlayer] = useState("");
    const [activePlayer, setActivePlayer] = useState("");
    const [uptime, setUptime] = useState("");

    const [mainVersion, setHStudioMainVersion] = useState("");
    const [subVersion, setHStudioSubVersion] = useState("");

    const [mainError, setMainError] = useState(false);
    const [subError, setSubError] = useState(false);

    const [mainShards, setMainShards] = useState<Shard[]>([]);
    const [subShards, setSubShards] = useState<Shard[]>([]);

    const [isFirstFetch, setIsFirstFetch] = useState(true);

    function convertUptime(milliseconds: number) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        let result = '';
        if (currentLanguage == "thai") {
            if (days > 0) result += `${days} วัน, `;
            if (hours > 0) result += `${hours} ชั่วโมง, `;
            if (minutes > 0) result += `${minutes} นาที`;
        } else {
            if (days > 0) result += `${days} day${days > 1 ? 's' : ''}, `;
            if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''}, `;
            if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }

        return result.trim().replace(/,$/, '');
    }

    async function getStatus() {
        if (isFirstFetch) {
            Swal.fire({
                icon: "info",
                title: currentLanguage === "thai" ? "กำลังโหลดสถานะบอท" : "Loading Bot Status",
                text: currentLanguage === "thai" ? "กรุณารอสักครู่" : "Please wait a moment",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });
        }

        fetch("https://hstudio-api.hewkawar.xyz/info")
            .then((res) => res.json())
            .then((value) => {
                updateStatus(value);
                Swal.close();
                setIsFirstFetch(false);
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: currentLanguage === "thai" ? "ไม่สามารถดึงข้อมูลบอทได้" : "Unable to retrieve bot information",
                    text: currentLanguage === "thai" ? "กรุณาลองอีกครั้งภายหลัง" : "Please try again later.",
                    confirmButtonText: currentLanguage === "thai" ? "ยืนยัน" : "Confirm",
                    confirmButtonColor: "rgb(59 130 246)",
                    willClose: () => {
                        router.push("/");
                    }
                });
            });
    };

    function updateStatus(value: any) {
        setServerName(value.server.name);
        setCpu(`${(value.stats.cpu.systemLoad * 100).toFixed(2)} %`);
        setRam(formatBytes(value.stats.memory.used));
        setPlayer(value.stats.players.toLocaleString());
        setActivePlayer(value.stats.playingPlayers.toLocaleString());
        setUptime(convertUptime(value.stats.uptime));

        if (value.hstudio.main.error === 500) {
            setHStudioMainVersion("Unavailable");
            setMainError(true);
        } else {
            setHStudioMainVersion(value.hstudio.main.version);
            setMainError(false);
        }
        if (value.hstudio.sub.error === 500) {
            setHStudioSubVersion("Unavailable");
            setSubError(true);
        } else {
            setHStudioSubVersion(value.hstudio.sub.version);
            setSubError(false);
        }

        if (value.hstudio.main.shards) setMainShards(value.hstudio.main.shards);
        if (value.hstudio.sub.shards) setSubShards(value.hstudio.sub.shards);
    }

    useEffect(() => {
        getStatus();
    }, []);

    return (
        <>
            {currentLanguage == "thai" ? (
                <>
                    <title>สถานะบอท | HStudio</title>
                    <div className="w-[95vw] lg:w-[70vw] text-wrap text-center mt-5 mb-3">
                        <h1 className="text-2xl lg:text-4xl text-[#7DB1ED]">สถานะบอท</h1>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>เซิร์ฟเวอร์</p>
                            <p>{serverName ? serverName : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>CPU</p>
                            <p>{cpu ? cpu : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>RAM</p>
                            <p>{ram ? ram : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Player</p>
                            <p>{player ? player : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Active Player</p>
                            <p>{activePlayer ? activePlayer : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Uptime</p>
                            <p>{uptime ? uptime : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="text-center">
                            <h1 className="text-2xl lg:text-4xl mb-5 flex justify-center">HStudio Main (เวอร์ชั่น&nbsp;{mainVersion ? mainVersion : (<span><Skeleton variant="text" width={100} height={50} /></span>)})</h1>
                            <BotShards error={mainError} lang={"thai"} shards={mainShards} />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl lg:text-4xl mb-5 flex justify-center">HStudio 1 (เวอร์ชั่น&nbsp;{subVersion ? subVersion : (<span><Skeleton variant="text" width={100} height={50} /></span>)})</h1>
                            <BotShards error={subError} lang={"thai"} shards={subShards} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <title>Status | HStudio</title>
                    <div className="w-[95vw] lg:w-[70vw] text-wrap text-center mt-5 mb-3">
                        <h1 className="text-2xl lg:text-4xl text-[#7DB1ED]">Status</h1>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Server</p>
                            <p>{serverName ? serverName : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>CPU</p>
                            <p>{cpu ? cpu : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>RAM</p>
                            <p>{ram ? ram : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Player</p>
                            <p>{player ? player : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Active Player</p>
                            <p>{activePlayer ? activePlayer : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Uptime</p>
                            <p>{uptime ? uptime : (<Skeleton variant="text" width={100} height={50} />)}</p>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="text-center">
                            <h1 className="text-2xl lg:text-4xl mb-5 flex justify-center">HStudio Main (Version&nbsp;{mainVersion ? mainVersion : (<span><Skeleton variant="text" width={100} height={50} /></span>)})</h1>
                            <BotShards error={mainError} lang={"english"} shards={mainShards} />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl lg:text-4xl mb-5 flex justify-center">HStudio 1 (Version&nbsp;{subVersion ? subVersion : (<span><Skeleton variant="text" width={100} height={50} /></span>)})</h1>
                            <BotShards error={subError} lang={"english"} shards={subShards} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}