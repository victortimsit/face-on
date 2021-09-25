import React from "react";
import IframeReader from "../components/data_display/IframeReader";
import PdfReader from "../components/navigation/PDFReader";
import { useAppContext } from "../context/state";
import { Iframe } from "../types/media";

export default function Player() {
  const appCtx = useAppContext();
  console.log(appCtx);
  if (appCtx?.media == null) return <div>No files</div>;
  return (
    <div>
      {appCtx.media.map((medium) => {
        if (medium.type == "PDF") return <PdfReader file={medium.data} />;
        if (medium.type == "Iframe")
          return (
            <IframeReader
              src={medium.data as Iframe}
              className="w-screen h-screen"
            />
          );
      })}
    </div>
  );
}
