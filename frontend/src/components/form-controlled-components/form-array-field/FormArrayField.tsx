import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";

export const FormArrayField: React.FC = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "team" });

  return (
    <>
      <Typography variant="subtitle1">Team Members</Typography>
      {fields.map((member, index) => (
        <Box key={member.id} sx={{ display: "flex", gap: 1, mb: 1 }}>
          <Controller
            name={`team.${index}.role`}
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Role" fullWidth />
            )}
          />
          <Controller
            name={`team.${index}.capacity`}
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Capacity" type="number" />
            )}
          />
          <IconButton onClick={() => remove(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => append({ role: "", capacity: 1 })}
      >
        Add Member
      </Button>
    </>
  );
};
