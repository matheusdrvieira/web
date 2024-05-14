"use client";

import { paths } from "@/components/routes/paths";
import { getUserFromLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

const USER_ACTIVE_STATUS = "ACTIVE";
const USER_PENDING_STATUS = "PENDING";

export function GuestGuard({ children }: Props) {
    const user = getUserFromLocalStorage();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            if (window.location.href === paths.auth.signin) {
                return router.push(`${paths.auth.signin}`);
            } else if (window.location.href === paths.auth.signup) {
                return router.push(`${paths.auth.signup}`);
            } else return;
        }

        if (user.status === USER_ACTIVE_STATUS) {
            return router.push(paths.product.list);
        } else if (user.status === USER_PENDING_STATUS) {
            return router.push(`${paths.auth.verify}?email=${user.email}`);
        }

    }, [user, router]);

    return <>{children}</>;
}
