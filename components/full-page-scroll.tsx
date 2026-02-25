"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

export function FullPageScroll({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const sectionCount = Array.isArray(children) ? children.length : 1
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  // Handle wheel scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling) return

      const delta = e.deltaY
      if (delta > 0 && currentSection < sectionCount - 1) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev + 1)
      } else if (delta < 0 && currentSection > 0) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev - 1)
      }
    }

    const sectionsElement = sectionsRef.current
    if (sectionsElement) {
      sectionsElement.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (sectionsElement) {
        sectionsElement.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection, isScrolling, sectionCount])

  // Handle touch events for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      touchEndY.current = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
      if (isScrolling) return

      const diff = touchStartY.current - touchEndY.current
      if (diff > 50 && currentSection < sectionCount - 1) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev + 1)
      } else if (diff < -50 && currentSection > 0) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev - 1)
      }
    }

    const sectionsElement = sectionsRef.current
    if (sectionsElement) {
      sectionsElement.addEventListener("touchstart", handleTouchStart, { passive: false })
      sectionsElement.addEventListener("touchmove", handleTouchMove, { passive: false })
      sectionsElement.addEventListener("touchend", handleTouchEnd, { passive: false })
    }

    return () => {
      if (sectionsElement) {
        sectionsElement.removeEventListener("touchstart", handleTouchStart)
        sectionsElement.removeEventListener("touchmove", handleTouchMove)
        sectionsElement.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection, isScrolling, sectionCount])

  // Update URL hash and reset isScrolling after transition
  useEffect(() => {
    const sections = ["home", "about", "projects", "technologies", "contact"]
    const sectionId = sections[currentSection]
    if (sectionId) {
      history.replaceState(null, "", `#${sectionId}`)
    }

    const timer = setTimeout(() => setIsScrolling(false), 1000)
    return () => clearTimeout(timer)
  }, [currentSection])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if (e.key === "ArrowDown" && currentSection < sectionCount - 1) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev + 1)
      } else if (e.key === "ArrowUp" && currentSection > 0) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, isScrolling, sectionCount])

  const navigateToSection = (index: number) => {
    if (index >= 0 && index < sectionCount && !isScrolling) {
      setIsScrolling(true)
      setCurrentSection(index)
    }
  }

  const getSectionBackground = (index: number) => {
    const backgrounds = [
      "bg-[#0a0a0a]", // Home
      "bg-[#0f0f0f]", // About
      "bg-[#0a0a0a]", // Projects
      "bg-[#0f0f0f]", // Technologies
      "bg-[#0a0a0a]", // Contact
    ]
    return backgrounds[index] || "bg-[#0a0a0a]"
  }

  return (
    <div ref={sectionsRef} className="h-screen overflow-hidden relative">
      <div
        className="transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div
                key={index}
                className={`h-screen w-full ${getSectionBackground(index)} flex items-center justify-center`}
              >
                {child}
              </div>
            ))
          : <div className="h-screen bg-[#0a0a0a]">{children}</div>}
      </div>

      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col items-center space-y-4">
          {Array.from({ length: sectionCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSection(index)}
              className="group relative flex items-center"
              aria-label={`Navegar para seção ${index + 1}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSection === index ? "w-3 h-3 bg-[#00ffaa]" : "bg-white/30 group-hover:bg-white/50"
                }`}
              />
              <span className="absolute right-full mr-2 py-1 px-2 rounded bg-[#161616] text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {["Home", "Sobre", "Projetos", "Tecnologias", "Contato"][index]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
