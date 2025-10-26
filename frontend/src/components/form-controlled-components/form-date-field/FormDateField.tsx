import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface FormDateFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

export const FormDateField: React.FC<FormDateFieldProps> = ({
  name,
  label,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} is required` } : undefined}
      render={({ field, fieldState }) => (
        <DatePicker
          label={label}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date: Dayjs | null) => {
            field.onChange(date ? date.toISOString() : "");
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              required,
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
            },
          }}
        />
      )}
    />
  );
};
