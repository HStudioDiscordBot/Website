"use client";

import { getCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";

export default function Status() {
    const currentLanguage = getCookie("language");

    const [serverName, setServerName] = useState("Loading...");
    const [cpu, setCpu] = useState("Loading...");
    const [ram, setRam] = useState("Loading...");
    const [player, setPlayer] = useState("Loading...");
    const [activePlayer, setActivePlayer] = useState("Loading...");

    const [mainVersion, setHStudioMainVersion] = useState("Loading...");
    const [subVersion, setHStudioSubVersion] = useState("Loading...");

    const [mainError, setMainError] = useState(false);
    const [subError, setSubError] = useState(false);

    const [mainShards, setMainShards] = useState([]);
    const [subShards, setSubShards] = useState([]);

    function formatBytes(bytes: number) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

        setHStudioMainVersion(value.hstudio.main.version);
        setHStudioSubVersion(value.hstudio.sub.version);

        if (value.hstudio.main.error === 500) {
            setMainError(true);
        } else {
            setMainError(false);
        }
        if (value.hstudio.sub.error === 500) {
            setSubError(true);
        } else {
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