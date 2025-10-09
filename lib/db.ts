import { sql } from "@vercel/postgres";

export { sql };
export const dynamic = "force-dynamic";

// Função para criar tabela de users e inserir seed
export async function seedUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `;

}

if (process.env.NODE_ENV === "development") {
  seedUsers()
    .then(() => console.log("Seed de users carregado"))
    .catch((err) => console.error("Erro no seed:", err));
}

