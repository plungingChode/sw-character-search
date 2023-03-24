import { SyntheticEvent, useRef } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type Props = {
  /** Triggered when the user submits the search. */
  onSearch: (term: string) => void;
};

export function SearchForm({ onSearch }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const onSearchClick = (e: SyntheticEvent) => {
    e.preventDefault();
    const searchText = inputRef.current?.value ?? "";
    onSearch(searchText);
  };

  return (
    <Stack gap={2} alignItems="center" maxWidth="sm" width="100%">
      <TextField inputRef={inputRef} label="Search Character" variant="standard" fullWidth />
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={onSearchClick}
      >
        Search Character
      </Button>
    </Stack>
  );
}
