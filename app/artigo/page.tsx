import Link from "next/link";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
interface Artigo {
  id: number;
  titulo: string;
  categoria: string;
}

export default async function ArtigosPage() {
  const result = await sql`SELECT id, titulo, categoria FROM artigos ORDER BY id ASC;`;
  const artigos = result.rows as Artigo[];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Artigos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artigos.map((artigo) => (
          <Link
            key={artigo.id}
            href={`/artigos/${artigo.id}`}
            className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-xl mb-2">{artigo.titulo}</h2>
            <p className="text-gray-600 italic">{artigo.categoria}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
