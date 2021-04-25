import { useWindowWidth } from "@react-hook/window-size";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfReader({ file }: { file: any }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handlePage = () => {
    console.log(pageNumber);
    setPageNumber(pageNumber + 1 >= numPages ? 1 : pageNumber + 1);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={useWindowWidth()} pageNumber={pageNumber} />
      </Document>
    </>
  );
}
