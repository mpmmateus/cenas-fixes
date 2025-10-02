import Link from "next/link"
import Image from "next/image"

interface Noticia {
    id: string
    titulo: string
    imagem: string
    texto: string
}

const noticias: Noticia[] = [
    {
        id: "1", titulo: "Maniche e Rui Santos entram em guerra em direto e moderadora é obrigada a intervir",
        imagem: "/images/ruiEmaniche.jpg",
        texto: "Maniche e Rui Santos protagonizaram um momento de alta tensão em direto na CNN Portugal,num debate que rapidamente descambou para uma troca acesa de acusações. Tudo começou quando o ex-internacional português acusou Rui Santos de desvalorizar as conquistas do FC Porto nas décadas de 80, 90 e 2000, insinuando que o comentador tendia a justificar o sucesso dos azuis e brancos com questões fora das quatro linhas"
    },
    {
        id: "2", titulo: "Adeptos do Galatasaray “incendiaram” a noite do Liverpool com show pirotécnico e muito barulho",
        imagem: "/images/liverpool.jpg",
        texto: "Os jogadores do Liverpool viveram uma noite agitada em Istambul, na véspera do duelo frente ao Galatasaray, a contar para a segunda jornada da fase de grupos da Liga dos Campeões. Dezenas de adeptos da formação turca concentraram-se junto ao hotel onde a equipa inglesa está hospedada e lançaram engenhos pirotécnicos durante a madrugada, numa tentativa de perturbar o descanso do plantel orientado por Arne Slot."
    },
    {
        id: "3", titulo: "Rapper Oruam é levado em ombros por fãs após 69 dias em prisão preventiva",
        imagem: "/images/rapper.jpg",
        texto: "Oruam, rapper brasileiro e filho de um dos líderes do Comando Vermelho,"+
        " foi libertado após 69 dias em prisão preventiva. O tribunal considerou não haver motivos suficientes para manter a detenção, destacando a pequena quantidade de droga apreendida (73g de cocaína) e os “bons antecedentes do rapper”"
    },
]

export default function NoticiasPage() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-center">Notícias</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {noticias.map(noticia => (
                    <Link key={noticia.id} href={`/noticias/${noticia.id}`} className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
                        <div className="relative w-full h-48">
                            <Image src={noticia.imagem} alt={noticia.titulo} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className="p-4">
                            <h2 className="font-semibold text-xl mb-2">{noticia.titulo}</h2>
                            <p>{noticia.texto}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
