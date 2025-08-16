import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Desactivar caché
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Obtener todos los archivos enviados con name="file"
  const files = formData.getAll("file").filter((item): item is File => item instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  try {
    const uploads = await Promise.all(
      files.map(async (file) => {        
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: "auto" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });
      })
    );
    console.log("🚀 ~ POST ~ uploads:", uploads)

    return NextResponse.json({
      message: "Upload success",
      results: uploads,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
