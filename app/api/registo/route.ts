import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// POST /api/registo
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Verifica se já existe um utilizador com este email
    const existing = await sql<{ id: number }[]>`
      SELECT id FROM users WHERE email = ${email}
    `;
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "Email já registado." }, { status: 400 });
    }

    // Insere o novo utilizador
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;

    return NextResponse.json({ message: "Utilizador registado com sucesso." }, { status: 201 });
  } catch (err) {
    console.error("Erro ao registar utilizador:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
