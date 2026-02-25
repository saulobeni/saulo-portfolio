"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  id: number
  title: string
  description: string
  stack: string[]
  image: string
  githubUrl: string
  demoUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "ERP Modular",
    description: "Sistema ERP modular com foco em banco de dados relacional, controle de estoque, vendas e relatórios.",
    stack: ["Node.js", "Express", "PostgreSQL", "Prisma"],
    image: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com",
  },
  {
    id: 2,
    title: "API de Controle de Estoque",
    description: "API RESTful para controle de estoque com autenticação JWT, logs de atividades e relatórios.",
    stack: ["TypeScript", "Express", "MySQL", "Sequelize"],
    image: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: 3,
    title: "Microsserviço de Autenticação",
    description: "Serviço de autenticação com JWT e refresh token, integração com OAuth e controle de permissões.",
    stack: ["Node.js", "Express", "MongoDB", "Redis"],
    image: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com",
  },
  {
    id: 4,
    title: "API de Processamento de Dados",
    description: "Sistema de processamento de dados em lote com filas, workers e notificações em tempo real.",
    stack: ["Python", "FastAPI", "PostgreSQL", "RabbitMQ"],
    image: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com",
  },
]

export function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (currentSlide < Math.ceil(projects.length / 2) - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentSlide(0)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      setCurrentSlide(Math.ceil(projects.length / 2) - 1)
    }
  }

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projetos</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Conheça alguns dos meus projetos de back-end, focados em performance, estrutura de dados e boas práticas de
            desenvolvimento.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-out"
              initial={{ opacity: 0 }}
              animate={{
                opacity: inView ? 1 : 0,
                x: `-${currentSlide * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.slice(slideIndex * 2, slideIndex * 2 + 2).map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 * (project.id % 2) }}
                        className="h-full"
                      >
                        <Card className="bg-[#161616] border-[#222] h-full overflow-hidden transition-all duration-300 hover:border-[#00ffaa]/50 hover:shadow-[0_0_15px_rgba(0,255,170,0.15)]">
                          <div className="relative h-48 overflow-hidden">
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                              style={{
                                backgroundImage: `url(${project.image})`,
                                transform: `scale(1.05)`,
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent opacity-70" />
                          </div>

                          <CardHeader>
                            <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                          </CardHeader>

                          <CardContent>
                            <p className="text-white/70 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.stack.map((tech) => (
                                <span key={tech} className="text-xs px-2 py-1 rounded-full bg-[#222] text-white/60">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </CardContent>

                          <CardFooter className="flex justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-white/70 border-[#333] hover:bg-[#222] hover:text-white"
                              asChild
                            >
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github size={16} className="mr-2" />
                                GitHub
                              </a>
                            </Button>

                            {project.demoUrl && (
                              <Button size="sm" className="bg-[#00ffaa] text-black hover:bg-[#00ffaa]/80" asChild>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink size={16} className="mr-2" />
                                  Demo
                                </a>
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-6 bg-[#00ffaa]" : "bg-white/30"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
