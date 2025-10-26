import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface FormTextFieldProps {
  name: string;
  label: string;
  required?: boolean;
  multiline?: boolean;
  type?: string;
  select?: boolean;
  children?: React.ReactNode;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  required,
  multiline,
  type,
  select,
  children,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} is required` } : undefined}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          required={required}
          multiline={multiline}
          type={type}
          select={select}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        >
          {children}
        </TextField>
      )}
    />
  );
};
