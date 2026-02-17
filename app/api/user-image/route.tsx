import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("avatar") as File | null;
  const title = formData.get("title") as string;
  const bodyValue = formData.get("body") as string;

  if (!title || !bodyValue) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 }
    );
  }

  let fid: string | null = null;

  try {
    // 3️⃣ Subir archivo si existe
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      const fileRes = await fetch(`${process.env.BASE_URL}/api/file.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token.csrfToken as string,
          Cookie: `${token.sessionName}=${token.sessid}`,
        },
        body: JSON.stringify({
          file: {
            file: base64,
            filename: file.name,
            filepath: `public://${file.name}`,
          },
        }),
      });

      const fileData = await fileRes.json();

      if (!fileRes.ok) {
        const text = await fileRes.text();
        return NextResponse.json(
          { error: "Error subiendo archivo", details: text },
          { status: 500 }
        );
      }

      fid = fileData.fid;
    }

    // 5️⃣ Asignar archivo al nodo si existe
    if (fid) {
      //console.log("🚀 ~ POST ~ fid:", fid)

      const putRes = await fetch(`${process.env.BASE_URL}/api/node/${token.field_user_perfildeodi}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token.csrfToken as string,
          Cookie: `${token.sessionName}=${token.sessid}`,
        },
        body: JSON.stringify({
          field_perfildeodi_testvocacional: {
            und: [
              {
                fid,
                alt: file?.name ?? "",
                title: file?.name ?? "",
              },
            ],
          },
          picture: `${process.env.BASE_URL}/app/sites/default/${file?.name}`,          
        }),
      });

      if (!putRes.ok) {
        const text = await putRes.text();
        return NextResponse.json(
          { error: "Error asignando archivo al nodo", details: text },
          { status: 500 }
        );
      }
     
      return NextResponse.json({ isSuccess: true, putRes });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 }
    );
  }
}
