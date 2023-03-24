import { describe, afterEach, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchForm } from "~/components/SearchForm";

describe("search form", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("displays the required components", () => {
    render(
      <SearchForm
        onSearch={doSearch}
      />
    );

    expect(screen.getByLabelText("Search Character")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Search Character");
  });
  
  test("triggers a search of the input text", async () => {
    const user = userEvent.setup();
    render(
      <SearchForm
        onSearch={doSearch}
      />
    );

    const searchInput = screen.getByLabelText("Search Character");
    await user.click(searchInput);
    await user.keyboard("A");
    
    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    expect(doSearch).toHaveBeenCalledOnce();
    expect(doSearch).toHaveBeenCalledWith("A");
  });
});

const doSearch = vi.fn<[string], void>();
