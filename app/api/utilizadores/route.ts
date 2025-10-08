
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const result = await sql`SELECT id, name, email FROM users ORDER BY id ASC`;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao obter utilizadores:", error);
    return NextResponse.json({ error: "Erro ao carregar utilizadores" }, { status: 500 });
  }
}

