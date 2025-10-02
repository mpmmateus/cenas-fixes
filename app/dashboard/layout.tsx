
import Sidebar from "@/app/ui/dashboard/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="ml-64 p-8 w-full bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  )
}
