"use client";

import { useRouter } from "next/navigation";

export default function TOS() {
    const router = useRouter();

    router.push("/terms-of-service");

    return (
        <>Loading...</>
    )
}
