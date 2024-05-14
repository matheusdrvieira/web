import { BreadcrumbsProps as MuiBreadcrumbsProps } from "@mui/material";

export type BreadcrumbsLinkProps = {
    name?: string;
    href?: string;
    icon?: React.ReactElement;
};

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
    heading?: string;
    moreLink?: string[];
    activeLast?: boolean;
    action?: React.ReactNode;
    links: BreadcrumbsLinkProps[];
    hide?: boolean
}
