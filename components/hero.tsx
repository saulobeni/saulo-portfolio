"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code2, Database, Server, Network } from "lucide-react"

// Especialidades principais a serem destacadas
const specialties = [
  {
    name: "TypeScript",
    icon: <Code2 className="w-6 h-6" />,
    color: "#3178C6",
    description: "Tipagem estática e recursos avançados para desenvolvimento escalável",
  },
  {
    name: "PostgreSQL",
    icon: <Database className="w-6 h-6" />,
    color: "#336791",
    description: "Banco de dados relacional robusto com recursos avançados",
  },
  {
    name: "APIs",
    icon: <Server className="w-6 h-6" />,
    color: "#FF5733",
    description: "Desenvolvimento de APIs RESTful eficientes e bem estruturadas",
  },
  {
    name: "Microsserviços",
    icon: <Network className="w-6 h-6" />,
    color: "#00C7B7",
    description: "Arquitetura escalável para aplicações distribuídas",
  },
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(Array(specialties.length).fill(false))

  useEffect(() => {
    // Efeito de cascata para mostrar as especialidades uma após a outra
    const showSpecialties = async () => {
      for (let i = 0; i < specialties.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setIsVisible((prev) => {
          const newState = [...prev]
          newState[i] = true
          return newState
        })
      }
    }

    showSpecialties()
  }, [])

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-20 pb-10 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0f0f0f] z-0"></div>

      {/* Animated dots/grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 z-0"></div>

      {/* Glowing orb effect in background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00ffaa]/5 blur-[100px] z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#3178C6]/5 blur-[80px] z-0"></div>

      <motion.div
        className="container mx-auto text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Saulo Benicio
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl font-medium text-white/80 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Desenvolvedor Back-End Júnior
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/70 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Transformando dados em soluções
        </motion.p>

        {/* Especialidades em destaque */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-8">Especialidades</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.name}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#161616] to-[#0a0a0a] p-1"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: isVisible[index] ? 1 : 0,
                  y: isVisible[index] ? 0 : 20,
                  scale: isVisible[index] ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Borda gradiente animada */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-[#00ffaa]/30 to-transparent z-0 animate-[gradient_3s_ease_infinite]"></div>

                <div className="relative bg-[#121212] rounded-lg p-6 h-full z-10 flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${specialty.color}20` }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: isVisible[index] ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.3 * index + 0.2, type: "spring" }}
                      className="text-[#00ffaa]"
                    >
                      {specialty.icon}
                    </motion.div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{specialty.name}</h4>
                  <p className="text-sm text-white/60 text-center">{specialty.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
