import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
import Image from "next/image";

interface Tecnologia {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
}

interface TecnologiaPageProps {
  params: { id: string };
}

export default async function TecnologiaDetailPage({ params }: TecnologiaPageProps) {
  const result = await sql`SELECT * FROM tecnologia WHERE id = ${params.id};`;
  const tecnologia = result.rows[0] as Tecnologia | undefined;

  if (!tecnologia) return notFound();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">{tecnologia.titulo}</h1>
      <div className="relative w-full h-96 mb-6">
        <Image src={tecnologia.imagem} alt={tecnologia.titulo} fill style={{ objectFit: "cover" }} />
      </div>
      <p className="text-lg">{tecnologia.texto}</p>
    </div>
  );
}
