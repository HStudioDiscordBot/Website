"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import { Skeleton } from '@mui/material';

export default function Nav() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(true);
    const [isLoadLogined, setIsLoadLogined] = useState(false);
    const [isLogined, setIsLogined] = useState(false);
    const [account, setAccount]: any = useState({});
    const [isOpenLanguageSelector, setIsOpenLanguageSelector] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const currentLanguage = getCookie("language");
    const accessToken = getCookie("access_token");

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (lang: string) => {
        setCookie("language", lang, {
            maxAge: 14 * 24 * 60 * 60
        });
        setIsOpenLanguageSelector(!isOpenLanguageSelector);
        router.refresh();
    };

    async function logout() {
        if (accessToken) {
            try {
                fetch("https://hstudio-api.hewkawar.xyz/auth/token/revoke", {
                    method: "POST",
                    body: JSON.stringify({
                        token: accessToken
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async (val) => {
                    if (val.ok) {
                        const data = await val.json();

                        if (data.ok) {
                            deleteCookie("access_token");
                            router.refresh();
                            return true
                        } else return false
                    } else return false
                });
            } catch (err) {
                return false
            }
        }
    }

    useEffect(() => {
        if (accessToken) {
            fetch("https://discord.com/api/v10/users/@me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((res) => res.ok ? res.json() : null).then((value) => {
                if (!value) {
                    deleteCookie("access_token");
                    setIsLogined(false);
                } else {
                    setIsLogined(true);
                    setAccount(value);
                }
                setIsLoadLogined(true);
            })
        } else {
            deleteCookie("access_token");
            setIsLogined(false);
            setIsLoadLogined(true);
        }
    }, [accessToken]);

    return (
        <nav className="p-5 flex justify-between">
            <div className="text-center lg:w-full">
                <div className={isOpen ? "hidden lg:flex lg:justify-between" : "flex flex-col lg:flex-row lg:justify-between items-center absolute top-0 right-0 h-full w-[90vw] bg-[#333333] lg:relative lg:bg-transparent lg:w-auto"}>
                    <ul className="text-white items-center flex flex-col mt-10 justify-center lg:flex-row lg:flex-wrap lg:mt-0">
                        <li className="py-5 lg:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 lg:p-3" href="/">{currentLanguage == "thai" ? "หน้าหลัก" : "Home"}</Link></li>
                        <li className="py-5 lg:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 lg:p-3" href="/store">{currentLanguage == "thai" ? "ร้านค้า" : "Store"}</Link></li>
                        <li className="py-5 lg:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 lg:p-3" href="/status">{currentLanguage == "thai" ? "สถานะบอท" : "Status"}</Link></li>
                        <li className="py-5 lg:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 lg:p-3" href="/terms-of-service">{currentLanguage == "thai" ? "ข้อกำหนดในการให้บริการ" : "Terms of Service"}</Link></li>
                        <li className="py-5 lg:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 lg:p-3" href="/privacy-policy">{currentLanguage == "thai" ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy"}</Link></li>
                        <li className="py-5 lg:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 lg:p-3" href="/contact">{currentLanguage == "thai" ? "ติดต่อ" : "Contact"}</Link></li>
                    </ul>

                    <div className="text-white items-center text-center flex flex-col lg:flex-row w-1/4 lg:justify-end">
                        <button onClick={() => setIsOpenLanguageSelector(!isOpenLanguageSelector)} className="px-3 py-4 lg:py-0 hover:text-[#5c9ae0] transition-colors duration-150 ">Language</button>
                        <div id="language-content" className={isOpenLanguageSelector ? "lg:absolute rounded bg-[#414141] min-w-40 overflow-auto z-10 flex flex-col lg:right-40 lg:mt-32 shadow-lg" : "hidden"}>
                            <button className="p-3 hover:bg-[#333333]" onClick={() => selectLanguage("thai")}>ไทย</button>
                            <button className="p-3 hover:bg-[#333333]" onClick={() => selectLanguage("english")}>English</button>
                        </div>
                        {isLoadLogined ? isLogined ? (
                            <>
                                <div onClick={() => setIsOpenProfile(!isOpenProfile)} className="flex items-center cursor-pointer hover:text-[#5c9ae0] transition-colors duration-150">
                                    <img className="w-10 rounded-full" src={account.avatar ? `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${(account.id >> 22) % 6}.png`} alt={account.username} />
                                    <p className="px-2">{account.global_name}</p>
                                </div>
                                <div id="profile-content" className={isOpenProfile ? "lg:absolute rounded bg-[#414141] min-w-40 overflow-auto z-10 flex flex-col lg:right-2 lg:mt-32 shadow-lg" : "hidden"}>
                                    <button className="p-3 hover:bg-[#333333]" onClick={() => logout()}>Logout</button>
                                </div>
                            </>
                        ) : (<button onClick={() => router.push("https://discord.com/oauth2/authorize?client_id=1105873690022924450&response_type=code&redirect_uri=https%3A%2F%2Fhstudio.hewkawar.xyz%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds")} className="mt-5 text-nowrap lg:mt-0 px-3 bg-blue-500 p-2 rounded">{currentLanguage == "thai" ? "เข้าสู่ระบบด้วย Discord" : "Login with Discord"}</button>) : (<Skeleton variant="rounded" width={170} height={40} />)}
                    </div>

                </div>

                <button onClick={togglePanel} className="absolute text-white top-4 right-4 lg:hidden">
                    <svg className="block h-8 w-8 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>
            </div>
        </nav>
    )
}