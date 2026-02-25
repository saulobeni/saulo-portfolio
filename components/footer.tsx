import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-[#0a0a0a] border-t border-[#222]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/60 text-sm">© {currentYear} Saulo Benicio - Todos os direitos reservados</p>
          </div>

          <div className="flex space-x-4">
            <Link
              href="https://github.com/saulobeni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#00ffaa] transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://linkedin.com/in/saulobenicio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#00ffaa] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="mailto:saulobenicio2016@gmail.com"
              className="text-white/60 hover:text-[#00ffaa] transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
