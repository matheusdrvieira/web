import Iconify from "@/components/iconify";
import { FilterContext } from "@/context";
import { logout } from "@/utils/logout";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { paths } from "../routes/paths";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
    },
}));

export default function Header() {
    const { setFilter } = useContext(FilterContext);
    const router = useRouter();

    return (
        <AppBar position="static" sx={{ paddingX: 14, paddingY: 2 }}>
            <Toolbar>
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    Loja & Bazar
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <Iconify icon="eva:search-outline" width={18} />
                    </SearchIconWrapper>
                    <StyledInputBase
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Procurar…"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{
                    display: {
                        xs: "none", md: "flex", "&:hover": {
                            cursor: "pointer"
                        },
                    }
                }}>

                    <IconButton
                        color="inherit"
                        onClick={() => {
                            logout();
                            router.push(paths.auth.signin);
                        }}>
                        <Iconify icon="eva:log-out-outline" width={30} />
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar >
    );
}
