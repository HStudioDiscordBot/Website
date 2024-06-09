"use client";

import Link from "next/link";

export default function Nav() {
    return (
        <nav className="p-5 flex justify-between">
            <div className="text-center">
                <ul className="text-white flex flex-wrap justify-center">
                    <li><Link className="p-3 hover:text-[#5c9ae0] transition-colors duration-150" href="/">หน้าหลัก</Link></li>
                    <li><Link className="p-3 hover:text-[#5c9ae0] transition-colors duration-150" href="/status">สถานะบอท</Link></li>
                    <li><Link className="p-3 hover:text-[#5c9ae0] transition-colors duration-150" href="/terms-of-service">ข้อกำหนดในการให้บริการ</Link></li>
                    <li><Link className="p-3 hover:text-[#5c9ae0] transition-colors duration-150" href="/privacy-policy">นโยบายความเป็นส่วนตัว</Link></li>
                </ul>
            </div>
        </nav>
    )
}