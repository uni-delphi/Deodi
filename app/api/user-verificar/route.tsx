import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  console.log("🚀 ~ GET de validar ~ req:", req);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  /*const fileRes = await fetch(
    `${process.env.BASE_URL}/api/node/json-intereses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token.csrfToken as string,
        Cookie: `${token.sessionName}=${token.sessid}`,
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
  return NextResponse.json(fileData);*/
}

export async function POST(req: NextRequest) {
  try {
    const { u, n, t } = await req.json();
    // 3️⃣ Actualizar perfil de usuario (nodo)
    const updateProfileRes = await fetch(
      `${process.env.BASE_URL}/api/user/user_pass_reset.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: u,
          hashed_pass: t,
          timestamp: n,
        }),
      },
    );

    const result = await updateProfileRes.json();

    console.log("🚀 ~ POST ~ updateProfileRes:", result);
    if (!result) {
      return NextResponse.json(
        { error: "Error inesperado", details: result?.statusText },
        { status: result?.status },
      );
    }
    // 4️⃣ enviar token y pass para fijar la contraseña

    const getProfileRes = await fetch(
      `${process.env.BASE_URL}/api/user/user_pass_reset.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: u,
          hashed_pass: t,
          timestamp: n,
        }),
      },
    );



    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 },
    );
  }
}
