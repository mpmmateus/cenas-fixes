import Link from "next/link"
import Image from "next/image"

interface Curiosidade {
    id: string
    titulo: string
    imagem: string
    texto: string
    video?: string
}

const Curiosidade: Curiosidade[] = [
    {
        id: "1",
        titulo: "Maior cápsula do tempo foi finalmente aberta 48 anos depois",
        imagem: "/images/curiosidade1.jpg",
        texto: "Na passada sexta-feira, foi finalmente aberta aquela que é considerada a maior cápsula do tempo do mundo, criada em 1977 por Harold Davisson. O momento reuniu centenas de pessoas, muitas delas descendentes ou familiares dos autores dos objetos guardados. Davisson idealizou esta cápsula com o propósito de deixar memórias da sua época aos netos, permitindo-lhes compreender como era a vida nos anos 70."
    },
    {
        id: "2",
        titulo: "Hotel com 11 metros de altura e 56 centímetros na zona mais estreita faz furor na China",
        imagem: "/images/curiosidade2.jpg",
        texto: "Com apenas 56 centímetros de largura no ponto mais estreito e 11 metros de altura, o “Hotel da Lâmina”, em Chongqing, no sudoeste da China, está a tornar-se um fenómeno turístico. A estrutura invulgar, que parece desafiar as leis da física, rapidamente captou a atenção nas redes sociais e entre visitantes curiosos." +
            "Apesar das dimensões reduzidas, o hotel é funcional e conta com várias divisões distribuídas verticalmente. O nome “Hotel da Lâmina” surge da sua silhueta fina e comprida, que lembra uma lâmina erguida no meio da cidade."
    },
    {
        id: "3",
        titulo: "Tiagovski revela quanto custa manter um Lamborghini Huracán anualmente em Portugal",
        imagem: "/images/curiosidade3.jpg",
        texto: "Ter um Lamborghini Huracán na garagem é um sonho para muitos, mas mantê-lo pode transformar esse sonho num verdadeiro desafio financeiro, mesmo para quem tem a conta bancária mais folgada. O YouTuber português Tiagovski, proprietário de um Huracán há cerca de um ano, decidiu partilhar com os seguidores os custos reais de manter um supercarro como este… e os números não são para todos." +
            "Comecemos pelo básico: a primeira revisão feita na Lamborghini Lisboa ficou por 2200 euros. Só o Imposto Único de Circulação (IUC), obrigatório todos os anos, ronda os 900 euros. Já o seguro para cobrir danos próprios, imprescindível em carros deste calibre, é o que mais pesa: cerca de 5500 euros anuais. E claro, há o combustível, e com um V10 debaixo do capô, não se espera moderação no consumo. Segundo Tiagovski, se juntarmos o valor da gasolina, num ano aproxima-se dos 10000 euros em gastos."
    },
]

export default function CuriosidadePage() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-center">Curiosidades</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Curiosidade.map(item => (
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