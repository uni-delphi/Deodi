import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const fileRes = await fetch(
      `${process.env.BASE_URL}/usuario-json/${token.id}`,
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
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
