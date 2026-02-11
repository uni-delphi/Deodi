import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function GET(req: Request) {
  // 1️⃣ Obtener sesión de NextAuth
  /*const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }*/

  // 2️⃣ Obtener parámetros de búsqueda de la URL
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const provincia_id = searchParams.get("provincia_id");

  // 3️⃣ Construir URL del endpoint externo con parámetros
  const externalUrl = new URL(`${process.env.BASE_URL}/xml-localidad`);
  if (title) {
    externalUrl.searchParams.append("title", title);
  }
  if (provincia_id) {
    externalUrl.searchParams.append("provincia_id", provincia_id);
  }
  console.log("🚀 ~ GET ~ externalUrl:", externalUrl)

  try {
    // 4️⃣ Hacer petición al servicio externo
    const fileRes = await fetch(externalUrl.toString(), {
      method: "GET",
      //headers: {
      //  "X-CSRF-Token": session.csrfToken,
      //  Cookie: `${session.sessionName}=${session.sessid}`,
      //},
    });

    if (!fileRes.ok) {
      return NextResponse.json(
        { error: "Error al obtener las localidades" },
        { status: fileRes.status },
      );
    }

    // 5️⃣ Obtener el XML como texto
    const xmlData = await fileRes.text();
    console.log("🚀 ~ GET ~ xmlData:", xmlData)

    // 6️⃣ Retornar el XML con el Content-Type correcto
    return new NextResponse(xmlData, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error fetching localities:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}