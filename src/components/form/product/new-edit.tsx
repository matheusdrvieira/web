import { InputPrice } from "@/components/hook-form/input-price";
import TextField from "@/components/hook-form/text-field";
import { paths } from "@/components/routes/paths";
import { RHFUploadImage } from "@/components/upload";
import { productFormSchema } from "@/schema/product/new";
import { ProductFormData } from "@/schema/types";
import axiosInstance from "@/service/axios";
import { endpoints } from "@/service/endpoints";
import { Product } from "@/types/product";
import { concatImgUrl } from "@/utils/concat-new-image-url";
import { fData } from "@/utils/format-number";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import FormProvider from "../form-provider";

type Props = {
    productId?: string;
};

export function ProductNewEditForm({ productId }: Props) {
    const [imageDirty, setImageDirty] = useState(false);
    const [product, setProduct] = useState<Product>({} as Product);
    const router = useRouter();

    const defaultValues = {
        name: "",
        description: "",
        price: 0,
        code: "",
        image: "",
        sku: "",
        isActive: true
    };

    const formValue = useMemo(
        () => ({
            name: product?.name,
            description: product?.description,
            price: product?.price,
            code: product?.code,
            sku: product?.sku,
            image: concatImgUrl(product?.image),
            isActive: product?.isActive,
        }),
        [product]
    );

    const methods = useForm<ProductFormData>({
        resolver: zodResolver(productFormSchema),
        defaultValues,
        values: formValue
    });

    const {
        reset,
        handleSubmit,
        setValue,
        formState: { isSubmitting, isDirty },
    } = methods;

    const onSubmit = handleSubmit(async (prod: ProductFormData) => {
        try {
            if (productId) {
                await axiosInstance.put(endpoints.product.update(productId), {
                    name: prod.name,
                    description: prod.description,
                    price: prod.price,
                    code: prod.code,
                    sku: prod.sku,
                    image: prod.image === concatImgUrl(product?.image) ? undefined : prod.image
                });
            } else {
                await axiosInstance.post(endpoints.product.create, {
                    name: prod.name,
                    description: prod.description,
                    price: prod.price,
                    code: prod.code,
                    sku: prod.sku,
                    image: prod.image,
                    isActive: prod.isActive
                });
            }
            reset();
            alert(productId ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!");
            router.push(paths.product.list);
        } catch (err) {
            console.error(err);
        }
    });

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(endpoints.product.get(productId));
                setProduct(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onload = async (event) => {
                if (event.target && event.target.result) {
                    setValue("image", event.target.result.toString(), { shouldValidate: true });
                }
            };

            reader.readAsDataURL(file);
            setImageDirty(true);
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ pt: 10, pb: 5, px: 3 }}>
                        <Box sx={{ mb: 5 }}>
                            <RHFUploadImage
                                name="image"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 3,
                                            mx: "auto",
                                            display: "block",
                                            textAlign: "center",
                                            color: "text.disabled",
                                        }}
                                    >
                                        Arquivos *.jpeg, *.jpg, *.png
                                        <br /> Tamanho maximo: {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            marginBottom={3}
                            display="grid"
                            gridTemplateColumns={{
                                xs: "repeat(1, 1fr)",
                                sm: "repeat(1, 1fr)",
                            }}
                        >
                            <TextField name="name" label="Nome" placeholder="Nome da campanha" />
                            <TextField name="description" label="Descrição" placeholder="Descrição..." multiline rows={4} />
                        </Box>

                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: "repeat(1, 1fr)",
                                sm: "repeat(1, 1fr)",
                                md: "repeat(2, 1fr)",
                            }}
                        >
                            <TextField name="code" label="Código" placeholder="Código do produto" />
                            <TextField name="sku" label="Código SKU" placeholder="Código do produto" />
                            <InputPrice name="price" label="Preço" />
                        </Box>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            marginTop={3}
                            display="grid"
                            gridTemplateColumns={{
                                xs: "repeat(1, 1fr)",
                                sm: "repeat(1, 1fr)",
                            }}
                        >
                        </Box>
                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={!isDirty && !imageDirty}>
                                {!productId ? "Criar Pruduto" : "Salvar alterações"}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider >
    );
}
