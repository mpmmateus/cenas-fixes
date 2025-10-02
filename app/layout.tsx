import Navbar from "@/app/ui/dashboard/navbar"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="bg-gray-50">
        <Navbar /> {/* Navbar global usada em todas as páginas */}
        <main className="pt-16">{children}</main> {/* espaço para Navbar fixa */}
      </body>
    </html>
  )
}

