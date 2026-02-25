// ❌ Remova qualquer "use client" do layout.tsx
// ✅ Não use useState, useEffect nem lógica de cliente diretamente aqui

import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Saulo Benicio | Desenvolvedor Back-End Júnior",
  description: "Back-end sólido, foco em performance e estrutura de dados.",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <div className="relative">{children}</div>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
