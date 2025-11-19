import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function GET(req: Request) {
  // 1️⃣ Obtener sesión de NextAuth
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const fileRes = await fetch(
    `${process.env.BASE_URL}/api/node/${session.user.field_user_perfildeodi.und[0].target_id}.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": session.csrfToken,
        Cookie: `${session.sessionName}=${session.sessid}`,
      },
    }
  );
  const fileData = await fileRes.json();
  if (!fileRes.ok) {
    return NextResponse.json(
      { error: "Error al obtener el archivo" },
      { status: fileRes.status }
    );
  }
  return NextResponse.json(fileData);
}

export async function PUT(req: Request) {
  try {
    // 1️⃣ Obtener sesión de NextAuth
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2️⃣ Obtener datos del request
    const formData = await req.formData();
    console.log("🚀 ~ PUT ~ formData:", formData)
    if (!formData) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }
    // 3️⃣ Actualizar perfil de usuario (nodo)
    const updateProfileRes = await fetch(`${process.env.BASE_URL}/api/node/13.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken,
          Cookie: `${session.sessionName}=${session.sessid}`,
        },
        body: JSON.stringify({
          body: {
            und: [
              {
                value: "Actualización de perfil con nuevo CV",
              },
            ],
          },
        }),
      });

    // 4️⃣ Devolver datos del perfil actualizado
    return NextResponse.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 }
    );
  }
}
