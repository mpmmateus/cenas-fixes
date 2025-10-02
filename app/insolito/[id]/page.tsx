// app/insolito/[id]/page.tsx
import { sql } from "@vercel/postgres";

interface Insolito {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
}

interface PageProps {
  params: { id: string };
}

export default async function InsolitoDetailPage({ params }: PageProps) {
  const id = parseInt(params.id);

  const { rows } = await sql<Insolito>`
    SELECT * FROM insolito WHERE id = ${id} LIMIT 1
  `;

  if (!rows[0]) return <p className="p-6">Item não encontrado.</p>;

  const item = rows[0];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">{item.titulo}</h1>
      <img src={item.imagem} alt={item.titulo} className="mb-4 w-full max-w-3xl mx-auto" />
      <p className="text-gray-800">{item.texto}</p>
    </div>
  );
}
