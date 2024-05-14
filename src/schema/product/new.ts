import { z } from "zod";

export const productFormSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    description: z.string().nullable(),
    price: z.number().min(1, { message: "O Preço é obrigatório" }),
    code: z.string().min(1, { message: "O Código é obrigatório" }).transform(arh => String(arh)),
    sku: z.string().min(1, { message: "O Sku é obrigatório" }).transform(arh => String(arh)),
    isActive: z.boolean().default(true),
    image: z.string({ invalid_type_error: "A imagem é obrigatória" }).min(1, { message: "A imagem é obrigatória" }).or(z.undefined()),
});
