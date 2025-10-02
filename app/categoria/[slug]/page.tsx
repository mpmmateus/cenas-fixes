"use client"

import Link from "next/link"
import { notFound } from "next/navigation"

interface Artigo {
  id: string
  titulo: string
  categoria: string
  imagem?: string
  videos?: string[]
}

// Lista de artigos (podes usar a tua mesma lista)
const artigos: Artigo[] = [
  {
    id: "1",
    titulo: "10 Cenas Fixes que vais adorar",
    categoria: "noticias",
    imagem: "/images/curiosidades.jpg",
  },
  {
    id: "2",
    titulo: "Os melhores memes da semana",
    categoria: "humor",
    imagem: "/images/memes.jpg",
  },
  {
    id: "3",
    titulo: "Top 5 filmes que tens de ver",
    categoria: "viral",
    imagem: "/images/filmes.jpg",
  },
  {
    id: "4",
    titulo: "Novidades tecnológicas incríveis",
    categoria: "tecnologia",
    imagem: "/images/tecnologia.jpg",
  },
  {
    id: "5",
    titulo: "Receitas fáceis e deliciosas",
    categoria: "insolito",
    imagem: "/images/culinaria.jpg",
  },
  {
    id: "6",
    titulo: "Desporto: melhores momentos da semana",
    categoria: "desporto",
    imagem: "/images/desporto.jpg",
  },
]

interface CategoriaPageProps {
  params: { slug: string }
}

export default function CategoriaPage({ params }: CategoriaPageProps) {
  const categoria = params.slug.toLowerCase()
  const artigosCategoria = artigos.filter(a => a.categoria.toLowerCase() === categoria)

  if (artigosCategoria.length === 0) return notFound()

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center capitalize">{categoria}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artigosCategoria.map(artigo => (
          <Link key={artigo.id} href={`/artigo/${artigo.id}`} className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
            {artigo.imagem && (
              <img src={artigo.imagem} alt={artigo.titulo} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="font-semibold text-lg">{artigo.titulo}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
