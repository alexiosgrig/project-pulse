import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { searchProject } from "../../api/projectService";
import type { SearchComponentProps } from "../../types/props/SearchComponentProps";

export const SearchComponent: React.FC<SearchComponentProps> = ({
  setProjects,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await searchProject(query);
        setProjects(data.results);
      } catch (err) {
        console.warn(err);
      }
    };

    if (query.trim() !== "") {
      fetchProjects();
    } else {
      setProjects([]); // clear when query empty
    }
  }, [query, setProjects]);

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <TextField
        fullWidth
        label="Search projects..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
