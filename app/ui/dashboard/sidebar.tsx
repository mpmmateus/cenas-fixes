import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-gray-300">📊 Estatísticas</Link>
        <Link href="/dashboard/artigos" className="hover:text-gray-300">📝 Artigos</Link>
        <Link href="/dashboard/categorias" className="hover:text-gray-300">📂 Categorias</Link>
        <Link href="/dashboard/utilizadores" className="hover:text-gray-300">👤 Utilizadores</Link>
        <Link href="/dashboard/config" className="hover:text-gray-300">⚙️ Configurações</Link>
      </nav>
    </aside>
  )
}
