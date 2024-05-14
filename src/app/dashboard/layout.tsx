"use client";

import { AuthGuard } from "@/guard/auth-guard";
import DashboardLayout from "@/layout/dashboard-layout";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function DashboardLayoutRoot({ children }: Props) {
    return (
        <AuthGuard>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </AuthGuard>
    );
}
