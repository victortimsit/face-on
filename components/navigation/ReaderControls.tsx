import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import Button from "../buttons/Button";
import Typography from "../data_display/Typography";

export default function ReaderControls({
  onNext,
  onPrev,
  length,
  current,
  className,
}: {
  onNext: () => void;
  onPrev: () => void;
  length: number;
  current;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <Button icon={<ArrowLeftIcon />} onClick={onPrev} />
      <div className="w-20 flex items-center justify-center">
        <Typography className="pl-4 text-neutral-50">{current}</Typography>
        <Typography className="px-1 text-neutral-600">/</Typography>
        <Typography className="pr-4 text-neutral-400">{length}</Typography>
      </div>
      <Button icon={<ArrowRightIcon />} onClick={onNext} />
    </div>
  );
}
