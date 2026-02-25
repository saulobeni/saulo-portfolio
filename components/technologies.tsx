"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Server,
  Database,
  Code,
  FileCode2,
  Coffee,
  Cpu,
  FileJson,
  Box,
  LayoutGrid,
  Workflow,
  Boxes,
} from "lucide-react"

interface Technology {
  name: string
  icon: React.ReactNode
  description: string
  color: string
}

interface TechCategory {
  title: string
  icon: React.ReactNode
  technologies: Technology[]
}

const techCategories: TechCategory[] = [
  {
    title: "Back-End",
    icon: <Server className="w-5 h-5" />,
    technologies: [
      {
        name: "Node.js",
        icon: <Server className="w-8 h-8" />,
        description: "Runtime JavaScript para construção de aplicações server-side escaláveis e de alta performance.",
        color: "#539E43",
      },
      {
        name: "Express",
        icon: <Workflow className="w-8 h-8" />,
        description: "Framework web minimalista e flexível para Node.js, ideal para APIs e aplicações web.",
        color: "#000000",
      },
      {
        name: "Python",
        icon: <FileCode2 className="w-8 h-8" />,
        description: "Linguagem versátil utilizada para scripts, automação e processamento de dados.",
        color: "#3776AB",
      },
      {
        name: "Java",
        icon: <Coffee className="w-8 h-8" />,
        description: "Linguagem orientada a objetos para aplicações empresariais robustas.",
        color: "#007396",
      },
    ],
  },
  {
    title: "Banco de Dados",
    icon: <Database className="w-5 h-5" />,
    technologies: [
      {
        name: "PostgreSQL",
        icon: <Database className="w-8 h-8" />,
        description: "SGBD relacional avançado com suporte a JSON e recursos de escalabilidade.",
        color: "#336791",
      },
      {
        name: "MySQL",
        icon: <Database className="w-8 h-8" />,
        description: "Sistema de gerenciamento de banco de dados relacional popular e confiável.",
        color: "#4479A1",
      },
      {
        name: "Prisma",
        icon: <Cpu className="w-8 h-8" />,
        description: "ORM moderno para Node.js e TypeScript com foco em type safety.",
        color: "#2D3748",
      },
      {
        name: "Sequelize",
        icon: <FileJson className="w-8 h-8" />,
        description: "ORM baseado em promises para Node.js, suportando diversos bancos de dados SQL.",
        color: "#3C76C3",
      },
    ],
  },
  {
    title: "Outros",
    icon: <Code className="w-5 h-5" />,
    technologies: [
      {
        name: "TypeScript",
        icon: <Code className="w-8 h-8" />,
        description: "Superset do JavaScript que adiciona tipagem estática e outros recursos.",
        color: "#3178C6",
      },
      {
        name: "Next.js",
        icon: <LayoutGrid className="w-8 h-8" />,
        description: "Framework React para produção com renderização híbrida e rotas API.",
        color: "#000000",
      },
      {
        name: "Docker",
        icon: <Box className="w-8 h-8" />,
        description: "Plataforma para desenvolvimento, envio e execução de aplicações em containers.",
        color: "#2496ED",
      },
      {
        name: "Microsserviços",
        icon: <Boxes className="w-8 h-8" />,
        description: "Arquitetura de software que estrutura uma aplicação como uma coleção de serviços.",
        color: "#FF61F6",
      },
    ],
  },
]

export function Technologies() {
  const [activeCategory, setActiveCategory] = useState<string>("Back-End")
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const activeCategoryTechs = techCategories.find((cat) => cat.title === activeCategory)?.technologies || []

  return (
    <section id="technologies" className="min-h-screen flex items-center py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#00ffaa]/5 blur-[80px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#3178C6]/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#336791]/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tecnologias</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Ferramentas e tecnologias que utilizo para desenvolver soluções robustas e escaláveis.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {techCategories.map((category) => (
            <motion.button
              key={category.title}
              onClick={() => {
                setActiveCategory(category.title)
                setSelectedTech(null)
              }}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.title
                  ? "bg-[#00ffaa] text-black font-medium"
                  : "bg-[#161616] text-white/70 hover:bg-[#1a1a1a]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`mr-2 ${activeCategory === category.title ? "text-black" : "text-[#00ffaa]"}`}>
                {category.icon}
              </span>
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {activeCategoryTechs.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.2 },
              }}
              className={`relative group cursor-pointer perspective-1000 ${
                selectedTech?.name === tech.name ? "ring-2 ring-[#00ffaa]" : ""
              }`}
              onClick={() => setSelectedTech(tech)}
            >
              <div className="relative bg-[#161616] rounded-xl overflow-hidden transform transition-all duration-500 preserve-3d shadow-lg hover:shadow-xl">
                <div className="p-6 flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 p-2 bg-[#111]"
                    style={{ boxShadow: `0 4px 12px ${tech.color}20` }}
                  >
                    <div className="text-[#00ffaa]">{tech.icon}</div>
                  </div>
                  <h3 className="text-white font-medium text-center">{tech.name}</h3>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 transform -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-12 bg-[#161616] rounded-xl p-6 max-w-4xl mx-auto"
            key={selectedTech.name}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div
                className="w-24 h-24 rounded-lg flex items-center justify-center p-3 bg-[#111]"
                style={{ boxShadow: `0 4px 16px ${selectedTech.color}30` }}
              >
                <div className="text-[#00ffaa] transform scale-150">{selectedTech.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{selectedTech.name}</h3>
                <p className="text-white/70">{selectedTech.description}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 italic">
            Estudando constantemente arquitetura de microsserviços, testes e escalabilidade
          </p>
        </motion.div>
      </div>
    </section>
  )
}
