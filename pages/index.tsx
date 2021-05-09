import Head from "next/head";
import React, { useEffect, useState } from "react";
import Iframe from "../components/data_display/Iframe";
import FloatFace from "../components/feedbacks/FloatFace";
import SnackNotif from "../components/feedbacks/SnackNotif";
import SearchBar from "../components/inputs/SearchBar";
import UploadFile from "../components/inputs/UploadFile";
import PdfReader from "../components/navigation/PDFReader";
import { errors } from "../data/errors";
import useIframe from "../hooks/useIframe";
import { isValidURL } from "../utils/isValidURL";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loadedIframe, loadIframe] = useIframe();
  const [notif, setNotif] = useState<false | string>(false);

  useEffect(() => {
    if (loadedIframe == false) setNotif(errors.unauthorized_iframe);
  }, [loadedIframe]);

  const handleSearch = (e) => {
    const url = isValidURL(e.target.value);
    url ? loadIframe(e.target.value) : setNotif(errors.invalid_url);
  };

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
              message={notif && notif}
              run={notif != false}
              onEnded={() => setNotif(false)}
            >
              <SearchBar onChange={handleSearch} />
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
