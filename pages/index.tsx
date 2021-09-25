import Head from "next/head";
import React from "react";
import FloatFace from "../components/feedbacks/FloatFace";
import Upload from "./upload";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Upload />
        <FloatFace />
      </main>
    </div>
  );
}
