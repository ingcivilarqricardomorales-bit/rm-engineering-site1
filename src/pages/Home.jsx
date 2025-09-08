import Hero from '../components/Hero'
import ProjectGrid from '../components/ProjectGrid'

const projects = [
  { id: 1, title: 'Torre Brisas', location: 'Panamá', year: 2025, image: '/projects/01.svg' },
  { id: 2, title: 'Museo del Istmo', location: 'Panamá', year: 2024, image: '/projects/02.svg' },
  { id: 3, title: 'Campus Tecnológico', location: 'David', year: 2025, image: '/projects/03.svg' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container-narrow py-12 md:py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold">Proyectos destacados</h2>
          <a className="text-sm underline" href="/projects">Ver todos</a>
        </div>
        <ProjectGrid projects={projects} />
      </section>
    </>
  )
}
