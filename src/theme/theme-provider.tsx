"use client";

import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { ReactNode, useMemo } from "react";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";

export default function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
    const themeSettings = useMemo(
        () => ({
            palette: {
                ...palette("light" || "dark"),
            },
            shadows: shadows("light" || "dark"),
            shape: { borderRadius: 8 },
            typography: typography,
        }), []);

    const theme = createTheme(themeSettings as ThemeOptions);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
