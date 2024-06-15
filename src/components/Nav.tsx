"use client";

import Link from "next/link";
import { useState } from "react";
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

export default function Nav() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(true);
    const [isOpenLanguageSelector, setIsOpenLanguageSelector] = useState(false);
    const currentLanguage = getCookie("language");

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (lang: string) => {
        setCookie("language", lang);
        setIsOpenLanguageSelector(!isOpenLanguageSelector);
        router.refresh();
    };

    return (
        <nav className="p-5 flex justify-between">
            <div className="text-center md:w-full">
                <div className={isOpen ? "hidden md:flex md:justify-between" : "absolute top-0 right-0 h-full w-[90vw] bg-[#333333] md:relative md:bg-transparent md:w-auto"}>
                    <ul className="text-white flex flex-col mt-10 justify-center md:flex-row md:flex-wrap md:mt-0">
                        <li className="py-5 md:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 md:p-3" href="/">{currentLanguage == "thai" ? "หน้าหลัก" : "Home" }</Link></li>
                        <li className="py-5 md:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 md:p-3" href="/status">{currentLanguage == "thai" ? "สถานะบอท" : "Status" }</Link></li>
                        <li className="py-5 md:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 md:p-3" href="/terms-of-service">{currentLanguage == "thai" ? "ข้อกำหนดในการให้บริการ" : "Terms of Service" }</Link></li>
                        <li className="py-5 md:py-0"><Link className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 md:p-3" href="/privacy-policy">{currentLanguage == "thai" ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy" }</Link></li>
                    </ul>

                    <div className="text-white text-center">
                        <button onClick={() => setIsOpenLanguageSelector(!isOpenLanguageSelector)} className="px-3">Language</button>
                        <div id="language-content" className={isOpenLanguageSelector ? "absolute rounded bg-[#414141] min-w-40 overflow-auto z-10 flex flex-col md:right-1 md:mt-4" : "hidden"}>
                            <button className="p-3 hover:bg-[#333333]" onClick={() => selectLanguage("thai")}>ไทย</button>
                            <button className="p-3 hover:bg-[#333333]" onClick={() => selectLanguage("english")}>English</button>
                        </div>
                    </div>
                </div>

                <button onClick={togglePanel} className="absolute text-white top-4 right-4 md:hidden">
                    <svg className="block h-8 w-8 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>
            </div>
        </nav>
    )
}