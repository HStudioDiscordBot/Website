"use client";

import { getCookie } from "cookies-next";

export default function Contact() {
    const currentLanguage = getCookie("language");

    return (
        <>
            {
                currentLanguage == "thai" ? (
                    <>
                        <title>ติดต่อ | HStudio</title>
                        <div className="w-[95vw] lg:w-[70vw] text-wrap mt-10">
                            <h1 className="text-2xl lg:text-4xl text-[#7DB1ED]">ติดต่อ</h1>

                            <div className="flex flex-row mt-5">
                                <a className="m-3 text-white flex border p-2 rounded border-transparent hover:border-[#7DB1ED] hover:text-[#7DB1ED] duration-150 transition-all" href="https://discord.gg/GzTbuZHTEx" target="_blank" rel="noopener noreferrer"><img src="/open_in_new_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="" /> Discord</a>
                                <a className="m-3 text-white flex border p-2 rounded border-transparent hover:border-[#7DB1ED] hover:text-[#7DB1ED] duration-150 transition-all" href="mailto:hstudio@hewkawar.xyz">Email</a>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <title>Contact us | HStudio</title>
                        <div className="w-[95vw] lg:w-[70vw] text-wrap mt-10">
                            <h1 className="text-2xl lg:text-4xl text-[#7DB1ED]">Contact us</h1>

                            <div className="flex flex-row mt-5">
                                <a className="m-3 text-white flex border p-2 rounded border-transparent hover:border-[#7DB1ED] hover:text-[#7DB1ED] duration-150 transition-all" href="https://discord.gg/GzTbuZHTEx" target="_blank" rel="noopener noreferrer"><img src="/open_in_new_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="" /> Discord</a>
                                <a className="m-3 text-white flex border p-2 rounded border-transparent hover:border-[#7DB1ED] hover:text-[#7DB1ED] duration-150 transition-all" href="mailto:hstudio@hewkawar.xyz">Email</a>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}