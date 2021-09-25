import React from "react";
import Iframe from "../components/data_display/Iframe";
import PdfReader from "../components/navigation/PDFReader";
import { useAppContext } from "../context/state";
export default function Player() {
  const appCtx = useAppContext();
  console.log(appCtx);
  if (appCtx?.files == null && appCtx?.loadedIframe == null)
    return <div>No files</div>;
  return (
    <div>
      {appCtx.files && appCtx.files.map((file) => <PdfReader file={file} />)}
      {appCtx.loadedIframe && (
        <Iframe src={appCtx.loadedIframe} className="w-screen h-screen" />
      )}
    </div>
  );
}
