"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const highlights = [
    "Estruturação e manutenção de bancos de dados (PostgreSQL, MySQL)",
    "Desenvolvimento de APIs com Express e Node.js",
    "Paginação e filtros eficientes em APIs REST",
    "Estudos contínuos em arquitetura de microsserviços",
    "Conhecimento em linguagens como JavaScript, TypeScript, Python e Java",
  ]

  return (
    <section id="about" className="min-h-screen flex items-center py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Quem Sou</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg leading-relaxed mb-10 text-center md:text-left"
          >
            <p>
              Sou um desenvolvedor back-end júnior com paixão por estruturar e otimizar dados. Tenho experiência em
              manutenção de bancos PostgreSQL e MySQL, e já atuei em APIs RESTful com Express, Node.js, Prisma e
              Sequelize.
            </p>
            <p className="mt-4">
              Atualmente estudo arquitetura de microsserviços e boas práticas em design de software, com atenção à
              experiência do usuário e acessibilidade mesmo no back-end. Também tenho noções de UX design para tornar o
              produto final mais intuitivo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#161616] rounded-xl p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Destaques</h3>
            <ul className="space-y-3">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-[#00ffaa] mr-2">•</span>
                  <span className="text-white/70">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
