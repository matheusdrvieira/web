import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BreadcrumbsLink } from "./link-item";
import { BreadcrumbsProps } from "./types";

export function Breadcrumbs({
    links,
    action,
    heading,
    moreLink,
    activeLast,
    sx,
    hide,
    ...other
}: BreadcrumbsProps) {
    const lastLink = links[links.length - 1].name;

    return (
        <Box sx={{ ...sx }}>
            <Stack direction="row" alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                    {heading && (
                        <Typography variant="h3" gutterBottom>
                            {heading}
                        </Typography>
                    )}

                    {!!links.length && !hide && (
                        <MuiBreadcrumbs separator={<Separator />} {...other}>
                            {links.map((link) => (
                                <BreadcrumbsLink
                                    key={link.name || ""}
                                    link={link}
                                    activeLast={activeLast}
                                    disabled={link.name === lastLink}
                                />
                            ))}
                        </MuiBreadcrumbs>
                    )}
                </Box>

                {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
            </Stack>

            {!!moreLink && (
                <Box sx={{ mt: 2 }}>
                    {moreLink.map((href) => (
                        <Link
                            key={href}
                            href={href}
                            variant="body2"
                            target="_blank"
                            rel="noopener"
                            sx={{ display: "table" }}
                        >
                            {href}
                        </Link>
                    ))}
                </Box>
            )}
        </Box>
    );
}

function Separator() {
    return (
        <Box
            component="span"
            sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "text.disabled",
            }}
        />
    );
}
