import React from "react";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

function SearchForm({ query }: { query?: string }) {
  return (
    <form action="/" className="search-form">
      <input
        name="query"
        className="search-input"
        placeholder="Search innovative startups..."
        defaultValue={query || ""}
        aria-label="Search startups"
      />

      <div className="flex items-center gap-2">
        {query && <SearchFormReset />}
        <button 
          type="submit" 
          className="search-button focus-ring"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;