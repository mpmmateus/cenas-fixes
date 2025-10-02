import Link from "next/link";
import { sql } from "@vercel/postgres";

interface Noticia {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
}

export default async function NoticiasPage() {
  const result = await sql`SELECT * FROM noticias ORDER BY id ASC;`;
  const noticias = result.rows as Noticia[];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Notícias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {noticias.map((noticia) => (
          <Link
            key={noticia.id}
            href={`/noticias/${noticia.id}`}
            className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img src={noticia.imagem} alt={noticia.titulo} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-xl mb-2">{noticia.titulo}</h2>
              <p className="text-gray-700 line-clamp-3">{noticia.texto}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
