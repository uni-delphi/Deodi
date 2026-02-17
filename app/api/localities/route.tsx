import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const provincia_id = searchParams.get("provincia_id");

  const externalUrl = new URL(`${process.env.BASE_URL}/xml-localidad`);
  if (title) {
    externalUrl.searchParams.append("title", title);
  }
  if (provincia_id) {
    externalUrl.searchParams.append("provincia_id", provincia_id);
  }

  try {
    const fileRes = await fetch(externalUrl.toString(), {
      method: "GET",
    });

    if (!fileRes.ok) {
      return NextResponse.json(
        { error: "Error al obtener las localidades" },
        { status: fileRes.status },
      );
    }

    const xmlData = await fileRes.text();
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
