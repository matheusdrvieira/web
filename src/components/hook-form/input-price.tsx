import TextField, { TextFieldProps } from "@mui/material/TextField";
import { CurrencyInput } from "react-currency-mask";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
    name: string;
};

export function InputPrice({ name, helperText, type, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <CurrencyInput
                    value={field.value}
                    onChangeValue={(_, value) => {
                        field.onChange(value);
                    }}
                    InputElement={
                        <TextField
                            onKeyDown={(event) => {
                                if (type === "number" && !/^\d$|^Backspace$|^Delete$/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            {...field}
                            fullWidth
                            inputRef={ref}
                            type={type}
                            error={!!error}
                            helperText={error ? error?.message : helperText}
                            {...other}
                        />
                    }
                />
            )}
        />
    );
}
