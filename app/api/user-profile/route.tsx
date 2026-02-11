import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function GET(req: Request) {
  // 1️⃣ Obtener sesión de NextAuth
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const fileRes = await fetch(
    `${process.env.BASE_URL}/api/node/${session.user.field_user_perfildeodi.und[0].target_id}.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": session.csrfToken,
        Cookie: `${session.sessionName}=${session.sessid}`,
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
}

export async function PUT(req: Request) {
  try {
    // 1️⃣ Obtener sesión de NextAuth
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 3️⃣ Actualizar perfil de usuario (nodo)
    const updateProfileRes = await fetch(
      `${process.env.BASE_URL}/api/node/${session.user.field_user_perfildeodi.und[0].target_id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": session.csrfToken,
          Cookie: `${session.sessionName}=${session.sessid}`,
        },
        body: JSON.stringify({
          body: {
            und: [
              {
                value: JSON.stringify(await req.json()),
              },
            ],
          },
        }),
      },
    );
    // agregar ejecutar generar competencias


    // 4️⃣ Devolver datos del perfil actualizado
    return NextResponse.json({ message: "Perfil actualizado correctamente." });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      name,
      lastName,
      email,
      locality,
      state,
      country,
      birthDate,
      password,
      trabaja,
      trabaja_local,
      localidad_trabajo,
      satisface_nbi,
      sexo,
      ...props
    } = await req.json();

    console.log(name,
      lastName,
      email,
      locality,
      state,
      country,
      birthDate,
      password,
      trabaja,
      trabaja_local,
      localidad_trabajo,
      satisface_nbi,
      sexo,)
    // 3️⃣ Actualizar perfil de usuario (nodo)
    const createdUserRes = await fetch(
      `${process.env.BASE_URL}/api/user/register.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          pass: password,
          mail: email,
          field_user_nombre: {
            und: [{ value: name }],
          },
          field_user_apellido: {
            und: [{ value: lastName }],
          },
          field_user_fecha_nac: {
            und: [{ value: birthDate }],
          },
          field_user_localidad: {
            und: [{ target_id: locality }],
          },
          field_user_provincia: {
            und: [{ target_id: state }],
          },
          field_user_pais: {
            und: [{ target_id: country }],
          },
          field_user_trabaja: {
            und: "Si",
          },
          field_user_trabaja_local: {
            und: "No",
          },
          field_user_localidad_trabajo: {
            und: [{ target_id: "Localidad Trabajo (ID)" }],
          },
          field_user_satisface_nbi: {
            und: "Si",
          },
          field_user_sexo: {
            und: "Femenino",
          },
        }),
      },
    );

    /**
       * {
      "name": "nuevo_nombre",
      "pass": "nueva_contraseña",
      "mail": "nuevo@correo.com",
      "field_user_nombre": {
        "und": [ { "value": "Nuevo Nombre" } ]
      },
      "field_user_apellido": {
        "und": [ { "value": "Nuevo Apellido" } ]
      },
      "field_user_fecha_nac": {
        "und": [ { "value": "YYYY-MM-DD" } ]
      },
      "field_user_localidad": {
        "und": [ { "target_id": "Localidad Nombre (ID)" } ]
      },
      "field_user_provincia": {
        "und": [ { "target_id": "Provincia Nombre (ID)" } ]
      },
      "field_user_pais": {
        "und": [ { "target_id": "Pais Nombre (ID)" } ]
      },
      "field_user_trabaja": {
        "und": "Si"
      },
      "field_user_trabaja_local": {
        "und": "No"
      },
      "field_user_localidad_trabajo": {
        "und": [ { "target_id": "Localidad Trabajo (ID)" } ]
      },
      "field_user_satisface_nbi": {
        "und": "Si"
      },
      "field_user_sexo": {
        "und": "Femenino"
      }
    }
       * 
       */

    // 4️⃣ Devolver datos del perfil actualizado
    return NextResponse.json({ message: "Perfil creado correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 },
    );
  }
}
