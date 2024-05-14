"use client";

import CompactLayout from "@/layout/compact-layout";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function VerifyLayout({ children }: Props) {
    return (
        <CompactLayout>{children}</CompactLayout>
    );
}
