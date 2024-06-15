"use client";

import { getCookie } from "cookies-next";

export default function PrivacyPolicy() {
    const currentLanguage = getCookie("language");

    return (
        <>
            {
                currentLanguage == "thai" ? (
                    <>
                        <title>นโยบายข้อมูลส่วนตัว | HStudio</title>
                        <div className="w-[95vw] lg:w-[70vw] text-wrap mt-10">
                            <h1 className="text-2xl lg:text-4xl text-[#5c9ae0]">นโยบายข้อมูลส่วนตัว</h1>
                            <h3 className="text-xl lg:text-2xl">ข้อตกลงนี้ระบุถึงบอทดิสคอร์ด &quot;HStudio&quot; หรือกล่าวได้ว่า &quot;บอทที่อยู่ในเครือ HStudio&quot; หากผู้ใดใช้งานบอทในเครือ &quot;HStudio&quot; ถือว่ายอมรับการเก็บข้อมูลดังต่อไปนี้</h3>
                            <ul className="list-disc ml-8">
                                <li>จำนวนผู้ใช้งานบอท</li>
                                <li>ห้องดิสที่บอทอยู่</li>
                                <li>จำนวนการใช้งานบอท ณ ขณะนั้น</li>
                                <li>ข้อมูลของผู้ใช้งานบอทและข้อมูลดิสที่บอทอยู่แค่ไอดีเท่านั้น</li>
                                <li>ข้อมูลการใช้งานคำสั่งเพลง เช่น Platforms ที่เล่นเยอะสุด (เฉพาะบอทเพลง)</li>
                            </ul>
                            <h3 className="text-xl lg:text-2xl mt-5">ทางเราจะไม่เก็บข้อมูล</h3>
                            <ul className="list-disc ml-8">
                                <li>ข้อความที่ส่งในห้องดิสที่ HStudio สามารถมองเห็นได้</li>
                                <li>ข้อมูลผู้ที่ใช้งานบอทและดิสนอกเหนือจากไอดี</li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <title>Privacy Policy | HStudio</title>
                        <div className="w-[95vw] lg:w-[70vw] text-wrap mt-10">
                            <h1 className="text-2xl lg:text-4xl text-[#5c9ae0]">Privacy Policy</h1>
                            <h3 className="text-xl lg:text-2xl">This applies to those who use &quot;HStudio&quot; or &quot;Any Discord Bots From HStudio&quot; and agree to have &quot;HStudio&quot; collecting the following data.</h3>
                            <ul className="list-disc ml-8">
                                <li>The number of people using the bot.</li>
                                <li>The number of servers the bot is in.</li>
                                <li>Real-time data of the number of people who use it at that current time.</li>
                                <li>User ID and Server ID.</li>
                                <li>The number of commands has been issued.</li>
                            </ul>
                            <h3 className="text-xl lg:text-2xl mt-5">We will not collect the following data.</h3>
                            <ul className="list-disc ml-8">
                                <li>All messages.</li>
                                <li>All data besides what has been mentioned above.</li>
                            </ul>
                        </div>
                    </>
                )
            }
        </>
    )
}