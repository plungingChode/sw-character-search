import { describe, afterEach, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CharacterList } from "~/components/CharacterList";
import { TEST_CHARACTERS } from "./mock-data";

describe("character list", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("displays the character list", () => {
    render(
      <CharacterList
        characters={TEST_CHARACTERS}
        onLoadMore={loadMore}
        totalCount={100}
      />
    );

    expect(screen.getByText("Load more")).toBeInTheDocument();
    expect(screen.getByText("Test Character A")).toBeInTheDocument();
    expect(screen.getByText("Showing 2 results of 100")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
  });

  test("triggers the 'Load more' action", async () => {
    const user = userEvent.setup();
    render(
      <CharacterList
        characters={TEST_CHARACTERS}
        onLoadMore={loadMore}
        totalCount={100}
      />
    );

    const loadMoreButton = screen.getByText("Load more");
    await user.click(loadMoreButton);

    expect(loadMore).toHaveBeenCalled();
  });

  test("correctly sorts in 'A-Z' order", async () => {
    const user = userEvent.setup();
    render(
      <CharacterList
        characters={TEST_CHARACTERS}
        onLoadMore={loadMore}
        totalCount={100}
      />
    );

    const sortDropdown = screen.getByLabelText("Sort by");
    await user.click(sortDropdown);

    const aToZOption = screen.getByText("A-Z");
    await user.click(aToZOption);

    const characterNames = screen
      .getAllByText(/Test Character ./)
      .map((x) => x.textContent);

    expect(characterNames).toStrictEqual([
      "Test Character A",
      "Test Character B",
    ]);
  });

  test("correctly sorts in 'Z-A' order", async () => {
    const user = userEvent.setup();
    render(
      <CharacterList
        characters={TEST_CHARACTERS}
        onLoadMore={loadMore}
        totalCount={100}
      />
    );

    const sortDropdown = screen.getByLabelText("Sort by");
    await user.click(sortDropdown);

    const aToZOption = screen.getByText("Z-A");
    await user.click(aToZOption);

    const characterNames = screen
      .getAllByText(/Test Character ./)
      .map((x) => x.textContent);

    expect(characterNames).toStrictEqual([
      "Test Character B",
      "Test Character A",
    ]);
  });
  
  test("correctly sorts in 'Male first' order", async () => {
    const user = userEvent.setup();
    render(
      <CharacterList
        characters={TEST_CHARACTERS}
        onLoadMore={loadMore}
        totalCount={100}
      />
    );

    const sortDropdown = screen.getByLabelText("Sort by");
    await user.click(sortDropdown);

    const aToZOption = screen.getByText("Male");
    await user.click(aToZOption);

    const characterNames = screen
      .getAllByText(/Test Character ./)
      .map((x) => x.textContent);

    expect(characterNames).toStrictEqual([
      "Test Character A",
      "Test Character B",
    ]);
  });
  
  test("correctly sorts in 'Female first' order", async () => {
    const user = userEvent.setup();
    render(
      <CharacterList
        characters={TEST_CHARACTERS}
        onLoadMore={loadMore}
        totalCount={100}
      />
    );

    const sortDropdown = screen.getByLabelText("Sort by");
    await user.click(sortDropdown);

    const aToZOption = screen.getByText("Female");
    await user.click(aToZOption);

    const characterNames = screen
      .getAllByText(/Test Character ./)
      .map((x) => x.textContent);

    expect(characterNames).toStrictEqual([
      "Test Character B",
      "Test Character A",
    ]);
  });
});

const loadMore = vi.fn<[], void>();

