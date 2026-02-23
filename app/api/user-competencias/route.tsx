import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const fileRes = await fetch(
    `${process.env.BASE_URL}/perfildeodi/analizar-competencias?nid=${token.field_user_perfildeodi}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token.csrfToken as string,
        Cookie: `${token.sessionName}=${token.sessid}`,
      },
    },
  );
  if (!fileRes.ok || !fileRes.status) {
    return NextResponse.json(
      { error: "Error al obtener el archivo", status: fileRes.status },
    );
  }

  const fileData = await fileRes.json();
  return NextResponse.json(fileData);
}
