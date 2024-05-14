"use client";

import { GuestGuard } from "@/guard/guest-guard";
import { AuthLayout } from "@/layout/auth-layout";
import { ReactNode } from "react";

export default function SignInLayout({
    children
}: {
    children: ReactNode;
}) {
    return (
        <GuestGuard>
            <AuthLayout image="/assets/bg/signup-bg.jpg">
                {children}
            </AuthLayout>
        </GuestGuard>
    );
}
