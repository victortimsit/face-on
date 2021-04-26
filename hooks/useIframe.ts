import { useState } from "react";

enum ServiceURL {
  GOOGLE_SLIDE = "docs.google.com",
  FIGMA = "www.figma.com"
}

enum ServiceEmbedPath {
  GOOGLE_SLIDE = "/embed?start=true",
  FIGMA = "/embed?embed_host=share&url="
}

enum ServiceUnwantedPath {
  GOOGLE_SLIDE_EDIT = "/edit"
}

const getGoogleIframe = (url: string) => {
  let iframeUrl: string;
  const regExp = new RegExp(`${ServiceUnwantedPath.GOOGLE_SLIDE_EDIT}.*$`, "g");
  if(url.includes(ServiceUnwantedPath.GOOGLE_SLIDE_EDIT)) iframeUrl = url.replace(regExp, "");

  iframeUrl+=ServiceEmbedPath.GOOGLE_SLIDE;
  console.log(iframeUrl)
  
  return iframeUrl;
}

const getFigmaIframe = (url: string) => {

}

const useIframe = () => {
  const [loadedIframe, setLoadedIframe] = useState(null);
  const loadIframe = async (url: string) => {

    const iframeUrl = url.includes(ServiceURL.GOOGLE_SLIDE) ? getGoogleIframe(url) : url.includes(ServiceURL.FIGMA) ? getFigmaIframe(url) : null;
    setLoadedIframe(iframeUrl);
  }

  return [loadedIframe, loadIframe];
}

export default useIframe;