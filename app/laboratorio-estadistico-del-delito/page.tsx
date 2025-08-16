import Footer from "@/components/footer";
import { Header } from "@/components/Header";
import React, { cache } from "react";
import PdfViewer from "@/components/PDFFileViewer";
import { getAllPDFFiles, getAllPosts } from "@/lib/actions";

const getCachedEncuesta = cache(async () => await getAllPDFFiles("LED"));

export default async function LaboratorioEstadisticoDelDelito() {
  const pdfs = await getCachedEncuesta();

  return (
    <>
      <Header />
      <main className="min-h-screen mt-12 md:mt-16 md:max-w-[65rem] mx-auto">
        <div className="container mx-auto px-4 md:p-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Laboratorio Estadístico del Delito
          </h1>
          <p className="text-lg md:text-xl mb-4">
            Bienvenido al Laboratorio Estadístico del Delito, donde analizamos y
            publicamos datos sobre la criminalidad en Rosario.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Aquí encontrarás informes, estadísticas y análisis detallados sobre
            la situación delictiva en nuestra ciudad.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {pdfs.map((pdf) => (
              <PdfViewer key={pdf.id} name={pdf.name} url={pdf.url} pdfDate={pdf.createdAt} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
