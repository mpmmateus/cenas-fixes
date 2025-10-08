"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/ui/dashboard/navbar";
import Footer from "@/app/ui/dashboard/footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="bg-gray-50">
        <SessionProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
