
import Link from "next/link";
import Image from "next/image";
import { sql } from "@vercel/postgres";

interface Home {
  id: number;
  titulo: string;
  categoria: string;
  imagem: string;
}

export default async function HomePage() {
  // Buscar artigos da tabela home
  const result = await sql`SELECT id, titulo, categoria, imagem FROM home ORDER BY id ASC;`;
  const artigos = result.rows as Home[];

  return (
    <main className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artigos.map((artigo) => (
        <div
          key={artigo.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden"
        >
          <div className="relative w-full h-48">
            <Image
              src={artigo.imagem || "/images/default.jpg"}
              alt={artigo.titulo}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500">{artigo.categoria}</p>
              <h2 className="text-lg font-semibold">{artigo.titulo}</h2>
            </div>
            <Link
              href={`/artigo/${artigo.id}`}
              className="text-blue-600 hover:underline text-sm mt-2"
            >
              Ler mais →
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
