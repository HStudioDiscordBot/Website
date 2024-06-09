"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function TOS() {
    const router = useRouter();

    useEffect(() => {
        router.push("/terms-of-service");
    }, [router]);

    return (
        <>Loading...</>
    )
}