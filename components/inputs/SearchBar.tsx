import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

export default function SearchBar({ className }: { className?: string }) {
  return (
    <div
      className={`px-4 py-4 flex items-center justify-center shadow-2xl rounded-2xl ${className}`}
    >
      <SearchIcon className="w-5 h-5 text-neutral-900" />
      <input className="pl-2" placeholder="Search" type="text" />
    </div>
  );
}
