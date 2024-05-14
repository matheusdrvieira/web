import { GuestGuard } from "@/guard/guest-guard";
import { AuthLayout } from "@/layout/auth-layout";
import { ReactNode } from "react";

export const metadata = {
    title: "E-commerce | Criar sua conta no e-commerce",
};

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
