import { sql } from "@vercel/postgres"

interface Result {
  id: number
  titulo: string
  categoria?: string | null
  origem: string
}

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim()
  if (!query) return <p className="p-6">Por favor, digite algo para pesquisar.</p>

  const result = await sql<Result[]>`
    SELECT id, titulo, categoria, 'artigos' AS origem FROM artigos WHERE titulo ILIKE ${'%' + query + '%'}
    UNION ALL
    SELECT id, titulo, NULL AS categoria, 'noticias' AS origem FROM noticias WHERE titulo ILIKE ${'%' + query + '%'}
    UNION ALL
    SELECT id, titulo, NULL AS categoria, 'virais' AS origem FROM virais WHERE titulo ILIKE ${'%' + query + '%'}
    UNION ALL
    SELECT id, titulo, NULL AS categoria, 'desporto' AS origem FROM desporto WHERE titulo ILIKE ${'%' + query + '%'}
    UNION ALL
    SELECT id, titulo, NULL AS categoria, 'insolito' AS origem FROM insolito WHERE titulo ILIKE ${'%' + query + '%'}
    UNION ALL
    SELECT id, titulo, NULL AS categoria, 'tecnologia' AS origem FROM tecnologia WHERE titulo ILIKE ${'%' + query + '%'}
    UNION ALL
    SELECT id, titulo, NULL AS categoria, 'curiosidades' AS origem FROM curiosidades WHERE titulo ILIKE ${'%' + query + '%'}
    ORDER BY titulo
    LIMIT 50
  `

 const rows = result.rows as any[]

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Resultados para "{query}"</h1>

      {rows.length === 0 ? (
        <p>Nenhum resultado encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map(r => (
            <li key={`${r.origem}-${r.id}`}>
              <a
                href={`/${r.origem}/${r.id}`}
                className="text-blue-600 hover:underline"
              >
                {r.titulo} {r.categoria ? `(${r.categoria})` : ""} - {r.origem}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
