import { z } from "zod";

export const verifyFormSchema = z.object({
    confirmationCode: z
        .string({ required_error: "Código é obrigatório" })
        .min(6, { message: "Código deve conter 6 caracteres." })
});
