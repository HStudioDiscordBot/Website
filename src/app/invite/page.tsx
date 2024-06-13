"use client";

import Link from "next/link";

export default function Invite() {
    return (
        <>
            <title>เชิญบอท | HStudio</title>
            <h1 className="text-2xl lg:text-4xl">บอทในเครือ HStudio</h1>
            <div className="flex flex-raw flex-wrap justify-center">
                <div className="bg-[#414141] p-5 flex rounded m-5">
                    <img src="/profile/0.png" alt="HStudio Main" className="w-[100px] rounded-full" />
                    <div className="flex flex-col justify-around ml-5 text-center">
                        <p className="text-2xl">HStudio</p>
                        <Link href="https://discord.com/oauth2/authorize?client_id=1105873690022924450" target="_blank" className="text-[#5c9ae0] w-[120px] bg-[#3d4c61] py-1 px-2 rounded hover:bg-[#475870] transition-colors duration-150">Invite HStudio</Link>
                    </div>
                </div>
                <div className="bg-[#414141] p-5 flex rounded m-5">
                    <img src="/profile/1.png" alt="HStudio 1" className="w-[100px] rounded-full" />
                    <div className="flex flex-col justify-around ml-5 text-center">
                        <p className="text-2xl">HStudio (1)</p>
                        <Link href="https://discord.com/oauth2/authorize?client_id=1140130682094497823" target="_blank" className="text-[#5c9ae0] w-[120px] bg-[#3d4c61] py-1 px-2 rounded hover:bg-[#475870] transition-colors duration-150">Invite HStudio (1)</Link>
                    </div>
                </div>
            </div>
        </>
    )
}