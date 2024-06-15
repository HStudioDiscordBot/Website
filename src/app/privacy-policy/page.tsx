"use client";

export default function PrivacyPolicy() {
    return (
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
    )
}