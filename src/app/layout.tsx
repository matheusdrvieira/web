import "@/app/global.css";
import { ContextProvider } from "@/context";
import ThemeProvider from "@/theme/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Loja & Bazar",
    description: "E-commerce para vendas online",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <ContextProvider>
                        {children}
                    </ContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
