import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
    name: string;
};

export default function TextField({ name, helperText, type, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <MuiTextField
                    {...field}
                    fullWidth
                    inputRef={ref}
                    type={type}
                    value={type === "number" && field.value === 0 ? "" : field.value}
                    onKeyDown={(event) => {
                        if (type === "number" && !/^\d$|^Backspace$|^Delete$/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    onChange={(event) => {
                        if (type === "number") {
                            field.onChange(Number(event.target.value));
                        } else {
                            field.onChange(event.target.value);
                        }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                />
            )}
        />
    );
}
