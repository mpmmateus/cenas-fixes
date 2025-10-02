import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
import Image from "next/image";

interface Desporto {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
}

interface DesportoPageProps {
  params: { id: string };
}

export default async function DesportoDetailPage({ params }: DesportoPageProps) {
  const result = await sql`SELECT * FROM desporto WHERE id = ${params.id};`;
  const desporto = result.rows[0] as Desporto | undefined;

  if (!desporto) return notFound();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">{desporto.titulo}</h1>
      <div className="relative w-full h-96 mb-6">
        <Image src={desporto.imagem} alt={desporto.titulo} fill style={{ objectFit: "cover" }} />
      </div>
      <p className="text-lg">{desporto.texto}</p>
    </div>
  );
}
