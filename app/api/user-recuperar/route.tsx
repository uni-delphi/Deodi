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

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    // 3️⃣ Actualizar perfil de usuario (nodo)
    const updateProfileRes = await fetch(
      `${process.env.BASE_URL}/api/user/request_new_password.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.email,
        }),
      },
    );

    // 4️⃣ Devolver datos del perfil actualizado
    return NextResponse.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 },
    );
  }
}
