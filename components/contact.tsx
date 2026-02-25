"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const contactLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/saulobeni",
      username: "github.com/saulobeni",
      color: "#333",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: "https://linkedin.com/in/saulobenicio",
      username: "linkedin.com/in/saulobenicio",
      color: "#0077B5",
    },
    {
      name: "Email",
      icon: <Mail className="w-6 h-6" />,
      url: "mailto:saulobenicio2016@gmail.com",
      username: "saulobenicio2016@gmail.com",
      color: "#D44638",
    },
  ]

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#00ffaa]/5 blur-[80px]"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#3178C6]/5 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contato</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Interessado em trabalharmos juntos? Entre em contato comigo através das redes sociais.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                custom={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="block"
              >
                <div className="bg-[#161616] rounded-xl p-6 h-full border border-[#222] hover:border-[#00ffaa]/50 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-lg"
                      style={{ backgroundColor: `${link.color}20`, boxShadow: `0 0 0 rgba(${link.color}, 0)` }}
                    >
                      <div className="text-white group-hover:text-[#00ffaa] transition-colors duration-300">
                        {link.icon}
                      </div>
                    </div>
                    <h3 className="text-white font-medium text-lg mb-2">{link.name}</h3>
                    <p className="text-white/60 text-sm mb-4">{link.username}</p>
                    <div className="flex items-center text-[#00ffaa] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="mr-1">Conectar</span>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
