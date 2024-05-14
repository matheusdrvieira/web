"use client";

import FormProvider from "@/components/form/form-provider";
import TextField from "@/components/hook-form/text-field";
import { useBoolean } from "@/components/hooks/use-boolean";
import Iconify from "@/components/iconify";
import { paths } from "@/components/routes/paths";
import { RouterLink } from "@/components/routes/router-link";
import { signInFormSchema } from "@/schema/auth/signin";
import { SignInFormData } from "@/schema/types";
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

export default function SignIn() {
    const password = useBoolean();
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const defaultValues = {
        email: "",
        password: ""
    };

    const methods = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        defaultValues
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await axiosInstance.post(endpoints.auth.login, {
                email: data.email,
                password: data.password
            });

            setSession(res.data.access_token);
            router.push(paths.product.list);
        } catch (err) {
            reset();
            setErrorMsg(typeof err === "string" ? err : (err as Error).message);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
                <Typography variant="h4">Bem vindo de volta :)</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2"> Já possui uma conta? </Typography>

                    <Link href={paths.auth.signup} component={RouterLink} variant="subtitle2" color={primary.main}>
                        Cadastrar
                    </Link>
                </Stack>
            </Stack>

            <Stack spacing={2.5} marginBottom={3}>
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
                    Entrar
                </LoadingButton>
            </Stack>

            <Link href={paths.auth.forgot.mail} component={RouterLink} variant="body2" color="inherit" underline="always">
                Esqueceu sua senha?
            </Link>

            {!!errorMsg && (
                <Alert severity="error" sx={{ m: 3 }}>
                    {errorMsg}
                </Alert>
            )}
        </FormProvider >
    );
}
