"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function TOS() {
    const router = useRouter();

    useEffect(() => {
        router.push("/privacy-policy");
    }, [router]);

    return (
        <>Loading...</>
    )
}