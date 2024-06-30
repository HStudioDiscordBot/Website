"use client";

import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DiscordCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const code = searchParams.get("code");

    if (!code) return router.push("/");

    useEffect(() => {
        fetch("https://hstudio-api.hewkawar.xyz/auth/code", {
            method: "POST",
            body: JSON.stringify({
                code: code,
                redirect_uri: "http://localhost:3000/auth/discord/callback"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.ok ? res.json() : { error: true }).then((val) => {
            if (val.ok) {
                setCookie("access_token", val.access_token, {
                    maxAge: 7 * 24 * 60 * 60
                });

                router.push("/");
                router.refresh();
            }
        });
        

    }, [code, router])
    
    return (
        <div>Loading login information...</div>
    )
}