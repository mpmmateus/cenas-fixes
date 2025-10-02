import Link from "next/link"
import Image from "next/image"

interface Viral {
    id: string
    titulo: string
    imagem: string
    texto: string
}

const virais: Viral[] = [
    {
        id: "1",
        titulo: "Rolls-Royce histórico avaliado em 1 milhão de euros destruído ao embater em viaduto da A1",
        imagem: "/images/viral1.jpg",
        texto: "Um Rolls-Royce Silver Ghost de 1920, avaliado em um milhão de euros e pertencente ao Museu do Caramulo, ficou destruído ao embater num viaduto da A1, na Póvoa de Santa Iria, distrito de Lisboa." +
            "O veículo seguia num camião porta-carros, mas a altura do transporte terá causado o acidente. As causas ainda não estão completamente esclarecidas, mas suspeita-se que um erro de cálculo do motorista do pesado tenha estado na origem do embate."
    },
    {
        id: "2",
        titulo: "Joana Amaral Dias “invade” praxe académica e mostra o seu desagrado com os atos praticados pelos estudantes",
        imagem: "/images/viral2.jpg",
        texto: "Joana Amaral Dias decidiu intervir de forma inesperada numa praxe académica que decorria em Lisboa. A comentadora e antiga deputada apareceu no local com um telemóvel a filmar, para manifestar o seu desagrado relativamente às práticas levadas a cabo pelos estudantes."
    },
]

export default function ViralPage() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-center">Viral</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {virais.map(item => (
                    <Link key={item.id} href={`/viral/${item.id}`} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
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