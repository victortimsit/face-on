import { useWindowWidth } from "@react-hook/window-size";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ReaderControls from "./ReaderControls";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfReader({ file }: { file: any }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleNext = () => {
    setPageNumber(pageNumber + 1 > numPages ? 1 : pageNumber + 1);
  };

  const handlePrev = () => {
    setPageNumber(pageNumber - 1 < 1 ? numPages : pageNumber - 1);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div className="relative">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={useWindowWidth()} pageNumber={pageNumber} />
      </Document>
      <ReaderControls
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        onNext={handleNext}
        onPrev={handlePrev}
        length={numPages}
        current={pageNumber}
      />
    </div>
  );
}
