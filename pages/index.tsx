import Head from "next/head";
import React, { useRef, useState } from "react";
import Iframe from "../components/data_display/Iframe";
import FloatFace from "../components/feedbacks/FloatFace";
import SearchBar from "../components/inputs/SearchBar";
import UploadFile from "../components/inputs/UploadFile";
import PdfReader from "../components/navigation/PDFReader";
import useIframe from "../hooks/useIframe";

export default function Home() {
  const [file, setFile] = useState(null);
  const [iframe, setIframe] = useState(false);
  const [loadedIframe, loadIframe] = useIframe();

  const iframeRef = useRef(null);

  const handleLoad = (e) => {
    console.log(iframeRef.current);
    console.log("loadded");
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {file && <PdfReader file={file} />}
        {file == null && iframe == false && (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <UploadFile
              className="w-full"
              onFileLoad={(file) => setFile(file)}
            />
            <SearchBar onChange={(e) => loadIframe(e.target.value)} />
          </div>
        )}
        {loadedIframe && (
          <Iframe
            src={loadedIframe}
            onLoadSuccess={() => setIframe(true)}
            onLoadError={() => {
              setIframe(false);
              // window.prompt(
              //   "Oops, iframe couldn't be loaded. Try another link or add PDF file!"
              // );
            }}
            className="w-screen h-screen"
          />
        )}
        <FloatFace />
      </main>
    </div>
  );
}
