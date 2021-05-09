import { SearchIcon } from "@heroicons/react/solid";
import React, { ChangeEventHandler } from "react";

export default function SearchBar({
  className,
  onChange,
}: {
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label
      htmlFor="search"
      className={`flex items-center ${className} relative`}
    >
      <input
        className="pl-12 outline-none px-4 py-4 shadow-2xl rounded-2xl focus:border focus:ring-2 focus:ring-blue-600 border-neutral-200 border"
        id="search"
        name="search"
        placeholder="Search"
        type="text"
        onChange={onChange}
      />
      <SearchIcon className="left-4 w-5 h-5 absolute text-neutral-900 pointer-events-none" />
    </label>
  );
}
