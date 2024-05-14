import Box, { BoxProps } from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";
import { RouterLink } from "../routes/router-link";

export interface LogoProps extends BoxProps {
    disabledLink?: boolean;
}

/* eslint-disable react/display-name */
const Logo = forwardRef<HTMLDivElement, LogoProps>(
    ({ disabledLink = false, sx, ...other }, ref) => {
        const theme = useTheme();

        const PRIMARY_MAIN = theme.palette.primary.main;

        const logo = (
            <Box
                ref={ref}
                component="div"
                sx={{
                    width: 40,
                    height: 40,
                    display: "inline-flex",
                    ...sx,
                }}
                {...other}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 1000"
                >
                    <g transform="translate(500 500)">
                        <path
                            fill={PRIMARY_MAIN}
                            d="M1000.17 1075.6q-17.65 0-30.37-6.31a43.54 43.54 0 01-19.55-19.23q-5.94-11.22-6.71-28.08a4.87 4.87 0 015-5.13l10.9.22a4.85 4.85 0 014.75 4.56q1 17.23 9.55 26 9.66 9.88 26.48 9.88c3.75 0 16.41 0 26.38-9.88 12-11.85 10.21-28.17 10-30.24v-46.13a4.88 4.88 0 014.86-4.86h10.28a4.88 4.88 0 014.86 4.86v46.14c.35 5.31.72 19.55-6.4 32.66a45.34 45.34 0 01-10.23 13.08 43.34 43.34 0 01-9.22 6.15q-12.75 6.32-30.58 6.31z"
                            transform="translate(.94 137.287) scale(6.5374) translate(-1000.143 -1021)"
                        ></path>
                        <circle
                            r="12"
                            fill={PRIMARY_MAIN}
                            transform="translate(-297.45 -88.91) scale(6.5374)"
                        ></circle>
                        <circle
                            r="12"
                            fill={PRIMARY_MAIN}
                            transform="translate(297.45 -415.778) scale(6.5374)"
                        ></circle>
                    </g>
                </svg>

            </Box>
        );

        if (disabledLink) {
            return logo;
        }

        return (
            <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
                {logo}
            </Link>
        );
    }
);

export default Logo;
