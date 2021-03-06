import { useState } from "react";
import getXFrameOptions from "../services/getXFrameOptions";

enum ServiceURL {
  GOOGLE_SLIDE = "docs.google.com",
  FIGMA = "www.figma.com",
  YOUTUBE = "www.youtube.com",
}

enum ServiceEmbedPath {
  GOOGLE_SLIDE = "/embed?start=false",
  FIGMA = "/embed?embed_host=share&url=",
  YOUTUBE = "/embed/",
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

const getYoutubeIframe = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const vParam = urlParams.get("v");

  return "https://" + ServiceURL.YOUTUBE + ServiceEmbedPath.YOUTUBE + vParam;
};

const useIframe = () => {
  const [loadedIframe, setLoadedIframe] = useState(null);
  const loadIframe = async (url: string) => {
    if (url) {
      // setLoadedIframe(null);
      // if(!url.includes("http")) return false

      const iframeUrl: string = url.includes(ServiceURL.GOOGLE_SLIDE)
        ? getGoogleIframe(url)
        : url.includes(ServiceURL.FIGMA)
        ? getFigmaIframe(url)
        : url.includes(ServiceURL.YOUTUBE)
        ? getYoutubeIframe(url)
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
