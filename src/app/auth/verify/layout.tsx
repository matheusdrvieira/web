"use client";

import CompactLayout from "@/layout/compact-layout";
import { ReactNode, Suspense } from "react";

type Props = {
    children: ReactNode;
};

export default function VerifyLayout({ children }: Props) {
    return (
        <Suspense>
            <CompactLayout>
                {children}
            </CompactLayout>
        </Suspense>
    );
}
