import React from "react";
import { Box, Chip, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface FormTagInputProps {
  name: string;
  label?: string;
}

export const FormTagInput: React.FC<FormTagInputProps> = ({ name, label = "Add Tag" }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = [] } }) => (
        <>
          <TextField
            label={label}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const tag = (e.target as HTMLInputElement).value.trim();
                if (tag && !value.includes(tag)) {
                  onChange([...value, tag]);
                }
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {value.map((tag: string) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => onChange(value.filter((t: string) => t !== tag))}
              />
            ))}
          </Box>
        </>
      )}
    />
  );
};
