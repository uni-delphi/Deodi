import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { revalidatePath } from "next/cache";

export async function handler(req: Request) {
  // 1️⃣ Obtener sesión de NextAuth
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const userId = session.user.field_user_perfildeodi.und[0].target_id;

  try {
    if (req.method === "GET") {
      // GET → obtener perfil
      const fileRes = await fetch(`${process.env.BASE_URL}/api/node/${userId}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken,
          Cookie: `${session.sessionName}=${session.sessid}`,
        },
      });

      if (!fileRes.ok) {
        return NextResponse.json({ error: "Error al obtener el archivo" }, { status: fileRes.status });
      }

      const fileData = await fileRes.json();
      return NextResponse.json(fileData);
    }

    if (req.method === "PUT") {
      // PUT → actualizar perfil
      const body = await req.json();

      const fileRes = await fetch(`${process.env.BASE_URL}/api/node/${userId}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken,
          Cookie: `${session.sessionName}=${session.sessid}`,
        },
        body: JSON.stringify(body),
      });

      if (!fileRes.ok) {
        return NextResponse.json({ error: "Error al actualizar el archivo" }, { status: fileRes.status });
      }

      const fileData = await fileRes.json();
      return NextResponse.json(fileData);
    }

    // Otros métodos HTTP
    return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error del servidor" }, { status: 500 });
  }
}

// Exportar como GET y PUT para App Router (opcional)
export const GET = handler;
export const PUT = handler;
