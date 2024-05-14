import { z } from "zod";
import { forgotFormSchema } from "../auth/forgot";
import { resetPasswordFormSchema } from "../auth/reset";
import { signInFormSchema } from "../auth/signin";
import { signUpFormSchema } from "../auth/signup";
import { verifyFormSchema } from "../auth/verify";
import { productFormSchema } from "../product/new";

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export type SignInFormData = z.infer<typeof signInFormSchema>;

export type VerifyFormData = z.infer<typeof verifyFormSchema>;

export type ForgotFormData = z.infer<typeof forgotFormSchema>;

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

export type ProductFormData = z.infer<typeof productFormSchema>;
