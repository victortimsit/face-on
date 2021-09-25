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
      className={`flex flex-row rounded-lg p-6 bg-neutral-100 ${
        appCtx.media?.length == 0 && "opacity-50 pointer-events-none"
      } ${className}`}
    >
      {appCtx.media?.map((medium) => (
        <div className="flex flex-row items-center p-2 bg-white rounded-lg mx-1">
          <Typography>{medium.name}</Typography>
          <Button
            size="small"
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
