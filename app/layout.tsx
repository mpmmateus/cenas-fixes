import Navbar from "@/app/ui/dashboard/navbar"
import Footer from "@/app/ui/dashboard/footer" // importa o teu Footer
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="bg-gray-50">
        <Navbar /> {/* Navbar global usada em todas as páginas */}
        <main className="pt-16">{children}</main> {/* espaço para Navbar fixa */}
         <Footer /> {/* Footer global usado em todas as páginas */}
      </body>
    </html>
  )
}

