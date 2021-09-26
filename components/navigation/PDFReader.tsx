import { useWindowHeight, useWindowWidth } from "@react-hook/window-size";
import React, { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDF } from "../../types/media";
import Typography from "../data_display/Typography";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfReader({
  file,
  className,
  currentPageIdx,
  onLoad,
}: {
  file: PDF;
  className?: string;
  currentPageIdx: number;
  onLoad: (pageNumber: number) => void;
}) {
  const currentPageRef = useRef(null);

  const handlePageRenderSuccess = () => {};
  function onDocumentLoadSuccess({ numPages }) {
    onLoad(numPages);
  }

  return (
    <>
      <Document
        file={file}
        className={className}
        onLoadSuccess={onDocumentLoadSuccess}
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
          pageNumber={currentPageIdx}
          className="flex items-center bg-pure-black"
          loading={
            <Typography
              variant="h3"
              className="h-screen w-screen bg-pure-black"
            >
              Loading page {currentPageIdx}
            </Typography>
          }
        />
      </Document>
    </>
  );
}
