import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
        error: "Error al crear el perfil. Si ya tiene una cuenta, intente iniciar sesión.",
        details: errorData,
        status: false,
      });
    } else {
      /*const fileRes = await fetch(
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
      console.log("🚀 ~ POST ~ fileRes:", fileRes)
      if (!fileRes.ok || !fileRes.status) {
        return NextResponse.json({
          error: "Error al obtener el archivo",
          status: fileRes.status,
        });
      }*/

      return NextResponse.json({
        message: "Perfil creado correctamente",
        status: createdUserRes.status,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error inesperado", details: error },
      { status: 500 },
    );
  }
}