import { z } from "zod";

export const forgotFormSchema = z.object({
    email: z
        .string({ required_error: "Email é obrigatório" })
        .email({ message: "Digite um E-mail válido" })
});
