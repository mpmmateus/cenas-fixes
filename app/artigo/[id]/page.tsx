"use client"
import { notFound } from "next/navigation"

interface Artigo {
  id: string
  titulo: string
  categoria: string
  videos?: string[]
}

// Dados dos artigos com vídeos
const artigos: Artigo[] = [
  {
    id: "1",
    titulo: "10 Cenas Fixes que vais adorar",
    categoria: "Curiosidades",
    videos: [
      "QM3NgoWamdg",
      "y5BpRaOA3fc"
    ],
  },
  {
    id: "2",
    titulo: "Os melhores memes da semana",
    categoria: "Humor",
    videos: [
      "ttqaYUucMXA",
      "gnIiGW4v-Jo",
      "HyPtR4kGtAE",
      "EW41mBzvCVQ",
      "rAZzbDVcrMQ",
      "nSoJN6uoBXo",

    ]
  },
  {
    id: "3",
    titulo: "Top 5 filmes que tens de ver",
    categoria: "Cinema",
    videos: ["BLH_aRk0dtM"]
  },
  {
    id: "4",
    titulo: "Novidades tecnológicas incríveis",
    categoria: "Tecnologia",
    videos: ["wCFTdrlDrNQ"]
  },
  {
    id: "5",
    titulo: "Receitas fáceis e deliciosas",
    categoria: "Lifestyle",
    videos: ["18md1nwaca4"]
  },
  {
    id: "6",
    titulo: "Desporto: melhores momentos da semana",
    categoria: "Desporto",
    videos: ["MNxNNsgXAMY"]
  },
]

interface ArtigoPageProps {
  params: { id: string }
}

export default function ArtigoPage({ params }: ArtigoPageProps) {
  const artigo = artigos.find(a => a.id === params.id)
  if (!artigo) return notFound()

    return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8 text-center">{artigo.titulo}</h1>

      {artigo.videos && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artigo.videos.map((videoId, index) => (
            <div key={index} className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "0"
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}