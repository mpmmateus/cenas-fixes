import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
import Image from "next/image";

export const dynamic = "force-dynamic";
interface Noticia {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
}

interface NoticiaPageProps {
  params: { id: string };
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  const result = await sql`SELECT * FROM noticias WHERE id = ${params.id};`;
  const noticia = result.rows[0] as Noticia | undefined;

  if (!noticia) return notFound();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">{noticia.titulo}</h1>
      <div className="relative w-full h-96 mb-6">
        <Image src={noticia.imagem} alt={noticia.titulo} fill style={{ objectFit: "cover" }} />
      </div>
      <p className="text-lg">{noticia.texto}</p>
    </div>
  );
}
