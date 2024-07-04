"use client";

import { getCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";

function formatBytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function Status() {
    const currentLanguage = getCookie("language");

    const [serverName, setServerName] = useState("Loading...");
    const [cpu, setCpu] = useState("Loading...");
    const [ram, setRam] = useState("Loading...");
    const [player, setPlayer] = useState("Loading...");
    const [activePlayer, setActivePlayer] = useState("Loading...");
    const [uptime, setUptime] = useState("Loading...");

    const [mainVersion, setHStudioMainVersion] = useState("Loading...");
    const [subVersion, setHStudioSubVersion] = useState("Loading...");

    const [mainError, setMainError] = useState(false);
    const [subError, setSubError] = useState(false);

    const [mainShards, setMainShards] = useState([]);
    const [subShards, setSubShards] = useState([]);

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

    const getStatus = useCallback(() => {
        fetch("https://hstudio-api.hewkawar.xyz/info")
            .then((res) => res.json())
            .then((value) => updateStatus(value));
    }, []);

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
        const interval = setInterval(getStatus, 5000);

        return () => clearInterval(interval);
    }, [getStatus]);

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
                            <p>{serverName}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>CPU</p>
                            <p>{cpu}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>RAM</p>
                            <p>{ram}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Player</p>
                            <p>{player}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Active Player</p>
                            <p>{activePlayer}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Uptime</p>
                            <p>{uptime}</p>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="text-center">
                            <h1 className="text-2xl lg:text-4xl mb-5">HStudio Main (เวอร์ชั่น {mainVersion})</h1>
                            <div className="flex justify-center">
                                {mainError ? (
                                    <div className="bg-[#414141] text-center py-5 px-10 rounded m-5">
                                        <p>ไม่สามารถเข้าถึงบอทได้</p>
                                        <p className="text-[#f73c7a]">ออฟไลน์</p>
                                    </div>
                                ) : (
                                    mainShards.map((value: any, index) => (
                                        <div className="bg-[#414141] text-center py-5 px-10 rounded m-5" key={index}>
                                            <p>Shard: {index}</p>
                                            {value.online ? (
                                                <p className="text-[#3cf783]">ออนไลน์</p>
                                            ) : (
                                                <p className="text-[#f73c7a]">ออฟไลน์</p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl lg:text-4xl mb-5">HStudio 1 (เวอร์ชั่น {subVersion})</h1>
                            <div className="flex justify-center">
                                {subError ? (
                                    <div className="bg-[#414141] text-center py-5 px-10 rounded m-5">
                                        <p>ไม่สามารถเข้าถึงบอทได้</p>
                                        <p className="text-[#f73c7a]">ออฟไลน์</p>
                                    </div>
                                ) : (
                                    subShards.map((value: any, index) => (
                                        <div className="bg-[#414141] text-center py-5 px-10 rounded m-5" key={index}>
                                            <p>Shard: {index}</p>
                                            {value.online ? (
                                                <p className="text-[#3cf783]">ออนไลน์</p>
                                            ) : (
                                                <p className="text-[#f73c7a]">ออฟไลน์</p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
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
                            <p>{serverName}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>CPU</p>
                            <p>{cpu}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>RAM</p>
                            <p>{ram}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Player</p>
                            <p>{player}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Active Player</p>
                            <p>{activePlayer}</p>
                        </div>
                        <div className="bg-[#414141] m-2 p-8 text-center rounded">
                            <p>Uptime</p>
                            <p>{uptime}</p>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="text-center">
                            <h1 className="text-2xl lg:text-4xl mb-5">HStudio Main (Version {mainVersion})</h1>
                            <div className="flex justify-center">
                                {mainError ? (
                                    <div className="bg-[#414141] text-center py-5 px-10 rounded m-5">
                                        <p>Unavailable</p>
                                        <p className="text-[#f73c7a]">Offline</p>
                                    </div>
                                ) : (
                                    mainShards.map((value: any, index) => (
                                        <div className="bg-[#414141] text-center py-5 px-10 rounded m-5" key={index}>
                                            <p>Shard: {index}</p>
                                            {value.online ? (
                                                <p className="text-[#3cf783]">Online</p>
                                            ) : (
                                                <p className="text-[#f73c7a]">Offline</p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl lg:text-4xl mb-5">HStudio 1 (Version {subVersion})</h1>
                            <div className="flex justify-center">
                                {subError ? (
                                    <div className="bg-[#414141] text-center py-5 px-10 rounded m-5">
                                        <p>Unavailable</p>
                                        <p className="text-[#f73c7a]">Offline</p>
                                    </div>
                                ) : (
                                    subShards.map((value: any, index) => (
                                        <div className="bg-[#414141] text-center py-5 px-10 rounded m-5" key={index}>
                                            <p>Shard: {index}</p>
                                            {value.online ? (
                                                <p className="text-[#3cf783]">Online</p>
                                            ) : (
                                                <p className="text-[#f73c7a]">Offline</p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}