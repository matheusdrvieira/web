import { Product } from "@/types/product";
import { concatImgUrl } from "@/utils/concat-new-image-url";
import { getUser } from "@/utils/jwt";
import { Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useBoolean } from "../hooks/use-boolean";
import Iconify from "../iconify";
import Popover from "../popover";
import usePopover from "../popover/use-popover";

type Props = {
    product: Product;
    onEdit: VoidFunction;
    onDisable: VoidFunction;
}

export default function CardItem({ product, onEdit, onDisable }: Props) {
    const user = getUser();

    const confirm = useBoolean();

    const popover = usePopover();

    return (
        <Card
            sx={{
                maxHeight: 360,
                minHeight: 360,
                maxWidth: 300,
                height: "100%",
                backgroundColor: "#f5f5f5",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardMedia
                component="img"
                height="140"
                width="100%"
                sx={{objectFit: "contain",background:"none"}}
                image={concatImgUrl(product.image)}
                alt={concatImgUrl(product.image)}
            />
            <CardContent sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column", gap: 1 }}>
                <Box display="flex" justifyContent="space-between">
                    <Tooltip title={product.name} placement="top" arrow>
                        <Typography
                            gutterBottom
                            variant="h4"
                            component="div"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {product.name}
                        </Typography>
                    </Tooltip>
                    {user?.isAdmin && (
                        <IconButton color={popover.open ? "inherit" : "default"} onClick={popover.onOpen}>
                            <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                    )}
                </Box>
                <Box sx={{ flexGrow: 1, overflowY: "auto" }} display="flex" gap={3} flexDirection="column">
                    <Tooltip title={product.description} placement="top" arrow>
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {product.description}
                        </Typography>
                    </Tooltip>
                </Box>
                <Typography variant="h6" color="primary" mb={2}>
                    R$ {product.price.toFixed(2)}
                </Typography>
                <Typography variant="overline" color="text.disabled">
                    {product.code}
                </Typography>
            </CardContent>
            <Popover
                open={popover.open}
                onClose={popover.onClose}
                arrow="bottom-center"
                sx={{ width: 140 }}
            >
                <MenuItem
                    onClick={() => {
                        confirm.onTrue();
                        popover.onClose();
                        onDisable();
                    }}
                    sx={{ color: "error.main" }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Desativar
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        onEdit();
                    }}
                >
                    <Iconify icon="solar:pen-bold" />
                    Editar
                </MenuItem>
            </Popover>
        </Card>
    );
}
