import React, { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import IframeReader from "../components/data_display/IframeReader";
import Typography from "../components/data_display/Typography";
import PdfReader from "../components/navigation/PDFReader";
import ReaderControls from "../components/navigation/ReaderControls";
import { useAppContext } from "../context/state";
import { Iframe, Media, MediaType } from "../types/media";

function CurrentMedia({
  media,
  currentPageIdx,
  onLoad,
}: {
  media: Media<MediaType>;
  currentPageIdx: number;
  onLoad: (currentPageIdx: number) => void;
}) {
  if (media == null)
    return <Typography className="text-center w-full">No media</Typography>;
  if (media.type == "PDF")
    return (
      <PdfReader
        currentPageIdx={currentPageIdx}
        file={media.data}
        onLoad={onLoad}
      />
    );
  if (media.type == "Iframe")
    return (
      <IframeReader
        src={media.data as Iframe}
        className="w-screen h-screen"
        onLoadSuccess={() => {
          console.log("iframe success");
          onLoad(1);
        }}
      />
    );
}

export default function Player() {
  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [currentPageIdx, setCurrentPageIdx] = useState(1);
  const [controls, setControls] = useState(false);

  const controlsTimeoutRef = useRef(null);
  const currentPageRef = useRef(null);

  const incLoop = (idx, length, min = 1) => {
    return idx + 1 > length ? min : idx + 1;
  };

  const decLoop = (idx, length, min = 1) => {
    return idx - 1 < min ? length : idx - 1;
  };

  const handleNext = () => {
    if (currentPageIdx == numberOfPages) {
      setCurrentMediaIdx(incLoop(currentMediaIdx, appCtx.media.length - 1, 0));
      setCurrentPageIdx(1);
    } else setCurrentPageIdx(incLoop(currentPageIdx, numberOfPages));
  };

  const handlePrev = () => {
    if (currentPageIdx == 1) {
      setCurrentMediaIdx(decLoop(currentMediaIdx, appCtx.media.length - 1, 0));
      setCurrentPageIdx(1);
    } else setCurrentPageIdx(decLoop(currentPageIdx, numberOfPages));
  };
  const handleMouseMove = () => {
    clearTimeout(controlsTimeoutRef.current);
    setControls(true);

    controlsTimeoutRef.current = setTimeout(() => {
      setControls(false);
    }, 1000);
  };

  useHotkeys(
    "left",
    (e) => {
      e.preventDefault();
      handlePrev();
    },
    {},
    [currentPageIdx]
  );
  useHotkeys(
    "right",
    (e) => {
      e.preventDefault();
      handleNext();
    },
    {},
    [currentPageIdx]
  );

  const appCtx = useAppContext();

  if (appCtx?.media == null) return <div>No files</div>;
  return (
    <div
      className={`h-screen flex items-center bg-pure-black relative ${
        controls ? "cursor-auto" : "cursor-none"
      } `}
      onMouseMove={handleMouseMove}
    >
      <CurrentMedia
        media={appCtx.media[currentMediaIdx]}
        currentPageIdx={currentPageIdx}
        onLoad={(n) => {
          console.log("handle page number", n);
          setNumberOfPages(n);
        }}
      />
      <ReaderControls
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 transition-opacity ${
          controls
            ? "opacity-1 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onNext={handleNext}
        onPrev={handlePrev}
        length={numberOfPages}
        current={currentPageIdx}
      />
    </div>
  );
}
