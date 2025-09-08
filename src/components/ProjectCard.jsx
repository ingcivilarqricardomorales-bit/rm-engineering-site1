import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      className="group rounded-3xl overflow-hidden border border-neutral-200 bg-white"
    >
      <div className="aspect-[16/10] bg-neutral-100" style={{ backgroundImage: `url(${project.image})`, backgroundSize:'cover', backgroundPosition:'center' }} />
      <div className="p-5">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <p className="text-sm text-neutral-600">{project.location} • {project.year}</p>
      </div>
    </motion.article>
  )
}
