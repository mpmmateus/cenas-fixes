import { sql } from "@vercel/postgres";

export { sql };
export const dynamic = "force-dynamic";

// Função para criar tabela de users e inserir seed
export async function seedUsers() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `;
    console.log("Tabela users criada com sucesso");
  } catch (err) {
    console.error("Erro ao criar tabela users:", err);
  }
}


