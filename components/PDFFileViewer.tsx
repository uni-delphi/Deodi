"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function PdfViewer({
  url,
  name,
  pdfDate,
}: {
  url: string;
  name: string;
  pdfDate?: Date;
}) {
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    url
  )}&embedded=true`;
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        {name}
      </h2>
      <p className="text-sm text-gray-500">{pdfDate?.toLocaleDateString()}</p>
      <iframe
        src={viewerUrl}
        className="w-full h-96 mb-4"
        title="Visor PDF Google"
      />
      <Button variant="outline" asChild>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-chart-column-icon lucide-file-chart-column"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M8 18v-1" />
            <path d="M12 18v-6" />
            <path d="M16 18v-3" />
          </svg>{" "}
          Ver
        </Link>
      </Button>
    </div>
  );
}
