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

    const response = await fetch(
      `${process.env.BASE_URL}/api/user/user_pass_reset.json`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: u,
          hashed_pass: t,
          timestamp: n,
        }),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al verificar el usuario" },
        { status: response.status },
      );
    }

    const result = await response.json();

    // ✅ Capturamos la cookie que setea el servidor externo
    const setCookieHeader = response.headers.get("set-cookie");
    console.log("🚀 ~ POST ~ setCookieHeader:", setCookieHeader);

    const nextResponse = NextResponse.json({ ...result, setCookieHeader });

    // ✅ La reenviamos al browser para que quede disponible en el cliente
    if (setCookieHeader) {
      nextResponse.headers.set("set-cookie", setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: String(error) },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    const getHeaderToken = await fetch(
      `${process.env.BASE_URL}/services/session/token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
      },
    );

    const tokenResult = await getHeaderToken.text();
    console.log("🚀 ~ PUT ~ tokenResult:", tokenResult);

    if (!tokenResult) {
      return NextResponse.json({
        error: "Error inesperado con el token",
        details: tokenResult,
      });
    }
    console.log("asss", JSON.stringify({
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${data.setCookieHeader.split(";")[0]}`,
        "X-CSRF-Token": tokenResult as string,
      },
      body: JSON.stringify({ pass: data.newPassword }),
    }));
    const getProfileRes = await fetch(
      `${process.env.BASE_URL}/api/user/${data.u}.json?pass-reset-token=${data.pass_reset_token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": tokenResult as string,
          Cookie: `${data.setCookieHeader.split(";")[0]}`,
        },
        body: JSON.stringify({ pass: data.newPassword }),
      },
    );

    const result = await getProfileRes.json();

    if (!result) {
      return NextResponse.json(
        {
          error: "Error inesperados con la validacion",
          details: result?.statusText,
        },
        { status: result?.status },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperadoddd", details: error },
      { status: 500 },
    );
  }
}
