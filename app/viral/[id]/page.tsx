import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
import Image from "next/image";
export const dynamic = "force-dynamic";
interface Viral {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
}

interface ViralPageProps {
  params: { id: string };
}

export default async function ViralDetailPage({ params }: ViralPageProps) {
  const result = await sql`SELECT * FROM virais WHERE id = ${params.id};`;
  const viral = result.rows[0] as Viral | undefined;

  if (!viral) return notFound();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">{viral.titulo}</h1>
      <div className="relative w-full h-96 mb-6">
        <Image src={viral.imagem} alt={viral.titulo} fill style={{ objectFit: "cover" }} />
      </div>
      <p className="text-lg">{viral.texto}</p>
    </div>
  );
}
