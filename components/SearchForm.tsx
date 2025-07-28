import React from "react";
import Form from "next/form";
import SearchFormReset from "../components/SearchFormReset";
import { Search } from "lucide-react";

function SearchForm({ query }: { query?: string }) {
  return (
    <Form action="/" scroll={false} className="search-form">
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
    </Form>
  );
}

export default SearchForm;