import { useState } from "react";
import getXFrameOptions from "../services/getXFrameOptions";

enum ServiceURL {
  GOOGLE_SLIDE = "docs.google.com",
  FIGMA = "www.figma.com",
}

enum ServiceEmbedPath {
  GOOGLE_SLIDE = "/embed?start=false",
  FIGMA = "/embed?embed_host=share&url=",
}

enum ServiceUnwantedPath {
  GOOGLE_SLIDE_EDIT = "/edit",
}

const getGoogleIframe = (url: string) => {
  let iframeUrl: string;
  const regExp = new RegExp(`${ServiceUnwantedPath.GOOGLE_SLIDE_EDIT}.*$`, "g");
  if (url.includes(ServiceUnwantedPath.GOOGLE_SLIDE_EDIT))
    iframeUrl = url.replace(regExp, "");

  iframeUrl += ServiceEmbedPath.GOOGLE_SLIDE;
  console.log(iframeUrl);

  return iframeUrl;
};

const getFigmaIframe = (url: string) => {
  return (
    "https://" +
    ServiceURL.FIGMA +
    ServiceEmbedPath.FIGMA +
    encodeURIComponent(url)
  );
};

const useIframe = () => {
  const [loadedIframe, setLoadedIframe] = useState(null);
  const loadIframe = async (url: string) => {
    if (url) {
      console.log(url);
      // setLoadedIframe(null);
      // if(!url.includes("http")) return false
      const iframeUrl: string = url.includes(ServiceURL.GOOGLE_SLIDE)
        ? getGoogleIframe(url)
        : url.includes(ServiceURL.FIGMA)
        ? getFigmaIframe(url)
        : url;

      try {
        const res = await getXFrameOptions(iframeUrl);
        // Set loadedIframe to false if x_frame_options is "DENY" or "SAMEORIGIN"
        setLoadedIframe(res.x_frame_options ? false : iframeUrl);
      } catch (error) {
        setLoadedIframe(false);
      }
    }
  };

  return [loadedIframe, loadIframe];
};

export default useIframe;
