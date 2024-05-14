"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import CardList from "@/components/card/card-list";
import Iconify from "@/components/iconify";
import { paths } from "@/components/routes/paths";
import { RouterLink } from "@/components/routes/router-link";
import { getUser } from "@/utils/jwt";
import { Button, Container, Divider } from "@mui/material";

export default function ProductsList() {
    const user = getUser();

    return (
        <Container>
            <Breadcrumbs
                heading="Produtos"
                links={[
                    {
                        name: "Produtos",
                        href: paths.dashboard.home,
                    },
                ]}
                action={
                    Boolean(user?.isAdmin) && (
                        <Button
                            component={RouterLink}
                            href={paths.product.create}
                            variant="contained"
                            startIcon={<Iconify icon="mingcute:add-line" />}
                        >
                            Cadastrar novo produto
                        </Button>
                    )}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Divider sx={{ mb: 6 }} />
            <CardList />
        </Container>
    );
}
