import { FilterContext } from "@/context";
import axiosInstance from "@/service/axios";
import { endpoints } from "@/service/endpoints";
import { ProductClient } from "@/service/product";
import { Product } from "@/types/product";
import { getUser } from "@/utils/jwt";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { paths } from "../routes/paths";
import CardItem from "./card-item";

export default function CardList() {
    const { filter } = useContext(FilterContext);

    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const client = useMemo(() => new ProductClient(router), [router]);

    const user = getUser();
    const isActive = user?.isAdmin ? undefined : true;

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await client.fetchProducts(isActive, 1, 100, filter);
                setProducts(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, [client, filter, isActive]);

    const handleEdit = useCallback(
        (id: string) => {
            router.push(paths.product.edit(id));
        },
        [router]
    );

    const handleDisable = useCallback(
        async (id: string) => {
            const isConfirmed = confirm("Tem certeza que deseja desabilitar esse Produto?");

            if (!isConfirmed) return;

            const deleteRow = products.filter((row) => row.id !== id);

            await axiosInstance.patch(endpoints.product.patch(id), {
                isActive: false
            });

            setProducts(deleteRow);

            alert("Produto desativado successo!");
        }, [products]
    );

    return (
        <Grid container spacing={6}>
            {products.map((product) => (
                <Grid item xs={12} md={6} lg={3} key={product.id}>
                    <CardItem
                        product={product}
                        onEdit={() => handleEdit(product.id)}
                        onDisable={() => handleDisable(product.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
