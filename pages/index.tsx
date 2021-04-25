import Head from "next/head";
import React, { useState } from "react";
import Webcam from "react-webcam";
import UploadFile from "../components/inputs/UploadFile";
import PdfReader from "../components/PDFReader";

export default function Home() {
  const [file, setFile] = useState(null);
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
          <UploadFile
            className="w-screen h-screen"
            onFileLoad={(file) => setFile(file)}
          />
        )}
        {/* <iframe
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FVCqH25gX8xtsOrYrBSmQKA%2FWebsite%3Fpage-id%3D126%253A3%26node-id%3D360%253A14455%26viewport%3D-4727%252C-1046%252C0.16638986766338348%26scaling%3Dscale-down"
          className="w-screen h-screen"
          allowFullScreen
        ></iframe> */}
        <Webcam
          className="bottom-8 right-8 rounded-full shadow-2xl fixed"
          videoConstraints={{ width: 200, height: 200 }}
        />
      </main>
    </div>
  );
}
