"use client";

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import useResponsive from "../components/hooks/use-responsive";

type Props = {
    image?: string;
    children: React.ReactNode;
};

export function AuthLayout({ children, image }: Props) {
    const mdUp = useResponsive("up", "md");

    return (
        <Box sx={{ display: "flex", alignItems: "stretch", minHeight: "100vh" }}>
            {mdUp && (
                <Box sx={{ flex: 3, position: "relative", overflow: "hidden" }}>
                    <Box
                        component="img"
                        alt="auth"
                        src={image}
                        sx={{
                            objectFit: "cover",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </Box>
            )}

            <Stack sx={{ flex: 1, justifyContent: "center", px: 10 }}>
                {children}
            </Stack>
        </Box>
    );
}
