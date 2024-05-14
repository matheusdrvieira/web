import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>(({ ...other }, ref) => (
    <Link ref={ref} {...other} />
));
