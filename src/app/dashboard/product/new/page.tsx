"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductNewEditForm } from "@/components/form/product/new-edit";
import { paths } from "@/components/routes/paths";
import { Container } from "@mui/material";

export default function ProductCreate() {
    return (
        <Container>
            <Breadcrumbs
                heading="Cadastre um Produto"
                links={[
                    {
                        name: "Home",
                        href: paths.product.list,
                    },
                    { name: "Novo produto" },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <ProductNewEditForm />
        </Container>
    );
}
