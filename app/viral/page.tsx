import Link from "next/link";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic"; // ✅ força server-side rendering

interface Viral {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
}

export default async function ViralPage() {
  const result = await sql`SELECT * FROM virais ORDER BY id ASC;`;
  const virais = result.rows as Viral[];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Viral</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {virais.map((item) => (
          <Link
            key={item.id}
            href={`/viral/${item.id}`}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img src={item.imagem} alt={item.titulo} className="w-full h-48 object-cover" />
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
