import { CVUpload } from "@/components/cv-upload/cv-upload";

export default async function Dashboard() {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Cargar CV</h1>
        <CVUpload />
      </div>
    </main>
  );
}
