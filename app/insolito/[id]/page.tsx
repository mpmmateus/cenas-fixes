import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
import Image from "next/image";

interface Insolito {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
}

interface InsolitoPageProps {
  params: { id: string };
}

export default async function InsolitoDetailPage({ params }: InsolitoPageProps) {
  const result = await sql`SELECT * FROM insolito WHERE id = ${params.id};`;
  const insolito = result.rows[0] as Insolito | undefined;

  if (!insolito) return notFound();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">{insolito.titulo}</h1>
      <div className="relative w-full h-96 mb-6">
        <Image src={insolito.imagem} alt={insolito.titulo} fill style={{ objectFit: "cover" }} />
      </div>
      <p className="text-lg">{insolito.texto}</p>
    </div>
  );
}
