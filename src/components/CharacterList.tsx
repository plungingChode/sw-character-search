import { useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { Character } from "../api";
import { CharacterCard } from "./CharacterCard";

type Props = {
  /** The characters to display. */
  characters: Character[];
  /** The total number of characters the user can load. */
  totalCount: number;
  /** Triggered when the user requests to load more characters. */
  onLoadMore: (() => void) | undefined;
};

export function CharacterList({ characters, totalCount, onLoadMore }: Props) {
  const [sort, setSort] = useState<CharacterSortOption | null>(null);
  const sortedCharacters = sort ? [...characters].sort(sort.order) : characters;
  const canLoadMore = characters.length < totalCount;

  const onSortChanged = (e: SelectChangeEvent) => {
    const sortKey = e.target.value;

    let sort = null;
    if (sortKey in sortOptions) {
      sort = sortOptions[sortKey as SortOptionKey];
    }

    setSort(sort);
  };

  return (
    <Stack gap={2} width="100%">
      <Typography>
        Showing {characters.length} results of {totalCount}
      </Typography>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="people-sort-by">Sort by</InputLabel>
        <Select
          labelId="people-sort-by"
          label="Sort by"
          defaultValue=""
          onChange={onSortChanged}
        >
          {Object.entries(sortOptions).map(([k, v]) => (
            <MenuItem key={k} value={k}>
              {v.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid
        container
        gap={2}
        columns={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
      >
        {sortedCharacters.map((x, i) => (
          <CharacterCard key={x.url} {...x} image={getCharacterImage(i)} />
        ))}
      </Grid>
      {canLoadMore && (
        <Button onClick={onLoadMore} variant="outlined">
          Load more
        </Button>
      )}
    </Stack>
  );
}

function getCharacterImage(i: number) {
  if (i % 2 === 0) {
    return "/assets/mock-image.png";
  }
  return "/assets/mock-image-1.png";
}

type CharacterSortOption = {
  /** User-facing label */
  label: string;
  /** Sort function to apply */
  order: (a: Character, b: Character) => number;
};

type SortOptionKey = keyof typeof sortOptions;

const sortOptions = {
  "a-z": {
    label: "A-Z",
    order: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  "z-a": {
    label: "Z-A",
    order: (a, b) => {
      return b.name.localeCompare(a.name);
    },
  },
  male: {
    label: "Male",
    order: (a, b) => {
      if (a.gender === "male" && b.gender !== "male") {
        return -1;
      }
      if (b.gender === "male" && a.gender !== "male") {
        return 1;
      }
      return a.name.localeCompare(b.name);
    },
  },
  female: {
    label: "Female",
    order: (a, b) => {
      if (a.gender === "female" && b.gender !== "female") {
        return -1;
      }
      if (b.gender === "female" && a.gender !== "female") {
        return 1;
      }
      return a.name.localeCompare(b.name);
    },
  },
} satisfies Record<string, CharacterSortOption>;
