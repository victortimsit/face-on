import { useWindowWidth } from "@react-hook/window-size";
import React, { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Document, Page, pdfjs } from "react-pdf";
import ReaderControls from "./ReaderControls";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfReader({ file }: { file: any }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [controls, setControls] = useState(false);

  const controlsTimeout = useRef(null);

  const handleNext = () => {
    setPageNumber(pageNumber + 1 > numPages ? 1 : pageNumber + 1);
  };

  const handlePrev = () => {
    setPageNumber(pageNumber - 1 < 1 ? numPages : pageNumber - 1);
  };
  const handleMouseMove = () => {
    clearTimeout(controlsTimeout.current);
    setControls(true);

    controlsTimeout.current = setTimeout(() => {
      setControls(false);
    }, 3000);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useHotkeys(
    "left",
    (e) => {
      e.preventDefault();
      handlePrev();
    },
    {},
    [pageNumber]
  );
  useHotkeys(
    "right",
    (e) => {
      e.preventDefault();
      handleNext();
    },
    {},
    [pageNumber]
  );
  return (
    <div
      className={`relative ${controls ? "cursor-auto" : "cursor-none"}`}
      onMouseMove={handleMouseMove}
    >
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={useWindowWidth()} pageNumber={pageNumber} />
      </Document>
      <ReaderControls
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity ${
          controls
            ? "opacity-1 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onNext={handleNext}
        onPrev={handlePrev}
        length={numPages}
        current={pageNumber}
      />
    </div>
  );
}
