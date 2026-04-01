import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) { 
  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  

  const fileRes = await fetch(
    `${process.env.BASE_URL}/match-perfil/${token.field_user_perfildeodi}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token.csrfToken as string, // 👈 Desde el token, no la session
        Cookie: `${token.sessionName}=${token.sessid}`, // 👈 Desde el token, no la session
      },
    },
  );
  if (!fileRes.ok) {
    return NextResponse.json(
      { error: "Error al obtener el archivo" },
      { status: fileRes.status },
    );
  }

  const fileData = await fileRes.json();  
  return NextResponse.json(fileData);
}