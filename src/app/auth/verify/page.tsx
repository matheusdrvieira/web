"use client";

import EmailInboxIcon from "@/components/Icon/email-inbox-icon";
import FormProvider from "@/components/form/form-provider";
import Code from "@/components/hook-form/code";
import Iconify from "@/components/iconify";
import { paths } from "@/components/routes/paths";
import { RouterLink } from "@/components/routes/router-link";
import { verifyFormSchema } from "@/schema/auth/verify";
import { VerifyFormData } from "@/schema/types";
import axiosInstance from "@/service/axios";
import { endpoints } from "@/service/endpoints";
import { setSession } from "@/utils/jwt";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Verify() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [errorMsg, setErrorMsg] = useState("");
    const [timer, setTimer] = useState(0);

    const defaultValues = {
        confirmationCode: "",
        email: "",
    };

    const methods = useForm<VerifyFormData>({
        resolver: zodResolver(verifyFormSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await axiosInstance.patch(endpoints.auth.verify, {
                email: email,
                confirmationCode: data.confirmationCode
            });

            setSession(res.data.access_token);
            router.push(paths.dashboard.home);
        } catch (err) {
            setErrorMsg(typeof err === "string" ? err : (err as Error).message);
        }
    });

    const resendCode = async () => {
        try {
            await axiosInstance.post(endpoints.mail.resend, {
                email,
                type: "RESEND_MAIL"
            });
            setTimer(60);
        } catch (err) {
            setTimer(60);
            setErrorMsg(typeof err === "string" ? err : (err as Error).message);
        }
    };

    useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    }, [timer]);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <EmailInboxIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
                <Typography variant="h3">Verifique seu email!</Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Enviamos por e-mail um código de confirmação de 6 dígitos para <b>{email}</b>.
                    Insira o código abaixo
                </Typography>
            </Stack>

            <Stack spacing={3} alignItems="center" marginBottom={3}>
                <Code name="confirmationCode" />

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Verificar
                </LoadingButton>

                <Typography variant="body2">
                    {"Não recebeu um código? "}
                    {timer == 0 ? <Link
                        variant="subtitle2"
                        sx={{
                            cursor: "pointer",
                        }}
                        onClick={resendCode}
                    >
                        Reenviar código
                    </Link> :
                        <Link
                            variant="subtitle2"
                            sx={{
                                cursor: "pointer",
                            }}
                        >
                            Reenviar código em {timer} segundos
                        </Link>}
                </Typography>

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
