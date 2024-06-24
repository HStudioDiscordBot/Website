"use client";

import { getCookie } from "cookies-next";

export default function TermsOfService() {
    const currentLanguage = getCookie("language");

    return (
        <>
            {
                currentLanguage == "thai" ? (
                    <>
                        <title>ข้อกำหนดในการให้บริการ | HStudio</title>
                        <div className="w-[95vw] lg:w-[70vw] text-wrap mt-10">
                            <h1 className="text-2xl lg:text-4xl text-[#7DB1ED]">ข้อกำหนดในการให้บริการ</h1>
                            <h3 className="text-xl lg:text-2xl">ข้อตกลงนี้ระบุถึงบอทดิสคอร์ด &quot;HStudio&quot; หรือกล่าวได้ว่า &quot;บอทที่อยู่ในเครือ HStudio&quot; หากผู้ใดใช้งานบอทในเครือ &quot;HewkawDiscordBotProject&quot; ถือว่ารับข้อตกลงดังต่อไปนี้</h3>
                            <ul className="list-disc ml-8">
                                <li>บอทในเครือ &quot;HStudio&quot; ไม่รับประกันออนไลน์ 99.99</li>
                                <li>บอทในเครือ &quot;HStudio&quot; จะปิดให้บริการเมื่อไหร่ก็ได้โดยไม่ต้องแจ้งให้ทราบ</li>
                                <li>บอทในเครือ &quot;HStudio&quot; จะปิดเพื่อปรับปรุงเมื่อไหร่ก็ได้</li>
                                <li>ทาง &quot;HStudio&quot; ไม่สามารถและมิอาจรับประกันความปลอดภัยของดิสที่ใช้งานบอท ผู้ใช้งานควรศึกษาและมีความรู้ก่อนตัดสินใจใช้งานบอท</li>
                                <li>ทาง &quot;HStudio&quot; มีสิทธิ์ที่จะปฏิเสธในการให้ใช้งานบอท HStudio โดยที่ไม่ต้องระบุเหตุผล</li>
                                <li>ข้อตกลงที่กล่าวมานั้น สามารถเปลี่ยนแปลงได้ตลอดโดยไม่ต้องแจ้งให้ทราบล่วงหน้า</li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <title>Terms of Service | HStudio</title>
                        <div className="w-[95vw] lg:w-[70vw] text-wrap mt-10">
                            <h1 className="text-2xl lg:text-4xl text-[#7DB1ED]">Terms of Service</h1>
                            <h3 className="text-xl lg:text-2xl">This terms of service applies to those who use &quot;HStudio&quot; or &quot;Any Discord Bots From HStudio&quot; and agree to &quot;HStudio&quot; to these terms of service.</h3>
                            <ul className="list-disc ml-8">
                                <li>All HStudio&apos;s bot do not guarantee to be online 99.99% all the time.</li>
                                <li>All HStudio&apos;s bot bots can stop providing service at any time without prior notice.</li>
                                <li>All HStudio&apos;s bot bots can be turned offline at any time without prior notice for maintenance.</li>
                                <li>All HStudio&apos;s bot do not guarantee the safety of whose servers using the bot.</li>
                                <li>We can deny service of HStudio&apos;s bots to anyone, anytime without prior notice.</li>
                                <li>All terms of service can be changed without prior notice.</li>
                            </ul>
                        </div>
                    </>
                )
            }
        </>
    )
}