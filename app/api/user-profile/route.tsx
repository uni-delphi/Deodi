import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function GET(req: Request) {
  // 1️⃣ Obtener sesión de NextAuth
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  
  
  const fileRes = await fetch(`${process.env.BASE_URL}/api/node/${session.user.field_user_perfildeodi.und[0].target_id}.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": session.csrfToken,
      Cookie: `${session.sessionName}=${session.sessid}`,
    },
  });
  const fileData = await fileRes.json();
  if (!fileRes.ok) {
    return NextResponse.json(
      { error: "Error al obtener el archivo" },
      { status: fileRes.status }
    );
  }
  return NextResponse.json(fileData);
}

async function getUserProfile(userId: string) {
  // Simular una consulta a la base de datos
  const userProfiles = [
    { id: "1", name: "Juan Pérez", email: "juan@example.com" },
    { id: "2", name: "María López", email: "maria@example.com" },
  ];
  return userProfiles.find((profile) => profile.id === userId) || null;
}

export async function PUT(req: Request) {
  // 1️⃣ Obtener sesión de NextAuth
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 2️⃣ Obtener datos del perfil del usuario
  const userProfile = await getUserProfile(session.user.id);
  if (!userProfile) {
    return NextResponse.json(
      { error: "Perfil no encontrado" },
      { status: 404 }
    );
  }

  // 3️⃣ Actualizar datos del perfil
  const updatedProfile = await updateUserProfile(userProfile.id, req.body);
  if (!updatedProfile) {
    return NextResponse.json(
      { error: "Error al actualizar el perfil" },
      { status: 500 }
    );
  }

  // 4️⃣ Devolver datos del perfil actualizado
  return NextResponse.json(updatedProfile);
}

async function updateUserProfile(userId: string, data: any) {
  // Simular una actualización en la base de datos
  return { id: userId, ...data };
}
