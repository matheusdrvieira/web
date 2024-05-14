"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductNewEditForm } from "@/components/form/product/new-edit";
import { paths } from "@/components/routes/paths";
import Container from "@mui/material/Container";

type Props = {
    params: {
        id: string;
    }
}

export default function ProductEditView({ params }: Props) {
    return (
        <Container>
            <Breadcrumbs
                heading="Editar Produto"
                links={[
                    {
                        name: "Home",
                        href: paths.product.list,
                    },
                    { name: "Editar Produto" },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <ProductNewEditForm productId={params.id} />
        </Container>
    );
}
