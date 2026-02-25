"use client"

import { useState, useEffect } from "react"

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "Sobre" },
  { id: "projects", label: "Projetos" },
  { id: "technologies", label: "Tecnologias" },
  { id: "contact", label: "Contato" },
]

export function SectionNav() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= currentPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Set initial active section

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDotClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleDotClick(section.id)}
            className="group relative flex items-center"
            aria-label={`Navegar para ${section.label}`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id ? "w-3 h-3 bg-[#00ffaa]" : "bg-white/30 group-hover:bg-white/50"
              }`}
            />
            <span className="absolute right-full mr-2 py-1 px-2 rounded bg-[#161616] text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
