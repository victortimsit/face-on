import { XIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import { useAppContext } from "../../context/state";
import { Media, MediaType } from "../../types/media";
import Button from "../buttons/Button";
import Typography from "./Typography";

export default function MediaTimeline({
  className,
  children,
}: {
  className?: String;
  children?: ReactElement;
}) {
  const appCtx = useAppContext();

  const handleRemoveMedium = (medium: Media<MediaType>) => {
    const idx = appCtx.media.indexOf(medium);
    const media = appCtx.media;

    media.splice(idx, 1);

    appCtx.setMedia([...media]);
  };
  return (
    <div
      className={`flex flex-row rounded-3xl p-6 bg-neutral-100 ${
        appCtx.media?.length == 0 && "opacity-50 pointer-events-none"
      } ${className}`}
    >
      {appCtx.media?.map((medium) => (
        <div className="flex flex-row items-center py-2 pr-2 pl-4 bg-white rounded-2xl mx-1 border-neutral-200 border">
          <Typography>{medium.name}</Typography>
          <Button
            size="small"
            variant="secondary"
            className="ml-2"
            onClick={() => handleRemoveMedium(medium)}
            icon={<XIcon />}
          />
        </div>
      ))}
      {children}
    </div>
  );
}
