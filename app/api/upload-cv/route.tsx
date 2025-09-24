import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  console.log("asd", req)
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const drupalRes = await fetch(`${process.env.DRUPAL_URL}/entity/file?_format=json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `file; filename="${file.name}"`,
      "X-CSRF-Token": session.token, // guardaste esto al loguear
      "Cookie": `${session.session_name}=${session.sessid}`, // idem
    },
    body: buffer,
  })

  if (!drupalRes.ok) {
    const text = await drupalRes.text()
    return NextResponse.json({ error: "Error subiendo a Drupal", details: text }, { status: 500 })
  }

  const data = await drupalRes.json()
  return NextResponse.json(data)
}
