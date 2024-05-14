"use client";

import EmailInboxIcon from "@/components/Icon/email-inbox-icon";
import FormProvider from "@/components/form/form-provider";
import TextField from "@/components/hook-form/text-field";
import Iconify from "@/components/iconify";
import { paths } from "@/components/routes/paths";
import { RouterLink } from "@/components/routes/router-link";
import { forgotFormSchema } from "@/schema/auth/forgot";
import { ForgotFormData } from "@/schema/types";
import axiosInstance from "@/service/axios";
import { endpoints } from "@/service/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Forgot() {
    const [errorMsg, setErrorMsg] = useState("");
    const [timer, setTimer] = useState(0);

    const defaultValues = {
        email: "",
    };

    const methods = useForm<ForgotFormData>({
        resolver: zodResolver(forgotFormSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axiosInstance.post(endpoints.auth.forgot, {
                email: data.email,
            });

            setTimer(60);
        } catch (err) {
            setTimer(60);
            setErrorMsg(typeof err === "string" ? err : (err as Error).message);
        }
    });

    useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    }, [timer]);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <EmailInboxIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
                <Typography variant="h3">Verifique seu email!</Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Enviaremos um e-mail com um link para redifinir sua senha. <br />
                    <b>Insira seu e-mail abaixo</b>
                </Typography>
            </Stack>

            <Stack spacing={3} alignItems="center" marginBottom={3}>
                <TextField name="email" label="Email" />

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={timer !== 0}
                >
                    Enviar {timer > 1 && timer}
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
