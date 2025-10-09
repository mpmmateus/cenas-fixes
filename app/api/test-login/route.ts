// app/api/test-login/route.ts
import { NextRequest } from "next/server";
import { sql } from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { rows } = await sql`SELECT * FROM users`;
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao obter users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
