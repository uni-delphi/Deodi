import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const fileRes = await fetch(
    `${process.env.BASE_URL}/api/node/json-intereses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token.csrfToken as string,
        Cookie: `${token.sessionName}=${token.sessid}`,
      },
    },
  );
  const fileData = await fileRes.json();
  if (!fileRes.ok) {
    return NextResponse.json(
      { error: "Error al obtener el archivo" },
      { status: fileRes.status },
    );
  }
  return NextResponse.json(fileData);
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { nombre_ruta, id_trayecto, nombre } = body;

    // 3️⃣ Actualizar perfil de usuario (nodo)
    const createNewRutaRes = await fetch(
      `${process.env.BASE_URL}/api/node.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token.csrfToken as string,
          Cookie: `${token.sessionName}=${token.sessid}`,
        },
        body: JSON.stringify({
          type: "trayecto_consultado",
          title: nombre_ruta,
          field_trayectos_nid_trayecto: {
            und: [{ value: id_trayecto }],
          },
        }),
      },
    );

    // Verificar respuesta de actualización
    if (!createNewRutaRes.ok) {
      const errorText = await createNewRutaRes.text();
      return NextResponse.json({
        error: "Error al crear nueva ruta",
        details: errorText,
        status: createNewRutaRes.status,
      });
    }

    // Devolver datos del perfil actualizado
    return NextResponse.json({ message: "Ruta creada correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 },
    );
  }
}
