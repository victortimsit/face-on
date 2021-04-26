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
        {file ? (
          <PdfReader file={file} />
        ) : (
          <>
            <UploadFile
              className="w-screen h-screen"
              onFileLoad={(file) => setFile(file)}
            />
            <SearchBar onChange={(e) => loadIframe(e.target.value)} />
          </>
        )}
        {/* <iframe
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FVCqH25gX8xtsOrYrBSmQKA%2FWebsite%3Fpage-id%3D126%253A3%26node-id%3D360%253A14455%26viewport%3D-4727%252C-1046%252C0.16638986766338348%26scaling%3Dscale-down"
          className="w-screen h-screen"
          allowFullScreen
        ></iframe> */}
        {loadedIframe && (
          <Iframe src={loadedIframe} className="w-screen h-screen" />
        )}
        <Iframe src="https://www.facebook.com/"></Iframe>
        {/* <iframe
          className="w-screen h-screen"
          src="https://docs.google.com/presentation/d/1NGY2q-8Ba_xGzvtvM3cTDucWgAk3-jvlk6qYnBVfkR8/embed?start=true"
        ></iframe>
        <iframe
          className="w-screen h-screen"
          src="https://memegine.com/"
        ></iframe> */}
        <FloatFace />
      </main>
    </div>
  );
}
