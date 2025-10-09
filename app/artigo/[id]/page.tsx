import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
interface Artigo {
  id: number;
  titulo: string;
  categoria: string;
  videos: string[];
}

interface ArtigoPageProps {
  params: { id: string };
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  // Buscar artigo
  const artigoResult = await sql`
    SELECT id, titulo, categoria
    FROM artigos
    WHERE id = ${params.id};
  `;

  if (artigoResult.rows.length === 0) return notFound();
  const artigo = artigoResult.rows[0] as Omit<Artigo, "videos">;

  // Buscar vídeos do artigo
  const videosResult = await sql`
    SELECT url
    FROM videos
    WHERE artigo_id = ${params.id};
  `;

  const videos = videosResult.rows.map((row) => row.url);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8 text-center">{artigo.titulo}</h1>
      <p className="text-center text-gray-600 mb-6">
        <span className="font-medium">{artigo.categoria}</span>
      </p>

      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((videoId, index) => (
            <div
              key={index}
              className="relative w-full"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube video ${index}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "0",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
