import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";
import { UploadProps } from "./types";
import { UploadImage } from "./upload-image";

interface Props extends Omit<UploadProps, "file"> {
    name: string;
    multiple?: boolean;
}

export function RHFUploadImage({ name, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <UploadImage error={!!error} file={field.value} {...other} />

                    {!!error && (
                        <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                            {error.message}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    );
}
