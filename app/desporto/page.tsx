import Link from "next/link"
import Image from "next/image"

interface Desporto {
    id: string
    titulo: string
    imagem: string
    texto: string
}

const desportos: Desporto[] = [
    {
        id: "1",
        titulo: "Momento histórico no Mundial sub-20: Foi utilizado o “cartão verde” pela 1ª vez",
        imagem: "/images/desporto1.jpg",
        texto: "O Mundial de sub-20, que decorre no Chile, ficou marcado por um momento histórico: a estreia do cartão verde — que, afinal, é azul." +
            "No minuto 37 do encontro entre Coreia do Sul e Ucrânia, o selecionador sul-coreano, Lee Chang-won, utilizou este novo recurso para solicitar ao árbitro a análise de um lance duvidoso na área adversária, após a queda de um dos seus jogadores." +
            "Apesar da novidade, o pedido não trouxe benefícios à equipa asiática, já que o árbitro costa-riquenho Keylor Herrera, depois de rever as imagens no VAR, manteve a decisão inicial e optou por não assinalar qualquer infração."
    },
    {
        id: "2",
        titulo: "José Mourinho deixou Laura Woods de mão estendida e o momento tornou-se viral",
        imagem: "/images/desporto2.jpg",
        texto: "Laura Woods, repórter da TNT Sports, viveu um momento constrangedor durante a cobertura do Chelsea-Benfica. Ao tentar cumprimentar José Mourinho com um aperto de mão na mesa de comentários," +
            "o treinador acabou por não se aperceber e continuou a falar com Joe Cole, antigo jogador que orientou nos tempos em que esteve no Chelsea." +
            "A reação de Laura Woods, de mão estendida e visivelmente surpreendida por ter sido ignorada, rapidamente se tornou viral nas redes sociais. Apesar do “incidente”, Woods acabou por conseguir cumprimentar Mourinho logo de seguida."
    },
]

export default function DesportoPage() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-center">Desporto</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {desportos.map(item => (
                    <Link key={item.id} href={`/desporto/${item.id}`} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
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