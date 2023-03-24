import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { SearchForm } from "./components/SearchForm";
import { CharacterList } from "./components/CharacterList";
import { useCharactersQuery } from "./hooks/use-characters-query";

export function App() {
  const {
    characters,
    totalCount,
    isInitializing,
    setSearch,
    loadNextPage,
  } = useCharactersQuery();

  const onSearch = (searchText: string) => {
    setSearch(searchText);
  };

  return (
    <Stack gap={2} maxWidth="xl" alignItems="center" mx="auto" p={2}>
      <Box width="100%">
        <Paper elevation={2}>
          <Typography variant="h3" component="h1" px={1} pt={1}>
            Star Wars Character Search
          </Typography>
        </Paper>
      </Box>
      <Stack gap={2} alignItems="center" width="100%">
        <SearchForm onSearch={onSearch} />
        {isInitializing && "Loading..."}
        {!isInitializing && (
          <CharacterList
            characters={characters}
            totalCount={totalCount ?? 0}
            onLoadMore={loadNextPage}
          />
        )}
      </Stack>
    </Stack>
  );
}

