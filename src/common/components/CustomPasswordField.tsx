"use client";
import React, { useState } from "react";
import theme from "@/config/themes/theme";
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseControllerProps,
} from "react-hook-form";

type CustomPasswordFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<TextFieldProps, "name"> & {
  name: TName;
  control: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
} & Omit<UseControllerProps<TFieldValues, TName>, "rules">;

function CustomPasswordField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  rules,
  defaultValue,
  label,
  inputRef,
  ...rest
}: CustomPasswordFieldProps<TFieldValues, TName>): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
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
          type={showPassword ? "text" : "password"}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
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

export { CustomPasswordField };
