import { z } from "zod";

export const resetPasswordFormSchema = z.object({
    password: z.string()
        .min(6, { message: "A senha deve conter no mínimo 6 caracteres" })
        .regex(/(?=[A-Z])/, {
            message: "A senha deve conter ao menos uma letra maiúscula"
        })
        .regex(/(?=[a-z])/, {
            message: "A senha deve conter ao menos uma letra minúscula"
        })
        .regex(/(?=[0-9])/, {
            message: "A senha deve conter ao menos um número"
        })
        .regex(/(?=\W)/, {
            message: "A senha deve conter ao menos um caractere especial"
        })
        .regex(/(?![.\n]).*$/, {
            message: "A senha é inválida"
        })
        .refine(value => !/\s/.test(value), {
            message: "A senha não pode conter espaços em branco"
        })
});
