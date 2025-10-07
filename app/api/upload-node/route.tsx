import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function POST(req: Request) {
  // 1️⃣ Obtener sesión de NextAuth
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const title = formData.get("title") as string;
  const bodyValue = formData.get("body") as string;

  if (!title || !bodyValue) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  let fid: string | null = null;

  try {
    // 2️⃣ Obtener CSRF Token desde Drupal
    //const csrfRes = await fetch(`https://apideodi.cloud/app/services/session/token`, {
    //  method: "GET",
    //  headers: {
    //    "Content-Type": "text/plain",
    //    "Cookie": `${session.sessionName}=${session.sessid}`
    //  },
    //});
    
    //const csrfToken = await csrfRes.text();
    //if (!csrfRes.ok) {
    //  const text = await csrfRes.text();
    //  return NextResponse.json({ error: "Error obteniendo CSRF token", details: text }, { status: 500 });
    //}
    
    //console.log("csrfToken", csrfToken)
    //console.log("token", session.csrfToken)

    // 3️⃣ Subir archivo si existe
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      const fileRes = await fetch(`${process.env.BASE_URL}/api/file.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken,
          "Cookie": `${session.sessionName}=${session.sessid}`,
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
        return NextResponse.json({ error: "Error subiendo archivo", details: text }, { status: 500 });
      }

      fid = fileData.fid;
    }

    // 4️⃣ Crear nodo
    const nodeRes = await fetch(`${process.env.BASE_URL}/api/node.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": session.csrfToken,
        Cookie: `${session.sessionName}=${session.sessid}`,
      },
      body: JSON.stringify({
        type: "formulariodemo",
        title,
        body: {
          und: [{ value: bodyValue, summary: "", format: "filtered_html" }],
        },
      }),
    });

    if (!nodeRes.ok) {
      const text = await nodeRes.text();
      return NextResponse.json({ error: "Error creando nodo", details: text }, { status: 500 });
    }

    const nodeData = await nodeRes.json();
    const nid = nodeData.nid;

    // 5️⃣ Asignar archivo al nodo si existe
    if (fid) {
      const putRes = await fetch(`${process.env.BASE_URL}/api/node/${nid}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken,
          Cookie: `${session.sessionName}=${session.sessid}`,
        },
        body: JSON.stringify({
          field_formdemo_archivo: {
            und: [{ fid, alt: file?.name ?? "", title: file?.name ?? "" }],
          },
        }),
      });

      if (!putRes.ok) {
        const text = await putRes.text();
        return NextResponse.json({ error: "Error asignando archivo al nodo", details: text }, { status: 500 });
      }
      const dada = await putRes.text();
      
      return NextResponse.json({ isSuccess: true, nid, fid });
    }
    
  } catch (error) {
    return NextResponse.json({ error: "Error inesperado", details: error }, { status: 500 });
  }
}