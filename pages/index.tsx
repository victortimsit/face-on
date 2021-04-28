import Head from "next/head";
import React, { useEffect, useState } from "react";
import Iframe from "../components/data_display/Iframe";
import FloatFace from "../components/feedbacks/FloatFace";
import SnackNotif from "../components/feedbacks/SnackNotif";
import SearchBar from "../components/inputs/SearchBar";
import UploadFile from "../components/inputs/UploadFile";
import PdfReader from "../components/navigation/PDFReader";
import useIframe from "../hooks/useIframe";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loadedIframe, loadIframe] = useIframe();
  const [notif, setNotif] = useState(false);

  useEffect(() => {
    if (loadedIframe == false) setNotif(true);
  }, [loadedIframe]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {file && <PdfReader file={file} />}
        {file == null && !loadedIframe && (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <UploadFile
              className="w-full"
              onFileLoad={(file) => setFile(file)}
            />
            <SnackNotif
              message="Oops, iframe couldn't be loaded. Try another link or add PDF file!"
              run={notif}
              onEnded={() => setNotif(false)}
            >
              <SearchBar onChange={(e) => loadIframe(e.target.value)} />
            </SnackNotif>
          </div>
        )}
        {loadedIframe && (
          <Iframe src={loadedIframe} className="w-screen h-screen" />
        )}
        <FloatFace />
      </main>
    </div>
  );
}
