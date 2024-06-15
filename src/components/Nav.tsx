"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(true);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="p-5 flex justify-between">
            <div className="text-center">
                <div className={isOpen ? "hidden md:flex" : "absolute top-0 right-0 h-full w-[90vw] bg-[#333333] md:relative md:bg-transparent md:w-auto"}>
                    <ul className="text-white flex flex-col mt-10 justify-center md:flex-row md:flex-wrap md:mt-0">
                        <li className="py-5 md:py-0"><Link onClick={togglePanel} className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 md:p-3" href="/">หน้าหลัก</Link></li>
                        <li className="py-5 md:py-0"><Link onClick={togglePanel} className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 md:p-3" href="/status">สถานะบอท</Link></li>
                        <li className="py-5 md:py-0"><Link onClick={togglePanel} className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 md:p-3" href="/terms-of-service">ข้อกำหนดในการให้บริการ</Link></li>
                        <li className="py-5 md:py-0"><Link onClick={togglePanel} className="p-5 hover:text-[#5c9ae0] transition-colors duration-150 md:p-3" href="/privacy-policy">นโยบายความเป็นส่วนตัว</Link></li>
                    </ul>
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