import { motion } from 'framer-motion'
import hero from '../assets/hero.svg'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative">
      <div className="container-narrow py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-6"
          >
            Espacios que elevan la vida urbana.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-neutral-600 mb-8"
          >
            Diseñamos arquitectura sostenible y sistemas MEP de alto desempeño, con precisión normativa (ACI, ASCE, NFPA, NEC) y estética contemporánea.
          </motion.p>
          <div className="flex gap-3">
            <Link to="/projects" className="px-5 py-3 rounded-2xl bg-neutral-900 text-white">Ver proyectos</Link>
            <Link to="/contact" className="px-5 py-3 rounded-2xl border border-neutral-300">Hablemos</Link>
          </div>
        </div>
        <motion.img
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={hero} alt="Hero"
          className="w-full rounded-3xl shadow"
        />
      </div>
    </section>
  )
}
