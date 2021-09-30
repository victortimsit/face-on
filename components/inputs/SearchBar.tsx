import { DocumentAddIcon } from "@heroicons/react/outline";
import React, { ChangeEventHandler } from "react";
import Button from "../buttons/Button";

export default function SearchBar({
  value,
  className,
  onChange,
  onFileChange,
}: {
  value: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label
      htmlFor="search"
      className={`flex items-center ${className} relative`}
    >
      <input
        className="flex-1 pl-12 outline-none px-4 py-4 shadow-2xl rounded-2xl focus:border focus:ring-2 focus:ring-blue-600 border-neutral-200 border"
        id="search"
        name="search"
        placeholder="Type or paste URL"
        type="text"
        value={value}
        onChange={onChange}
      />
      <label
        className="left-3 absolute text-neutral-900"
        style={{ cursor: "pointer" }}
      >
        <Button
          variant="secondary"
          size="small"
          icon={<DocumentAddIcon />}
          onClick={() => {}}
        />
        <input
          type="file"
          className="w-full h-full opacity-0 absolute left-0 top-0 right-0 bottom-0"
          onChange={onFileChange}
        />
      </label>
      {/* <DocumentAddIcon className="left-4 w-5 h-5 absolute text-neutral-900 pointer-events-none" /> */}
    </label>
  );
}
