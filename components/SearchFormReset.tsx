"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

function SearchFormReset() {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };
  
  return (
    <button 
      type="reset" 
      onClick={reset}
      className="search-reset focus-ring"
      aria-label="Clear search"
    >
      <Link href="/" className="flex items-center justify-center w-full h-full">
        <X className="w-4 h-4" />
      </Link>
    </button>
  );
}

export default SearchFormReset;