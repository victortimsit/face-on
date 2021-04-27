import { useState } from "react";
import xFramePermission from "../services/xFramePermission";


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
  return url;
}

const useIframe = () => {
  const [loadedIframe, setLoadedIframe] = useState(null);
  const loadIframe = async (url: string) => {

    const iframeUrl: string = url.includes(ServiceURL.GOOGLE_SLIDE) ? getGoogleIframe(url) : url.includes(ServiceURL.FIGMA) ? getFigmaIframe(url) : url;
    setLoadedIframe(iframeUrl);
    const res = await xFramePermission(iframeUrl);
    console.log(res)
    
    // console.log("permission", xFrameOptions)
  }

  return [loadedIframe, loadIframe];
}

export default useIframe;