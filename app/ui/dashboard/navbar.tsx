"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    router.push("/login")
  }
  const categorias = [
    { nome: "Notícias", slug: "noticias", route: "/noticias" }, // rota própria
    { nome: "Viral", slug: "viral", route: "/viral" },
    { nome: "Desporto", slug: "desporto", route: "/desporto" },
    { nome: "Insólitos", slug: "insolito", route: "/insolito" },
    { nome: "Tecnologia", slug: "tecnologia", route: "/tecnologia" },
    { nome: "Curiosidades", slug: "curiosidade", route: "/curiosidade" },
  ]

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
    window.addEventListener("storage", checkLogin)
    return () => window.removeEventListener("storage", checkLogin)
  }, [])


  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-gray-900 hover:text-gray-700 font-bold text-xl">
          CENAS FIXES
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 font-medium text-sm">
          {categorias.map(c => (
            <Link key={c.slug} href={c.route} className="hover:text-blue-600">
              {c.nome}
            </Link>
          ))}
        </nav>

        {/* Ações Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="destructive">Logout</Button>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Botão Menu Mobile */}
        <button
          className="md:hidden p-2 text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Overlay do menu mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col gap-4 h-full">
          <button className="self-end text-2xl" onClick={() => setMenuOpen(false)}>✕</button>

          <nav className="flex flex-col gap-4 font-medium text-sm mt-6">
            {categorias.map(c => (
              <Link key={c.slug} href={c.route} onClick={() => setMenuOpen(false)}>
                {c.nome}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            {isLoggedIn ? (
              <Button onClick={() => { handleLogout(); setMenuOpen(false) }} variant="destructive" className="w-full">
                Logout
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}