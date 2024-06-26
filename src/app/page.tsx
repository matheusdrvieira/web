"use client";

import { paths } from "@/components/routes/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(paths.product.list);
    }, [router]);

    return null;
};

export default RedirectPage;
