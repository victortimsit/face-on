import Head from "next/head";
import React from "react";
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
      </main>
    </div>
  );
}
