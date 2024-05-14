import { Popover as MuiPopover, PopoverOrigin } from "@mui/material";
import { menuItemClasses } from "@mui/material/MenuItem";
import { StyledArrow } from "./styles";
import { MenuPopoverProps } from "./types";
import { getPosition } from "./utils";

export default function Popover({
  open,
  children,
  arrow = "top-right",
  hiddenArrow,
  sx,
  ...other
}: MenuPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <MuiPopover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      slotProps={{
        paper: {
          sx: {
            width: "auto",
            overflow: "inherit",
            ...style,
            [`& .${menuItemClasses.root}`]: {
              "& svg": {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} />}

      {children}
    </MuiPopover>
  );
}
