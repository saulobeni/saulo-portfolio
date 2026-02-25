import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Technologies } from "@/components/technologies"
import { Contact } from "@/components/contact"
import { FullPageScroll } from "@/components/full-page-scroll"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <FullPageScroll>
        <Hero />
        <About />
        <Projects />
        <Technologies />
        <Contact />
      </FullPageScroll>
    </main>
  )
}
