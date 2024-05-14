import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

type Props = {
  children: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
    return (
        <Container component="main">
            <Stack
                sx={{
                    m: "auto",
                    maxWidth: 400,
                    minHeight: "100vh",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </Stack>
        </Container>
    );
}
