"use client";

import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function DiscordCallbackInner() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const code = searchParams.get("code");

    useEffect(() => {
        if (!code) {
            router.push("/");
            return;
        }

        fetch("https://hstudio-api.hewkawar.xyz/auth/code", {
            method: "POST",
            body: JSON.stringify({
                code: code,
                redirect_uri: "https://hstudio.hewkawar.xyz/auth/discord/callback"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.ok ? res.json() : { error: true })
            .then((val) => {
                if (val.ok) {
                    setCookie("access_token", val.access_token, {
                        maxAge: 7 * 24 * 60 * 60
                    });

                    router.push("/");
                    router.refresh();
                }
            });
    }, [code, router]);

    return (
        <div>Loading login information...</div>
    );
}

export default function DiscordCallback() {
    return (
        <Suspense fallback={<div>Loading login information...</div>}>
            <DiscordCallbackInner />
        </Suspense>
    );
}