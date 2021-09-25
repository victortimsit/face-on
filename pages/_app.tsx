import React from "react";
import FloatFace from "../components/feedbacks/FloatFace";
import { AppWrapper } from "../context/state";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
      <FloatFace />
    </AppWrapper>
  );
}

export default MyApp;
