import { sql } from "@vercel/postgres";

interface Curiosidade {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
  video?: string | null;
}

interface Props {
  params: { id: string };
}

export default async function CuriosidadeDetailPage({ params }: Props) {
  const result = await sql`SELECT * FROM curiosidades WHERE id = ${params.id};`;
  const curiosidade = result.rows[0] as Curiosidade;

  if (!curiosidade) {
    return <p className="p-6 text-center">Curiosidade não encontrada.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">{curiosidade.titulo}</h1>
      <img
        src={curiosidade.imagem}
        alt={curiosidade.titulo}
        className="w-full max-h-[400px] object-cover mb-6 rounded"
      />
      <p className="text-gray-700 mb-6">{curiosidade.texto}</p>
      {curiosidade.video && (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${curiosidade.video}`}
            title={curiosidade.titulo}
            allowFullScreen
            className="w-full h-full rounded"
          />
        </div>
      )}
    </div>
  );
}
