import router from "next/router";
import React, { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import IframeReader from "../components/data_display/IframeReader";
import PdfReader from "../components/navigation/PDFReader";
import ReaderControls from "../components/navigation/ReaderControls";
import { useAppContext } from "../context/state";
import { Iframe, Media, MediaType } from "../types/media";

function Slider({
  media,
  currentPageIdx,
  currentMediaIdx,
  onLoad,
}: {
  media: Media<MediaType>[];
  currentPageIdx: number;
  currentMediaIdx: number;
  onLoad: (mediaIdx: number, currentPageIdx: number) => void;
}) {
  const appCtx = useAppContext();
  return (
    <>
      {media.map((media, i) => {
        const className = i == currentMediaIdx ? "visible" : "hidden";
        if (media == null)
          return media == null && className == "visible"
            ? appCtx.setFullFace(true)
            : appCtx.setFullFace(false);
        if (media.type == "PDF")
          return (
            <PdfReader
              currentPageIdx={currentPageIdx}
              file={media.data}
              className={className}
              onLoad={(n) => onLoad(n, i)}
            />
          );
        if (media.type == "Iframe")
          return (
            <IframeReader
              src={media.data as Iframe}
              className={`w-screen h-screen ${className}`}
            />
          );
      })}
    </>
  );
}

export default function Player() {
  const appCtx = useAppContext();
  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
  const [slides, setSlides] = useState([
    ...appCtx.media.map((media) => {
      return { media, numberOfPages: 1 };
    }),
    { media: null, numberOfPages: 1 },
  ]);
  console.log(slides);
  const [currentPageIdx, setCurrentPageIdx] = useState(1);
  const [controls, setControls] = useState(false);

  const controlsTimeoutRef = useRef(null);

  const incLoop = (idx: number, length: number, min = 1) => {
    console.log("inc lop", idx, length);
    return idx + 1 > length ? min : idx + 1;
  };

  const decLoop = (idx: number, length: number, min = 1) => {
    return idx - 1 < min ? length : idx - 1;
  };

  const handleNext = () => {
    if (currentPageIdx == slides[currentMediaIdx]?.numberOfPages) {
      setCurrentMediaIdx(incLoop(currentMediaIdx, slides.length - 1, 0));
      setCurrentPageIdx(1);
    } else
      setCurrentPageIdx(
        incLoop(currentPageIdx, slides[currentMediaIdx]?.numberOfPages)
      );
  };

  const handlePrev = () => {
    if (currentPageIdx == 1) {
      const newMediaIdx = decLoop(currentMediaIdx, slides.length - 1, 0);
      setCurrentMediaIdx(newMediaIdx);
      setCurrentPageIdx(slides[newMediaIdx]?.numberOfPages);
    } else
      setCurrentPageIdx(
        decLoop(currentPageIdx, slides[currentMediaIdx]?.numberOfPages)
      );
  };
  const handleMouseMove = () => {
    clearTimeout(controlsTimeoutRef.current);
    setControls(true);

    controlsTimeoutRef.current = setTimeout(() => {
      setControls(false);
    }, 2000);
  };

  useHotkeys(
    "left",
    (e) => {
      e.preventDefault();
      handlePrev();
    },
    {},
    [currentPageIdx, currentMediaIdx]
  );
  useHotkeys(
    "right",
    (e) => {
      e.preventDefault();
      handleNext();
    },
    {},
    [currentPageIdx, currentMediaIdx]
  );
  useHotkeys(
    "esc",
    (e) => {
      e.preventDefault();
      router.push("/");
    },
    {},
    []
  );

  if (appCtx?.media == null) return <div>No files</div>;
  return (
    <div
      className={`h-screen flex items-center bg-pure-black-1000 relative ${
        controls ? "cursor-auto" : "cursor-none"
      } `}
      onMouseMove={handleMouseMove}
    >
      <Slider
        media={slides.map((slide) => slide.media)}
        currentPageIdx={currentPageIdx}
        currentMediaIdx={currentMediaIdx}
        onLoad={(n, i) => {
          slides[i].numberOfPages = n;
          setSlides(slides);
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
        length={slides[currentMediaIdx]?.numberOfPages}
        current={currentPageIdx}
      />
    </div>
  );
}
