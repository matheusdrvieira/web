import { Icon, IconifyIcon } from "@iconify/react";
import Box, { BoxProps } from "@mui/material/Box";
import { forwardRef } from "react";

export type IconifyProps = IconifyIcon | string;

interface Props extends BoxProps {
    icon: IconifyProps;
}

// eslint-disable-next-line react/display-name
const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
    <Box
        ref={ref}
        component={Icon}
        className="component-iconify"
        icon={icon}
        sx={{ width, height: width, ...sx }}
        {...other}
    />
));

export default Iconify;
