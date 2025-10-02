// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Sobre */}
        <div>
          <h2 className="text-lg font-bold mb-2">Sobre</h2>
          <Link href="/sobre" className="text-sm underline hover:text-white">
            Saber mais
          </Link>
        </div>

        {/* Contactos Online */}
        <div>
          <h2 className="text-lg font-bold mb-2">Contactos Online</h2>
          <ul className="text-sm space-y-1">
            <li>Email: <a href="mailto:contato@teusite.pt" className="underline hover:text-white">contato@cenasfixes.pt</a></li>
            <li><a href="https://www.instagram.com/" target="_blank" className="underline hover:text-white">Instagram</a></li>
            <li><a href="https://www.youtube.com/" target="_blank" className="underline hover:text-white">YouTube</a></li>
          </ul>
        </div>

        {/* Direitos Autorais */}
        <div className="md:text-right">
          <p className="text-sm">&copy; 2025 CenasFixes. Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
