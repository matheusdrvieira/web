"use client";

import EmailInboxIcon from "@/components/Icon/email-inbox-icon";
import FormProvider from "@/components/form/form-provider";
import TextField from "@/components/hook-form/text-field";
import { useBoolean } from "@/components/hooks/use-boolean";
import Iconify from "@/components/iconify";
import { paths } from "@/components/routes/paths";
import { RouterLink } from "@/components/routes/router-link";
import { resetPasswordFormSchema } from "@/schema/auth/reset";
import { ResetPasswordFormData } from "@/schema/types";
import axiosInstance from "@/service/axios";
import { endpoints } from "@/service/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment } from "@mui/material";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResetPassoword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const password = useBoolean();
    const [errorMsg, setErrorMsg] = useState("");

    const defaultValues = {
        password: ""
    };

    const methods = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axiosInstance.patch(endpoints.auth.resetPassword, {
                email: email,
                password: data.password,
                token: token
            });

            router.push(paths.auth.signin);
        } catch (err) {
            setErrorMsg(typeof err === "string" ? err : (err as Error).message);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <EmailInboxIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
                <Typography variant="h3">Atualize sua senha!</Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Insira sua nova senha no campo abaixo <br /> <b>{email}</b>.
                </Typography>
            </Stack>

            <Stack spacing={3} alignItems="center" marginBottom={3}>
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
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Atualizar senha
                </LoadingButton>

                <Link
                    component={RouterLink}
                    href={paths.auth.signup}
                    color="inherit"
                    variant="subtitle2"
                    sx={{
                        alignItems: "center",
                        display: "inline-flex",
                    }}
                >
                    <Iconify icon="eva:arrow-ios-back-fill" width={16} />
                    Voltar para cadastro
                </Link>
            </Stack>

            {!!errorMsg && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMsg}
                </Alert>
            )}
        </FormProvider>
    );
}
