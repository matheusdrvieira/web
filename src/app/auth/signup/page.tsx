"use client";

import FormProvider from "@/components/form/form-provider";
import TextField from "@/components/hook-form/text-field";
import { useBoolean } from "@/components/hooks/use-boolean";
import Iconify from "@/components/iconify";
import { paths } from "@/components/routes/paths";
import { RouterLink } from "@/components/routes/router-link";
import { signUpFormSchema } from "@/schema/auth/signup";
import { SignUpFormData } from "@/schema/types";
import axiosInstance from "@/service/axios";
import { endpoints } from "@/service/endpoints";
import { primary } from "@/theme/palette";
import { setSession } from "@/utils/jwt";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
    const password = useBoolean();
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const defaultValues = {
        name: "Matheus",
        email: "matheus@gmail.com",
        password: "Abc123!"
    };

    const methods = useForm<SignUpFormData>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await axiosInstance.post(endpoints.auth.register,{
                name:data.name,
                email:data.email,
                password:data.password
            });
      
            const user = setSession(res.data.access_token);
          
            router.push(`${paths.auth.verify}?email=${user.email}`);
        } catch (err) {
            reset();
            setErrorMsg(typeof err === "string" ? err : (err as Error).message);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
                <Typography variant="h4">Crie Já sua conta :)</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2"> Já possui uma conta? </Typography>

                    <Link href={paths.auth.signin} component={RouterLink} variant="subtitle2" color={primary.main}>
                        Entrar
                    </Link>
                </Stack>
            </Stack>

            <Stack spacing={2.5}>
                <TextField name="name" label="Nome" />

                <TextField name="email" label="Email" />

                <TextField
                    name="password"
                    label="Senha"
                    type={password.value ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={password.onToggle} edge="end">
                                    <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <LoadingButton
                    fullWidth
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Criar Conta
                </LoadingButton>
            </Stack>

            <Typography
                component="div"
                sx={{
                    mt: 2.5,
                    textAlign: "center",
                    typography: "caption",
                    color: "text.secondary",
                    marginBottom:3
                }}
            >
                {"Ao criar conta, você concorda com os nossos "}
                <Link underline="always" color="text.primary">
                    Termos de uso
                </Link>
                {" e "}
                <Link underline="always" color="text.primary">
                    Políticas de privacidade
                </Link>
                .
            </Typography>

            {!!errorMsg && (
                <Alert severity="error" sx={{ m: 3 }}>
                    {errorMsg}
                </Alert>
            )}
        </FormProvider>
    );
}
