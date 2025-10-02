import Link from "next/link"
import Image from "next/image"

interface Insolito {
    id: string
    titulo: string
    imagem: string
    texto: string
}

const insolitos: Insolito[] = [
    {
        id: "1",
        titulo: "Passageiro adormece de forma abusiva no avião e mulher à sua frente decide retaliar",
        imagem: "/images/insolito1.jpg",
        texto: "Um passageiro acabou por dormir de forma particularmente incômoda num voo, recostando-se sem pensar na senhora sentada à sua frente. A passageira, visivelmente incomodada, decidiu reagir de forma criativa… e abriu espaço para uma “sessão de pedicure improvisada”, aproveitando a situação para se vingar do comportamento do vizinho de poltrona"
    },
    {
        id: "2",
        titulo: "Pai não esperava as “rajadas” potentes do filho e salta de susto na hora de mudar a fralda",
        imagem: "/images/insolito2.jpg",
        texto: "Shaq Barrett, jogador da NFL, estava a ajudar a esposa a mudar a fralda do filho. Durante a troca, a criança teve um “acidente” de diarreia. A força e a rapidez do incidente foram suficientes para fazer Barrett saltar da cadeira na tentativa de se afastar da confusão." +
            "No entanto, mesmo com o salto brutal da cadeira, acabou por não conseguir escapar totalmente à situação, tornando o momento engraçado e viral nas redes sociais. "
    },
]

export default function InsolitoPage() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-center">Insólitos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {insolitos.map(item => (
                    <Link key={item.id} href={`/insolito/${item.id}`} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
                        <div className="relative w-full h-48">
                            <Image src={item.imagem} alt={item.titulo} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className="p-4">
                            <h2 className="font-semibold text-xl mb-2">{item.titulo}</h2>
                            <p className="text-gray-700">{item.texto}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}