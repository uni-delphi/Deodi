import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  //console.log("asd", req)
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const formData = await req.formData();
  const file = formData.get("field_perfildeodi_cv") as File;
  const ejecutarIA = formData.get("field_perfildeodi_ejecutar_ia") ?? "0";
  
  if (!file) {
    return NextResponse.json(
      { error: "No se envió ningún archivo" },
      { status: 400 }
    );
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const drupalForm = new FormData();
  drupalForm.append("field_perfildeodi_cv", new Blob([buffer]), file.name);
  drupalForm.append("field_perfildeodi_ejecutar_ia", ejecutarIA); // <-- ahora sí

  const drupalRes = await fetch(
    `${process.env.DRUPAL_URL}/app/perfildeodi/analizar?nid=${session.user.field_user_perfildeodi.und[0].target_id}`,
    {
      method: "POST",
      headers: {
        //"Content-Disposition": `file; filename="${file.name}"`,
        "X-CSRF-Token": session.csrfToken, // guardaste esto al loguear
        Cookie: `${session.sessionName}=${session.sessid}`, // idem
      },
      body: drupalForm,
    }
  );

  if (!drupalRes.ok) {
    const text = await drupalRes.text();

    return NextResponse.json(
      { error: "Error subiendo a Drupal", details: text },
      { status: 500 }
    );
  }

  const data = await drupalRes.json();
  console.log("🚀 ~ POST ~ data:", data)
  
  return NextResponse.json(data);
}
