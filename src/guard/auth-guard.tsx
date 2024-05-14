"use client";

import { paths } from "@/components/routes/paths";
import { getUserFromLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const USER_PENDING_STATUS = "PENDING";

export function AuthGuard({ children }: Props) {
    const user = getUserFromLocalStorage();
    const router = useRouter();

    useEffect(() => {
        if (!user) return router.push(`${paths.auth.signin}`);

        if (user.status === USER_PENDING_STATUS) {
            return router.push(`${paths.auth.verify}?email=${user.email}`);
        }

    }, [user, router]);

    return <>{children}</>;
}
