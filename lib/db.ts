import { sql } from "@vercel/postgres";

export { sql };

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

// Seed automático em dev
if (process.env.NODE_ENV !== "production") {
  seedUsers().then(() => console.log("Seed de users carregado")).catch(console.error);
}
