"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar artigos..."
        className="flex-1 px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="px-2 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
      >
        🔍
      </button>
    </form>
  )
}
