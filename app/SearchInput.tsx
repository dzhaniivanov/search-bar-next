"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    search ? search?.get("q") : null
  );
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery || "");
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form className="flex justify-center w-2/3" onSubmit={onSearch}>
      <input
        value={searchQuery || ""}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
        placeholder="What are you looking for?"
      />
    </form>
  );
};
export default SearchInput;
