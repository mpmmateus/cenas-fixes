import { notFound } from "next/navigation";
import Link from "next/link";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";

interface Artigo {
  id: number;
  titulo: string;
  categoria: string;
}

interface CategoriaPageProps {
  params: { slug: string };
}

export default async function CategoriaPage({ params }: CategoriaPageProps) {
  const categoria = params.slug;

  // Buscar artigos da categoria
  const result = await sql`
    SELECT * FROM artigos WHERE LOWER(categoria) = LOWER(${categoria});
  `;

  const artigos = result.rows as Artigo[];

  if (artigos.length === 0) return notFound();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">{categoria}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artigos.map((artigo) => (
          <Link
            key={artigo.id}
            href={`/artigo/${artigo.id}`}
            className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="p-4">
              <h2 className="font-semibold text-xl">{artigo.titulo}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
