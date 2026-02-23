import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const fileRes = await fetch(
    `${process.env.BASE_URL}/api/node/${token.field_user_perfildeodi}.json`,
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

export async function PUT(req: NextRequest) {
  // 👈 NextRequest
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const updateProfileRes = await fetch(
      `${process.env.BASE_URL}/api/node/${token.field_user_perfildeodi}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token.csrfToken as string, // 👈 Desde el token
          Cookie: `${token.sessionName}=${token.sessid}`, // 👈 Desde el token
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

    const createdUserRes = await fetch(
      `${process.env.BASE_URL}/api/user/register.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: email,
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
            und: trabaja,
          },
          field_user_trabaja_local: {
            und: trabaja_local,
          },
          field_user_localidad_trabajo: {
            und: [{ target_id: localidad_trabajo }],
          },
          field_user_satisface_nbi: {
            und: satisface_nbi,
          },
          field_user_sexo: {
            und: sexo,
          },
        }),
      },
    );

    if (!createdUserRes.ok) {
      const errorData = await createdUserRes.json();
      return NextResponse.json({
        error: "Error al crear el perfil",
        details: errorData,
        status: createdUserRes.status,
      });
    }
    //console.log("🚀 ~ POST ~ createdUserRes:", createdUserRes);

    return NextResponse.json({
      message: "Perfil creado correctamente",
      status: createdUserRes.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 },
    );
  }
}
