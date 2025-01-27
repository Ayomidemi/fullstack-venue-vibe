import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  src: any;
  loadingText: string;
  noDataText: string;
}

export const PDFViewer = ({ src, loadingText, noDataText }: Props) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages: next }: { numPages: number }) => {
    setNumPages(next);
  };

  return (
    <Document
      file={src}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={loadingText}
      noData={noDataText}
    >
      {Array.from({ length: numPages || 0 }, (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className={'pdf-page'}
        />
      ))}
    </Document>
  );
};
