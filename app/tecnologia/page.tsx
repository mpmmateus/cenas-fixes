import Link from "next/link"
import Image from "next/image"

interface Tecnologia {
    id: string
    titulo: string
    imagem: string
    texto: string
}

const tecnologias: Tecnologia[] = [
    {
        id: "1",
        titulo: "Executivo da Apple desafia jornalista a partir ao meio o finíssimo iPhone Air… “Fica por minha conta se conseguires”",
        imagem: "/images/tec1.jpg",
        texto: "A Apple revelou esta semana a nova série iPhone 17, composta por quatro modelos, destacando-se especialmente o iPhone Air, que se tornou no telemóvel mais fino alguma vez lançado pela marca, com apenas 5,6 mm de espessura." +
            "O design ultrafino, no entanto, suscitou algumas preocupações entre utilizadores mais antigos, recordando o polémico iPhone 6 Plus de 2014, que chegou a ser apelidado de ‘Bendgate’ por se dobrar com facilidade. A dúvida levantada é se o iPhone Air, ainda mais fino, poderia enfrentar problemas similares." +
            "A Apple pareceu querer dissipar essas incertezas de forma prática. Durante uma entrevista com o site Tom’s Guide, Greg ‘Joz’ Joswiak, responsável de Marketing, apresentou o iPhone Air a jornalistas e incentivou-os a tentar partir o dispositivo ao meio. “Tenta parti-lo. Fica por minha conta”, disse Joswiak, desafiando Mark Spoonauer e Lance Ulanoff a testar a resistência do equipamento."
    },
    {
        id: "2",
        titulo: "Como é andar de robotaxi… “o Uber sem condutor” que já opera nos EUA",
        imagem: "/images/tec2.jpg",
        texto: "Como é viajar num carro que conduz sozinho, sem motorista ao volante? O YouTuber de tecnologia Marques Brownlee foi até ao Texas, um dos estados norte-americanos onde já operam serviços de robotaxi, para mostrar como funciona esta nova forma de mobilidade."
    },
    {
        id: "3",
        titulo: "Posto de combustível na China usa robô para abastecer carros de forma autónoma",
        imagem: "/images/tec3.jpg",
        texto: "Um vídeo gravado recentemente na China está a dar que falar nas redes sociais, ao mostrar um posto de combustível onde já não são precisos funcionários. Em vez disso, é um robô que trata de todo o processo de abastecimento – desde abrir a tampa do depósito, até reabastecer o veículo e fechar novamente tudo no final." +
            "O momento foi captado nos arredores de Hangzhou, capital da província de Zhejiang, e revela o funcionamento de um sistema desenvolvido pela Sinopec, uma das maiores empresas estatais chinesas do setor do petróleo e gás. O equipamento consiste num braço robótico que identifica automaticamente a localização da tampa do depósito, realiza o enchimento com precisão e regressa à sua posição inicial após concluir a tarefa."
    },
]

export default function TecnologiaPage() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-center">Tecnologia</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tecnologias.map(item => (
                    <Link key={item.id} href={`/tecnologia/${item.id}`} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
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