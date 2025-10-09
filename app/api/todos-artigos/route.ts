// app/api/todos-artigos/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Buscar artigos de cada tabela
    const artigos = await sql`SELECT id, titulo, categoria, NULL as imagem, 'artigos' as tabela FROM artigos`;
    const noticias = await sql`SELECT id, titulo, imagem, 'Notícias' as categoria, 'noticias' as tabela FROM noticias`;
    const virais = await sql`SELECT id, titulo, imagem, 'Viral' as categoria, 'virais' as tabela FROM virais`;
    const desporto = await sql`SELECT id, titulo, imagem, 'Desporto' as categoria, 'desporto' as tabela FROM desporto`;
    const insolito = await sql`SELECT id, titulo, imagem, 'Insólito' as categoria, 'insolito' as tabela FROM insolito`;
    const tecnologia = await sql`SELECT id, titulo, imagem, 'Tecnologia' as categoria, 'tecnologia' as tabela FROM tecnologia`;
    const curiosidades = await sql`SELECT id, titulo, imagem, 'Curiosidades' as categoria, 'curiosidades' as tabela FROM curiosidades`;

    // Juntar todos os resultados num só array
    const todos = [
      ...artigos.rows,
      ...noticias.rows,
      ...virais.rows,
      ...desporto.rows,
      ...insolito.rows,
      ...tecnologia.rows,
      ...curiosidades.rows,
    ];

    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao Procurar artigos" }, { status: 500 });
  }
}
