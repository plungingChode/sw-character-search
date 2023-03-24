import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Character, getCharacters } from "~/api";

export type UseCharactersQuery = {
  /** Characters loaded so far for the current search term. */
  characters: Character[];
  /** Total number of characters that can be loaded for the current search. */
  totalCount: number | null;
  /** Is the query loading data? */
  isLoading: boolean;
  /** Is this the first time the query is running? */
  isInitializing: boolean;
  /** Load the next page of results. */
  loadNextPage: () => void;
  /** 
   * Set the search term. Replaces `characters` with the results 
   * of the search.
   */
  setSearch: (s: string) => void;
};

export function useCharactersQuery(): UseCharactersQuery {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [page, setPage] = useState(1);
  const searchChanged = useRef(false);

  const search = searchTerm.length > 0 ? searchTerm : undefined;

  const { isLoading, data } = useQuery({
    queryKey: ["characters", page, search],
    queryFn: () => getCharacters({ page, search }),
    keepPreviousData: true,
    staleTime: Infinity,
    onError: (err) => {
      console.error(err);
    },
    onSettled: () => {
      setIsInitializing(false);
    }
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    if (searchChanged.current) {
      setCharacters(data.results);
      searchChanged.current = false;
    } else {
      setCharacters([...characters, ...data.results]);
    }
    setTotalCount(data.count);
  }, [data, setTotalCount, setCharacters]);

  const loadNextPage = useCallback(() => {
    setPage(page + 1);
  }, [setPage, page]);

  const setSearch = useCallback(
    (s: string) => {
      searchChanged.current = s !== searchTerm || searchTerm.length > 0;
      if (s === searchTerm) {
        return;
      }
      setPage(1);
      setSearchTerm(s);
    },
    [setPage, page, setSearchTerm, searchTerm]
  );

  return {
    characters,
    totalCount,
    isLoading,
    isInitializing,
    loadNextPage,
    setSearch,
  };
}

