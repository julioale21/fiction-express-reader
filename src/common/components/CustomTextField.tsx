import React from "react";
import theme from "@/config/themes/theme";
import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  PathValue,
} from "react-hook-form";


type CustomTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> = Omit<TextFieldProps, "name"> & {
  name: TName;
  control: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  defaultValue?: PathValue<TFieldValues, TName>;
};

function CustomTextField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  name,
  control,
  rules,
  defaultValue,
  label,
  inputRef,
  ...rest
}: CustomTextFieldProps<TFieldValues, TName>): React.ReactElement {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          inputRef={(instance) => {
            field.ref(instance);
            if (inputRef) {
              if (typeof inputRef === "function") {
                inputRef(instance);
              } else if (inputRef.hasOwnProperty("current")) {
                (
                  inputRef as React.MutableRefObject<HTMLInputElement | null>
                ).current = instance;
              }
            }
          }}
          margin="normal"
          fullWidth
          id={name}
          label={label}
          autoComplete="off"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputProps={{
            readOnly: true,
            sx: {
              borderRadius: "10px",
              backgroundColor: theme.palette.background.default,
              "&:hover": {
                backgroundColor: theme.palette.background.paper,
              },
            },
            ...rest.InputProps,
          }}
          {...rest}
        />
      )}
    />
  );
}

export { CustomTextField };
