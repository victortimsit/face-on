import { useWindowHeight, useWindowWidth } from "@react-hook/window-size";
import React, { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Document, Page, pdfjs } from "react-pdf";
import Typography from "../data_display/Typography";
import ReaderControls from "./ReaderControls";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfReader({
  file,
  className,
}: {
  file: any;
  className?: string;
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [controls, setControls] = useState(false);

  const controlsTimeoutRef = useRef(null);
  const currentPageRef = useRef(null);

  const handleNext = () => {
    setPageNumber(pageNumber + 1 > numPages ? 1 : pageNumber + 1);
  };

  const handlePrev = () => {
    setPageNumber(pageNumber - 1 < 1 ? numPages : pageNumber - 1);
  };
  const handleMouseMove = () => {
    clearTimeout(controlsTimeoutRef.current);
    setControls(true);

    controlsTimeoutRef.current = setTimeout(() => {
      setControls(false);
    }, 1000);
  };
  const handlePageRenderSuccess = () => {};
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
      className={`h-screen flex items-center bg-pure-black relative ${
        controls ? "cursor-auto" : "cursor-none"
      } ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className="bg-pure-black"
        loading={
          <Typography variant="h3" className="h-screen w-screen bg-pure-black">
            Loading document
          </Typography>
        }
      >
        <Page
          ref={currentPageRef}
          onRenderSuccess={handlePageRenderSuccess}
          width={useWindowWidth()}
          height={useWindowHeight()}
          pageNumber={pageNumber}
          className="flex items-center bg-pure-black"
          loading={
            <Typography
              variant="h3"
              className="h-screen w-screen bg-pure-black"
            >
              Loading page {pageNumber}
            </Typography>
          }
        />
      </Document>
      <ReaderControls
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 transition-opacity ${
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
