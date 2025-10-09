import Link from "next/link";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";
interface Curiosidade {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
  video?: string | null;
}

export default async function CuriosidadePage() {
  const result = await sql`SELECT * FROM curiosidades ORDER BY id ASC;`;
  const curiosidades = result.rows as Curiosidade[];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Curiosidades</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {curiosidades.map((item) => (
          <Link
            key={item.id}
            href={`/curiosidade/${item.id}`}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={item.imagem}
              alt={item.titulo}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-xl mb-2">{item.titulo}</h2>
              <p className="text-gray-700 line-clamp-3">{item.texto}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
