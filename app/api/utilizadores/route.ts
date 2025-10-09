import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await sql`SELECT id, name, email FROM users ORDER BY id ASC`;
    // ⚠️ Aqui removemos o .rows
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao obter utilizadores:", error);
    return NextResponse.json({ error: "Erro ao carregar utilizadores" }, { status: 500 });
  }
}
