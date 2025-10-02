// app/page.tsx
import Link from "next/link"
import Image from "next/image"

const artigos = [
  {
    id: "1",
    titulo: "10 Cenas Fixes que vais adorar",
      imagem: "/images/curiosidades.jpg",
    categoria: "Curiosidades",
  },
  {
    id: "2",
    titulo: "Os melhores memes da semana",
    imagem: "/images/memes.jpg",
    categoria: "Humor",
  },
  {
    id: "3",
    titulo: "Top 5 filmes que tens de ver",
    imagem: "/images/filmes.jpg",
    categoria: "Cinema",
  },
  {
    id: "4",
    titulo: "Novidades tecnológicas incríveis",
    imagem: "/images/tecnologia.jpg",
    categoria: "Tecnologia",
  },
  {
    id: "5",
    titulo: "Receitas fáceis e deliciosas",
    imagem: "/images/culinaria.jpg",
    categoria: "Lifestyle",
  },
  {
    id: "6",
    titulo: "Desporto: melhores momentos da semana",
    imagem: "/images/desporto.jpg",
    categoria: "Desporto",
  }

]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artigos.map((artigo) => (
        <div key={artigo.id} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col">
          {/* Todas as imagens com mesma altura */}
          <div className="relative w-full h-48">
            <Image
              src={artigo.imagem}
              alt={artigo.titulo}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500">{artigo.categoria}</p>
              <h2 className="text-lg font-semibold">{artigo.titulo}</h2>
            </div>
            <Link href={`/artigo/${artigo.id}`} className="text-blue-600 hover:underline text-sm mt-2">
              Ler mais →
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
