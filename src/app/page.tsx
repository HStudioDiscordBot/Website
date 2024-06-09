"use client";

import Link from "next/link";
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from "react";

export default function Home() {
  const [version, setVersion] = useState("Loading...");

  useEffect(() => {
    const versionCookie = getCookie("version");

    if (versionCookie) {
      setVersion(versionCookie);
    } else {
      fetch("https://hstudio-api.hewkawar.xyz/info").then((res) => res.json()).then((value) => {
        setCookie("version", value.hstudio.main.version);
        setVersion(value.hstudio.main.version);
      })
    }
  }, []);

  return (
    <>
      <div className="bg-[#414141] w-[50vw] rounded flex flex-col items-center p-5 mt-10">
        <img src="/HStudio.webp" width={300} height={300} alt="HStudio Logo" />
        <h1 className="text-4xl mt-3">HStudio (เวอร์ชั่น {version})</h1>
        <div className="p-5">
          <Link href="/invite" className="p-3 mx-2 text-[#5c9ae0] hover:bg-[#3d4c61] rounded transition-colors duration-150">เชิญบอท</Link>
          <Link href="https://discord.gg/yYydJ2tpcZ" target="_blank" className="p-3 mx-2 text-[#5c9ae0] hover:bg-[#3d4c61] rounded transition-colors duration-150">ดิสช่วยเหลือ</Link>
          <Link href="https://docs.hstudio.hewkawar.xyz/" target="_blank" className="p-3 mx-2 text-[#5c9ae0] hover:bg-[#3d4c61] rounded transition-colors duration-150">คู่มือการใช้งาน</Link>
        </div>
      </div>
    </>
  );
}
