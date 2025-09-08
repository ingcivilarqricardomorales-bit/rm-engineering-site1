import ProjectGrid from '../components/ProjectGrid'

const projects = Array.from({ length: 9 }).map((_,i)=> ({
  id: i+1,
  title: `Proyecto ${i+1}`,
  location: i%2 ? 'Panamá' : 'Chiriquí',
  year: 2023 + (i%3),
  image: `/projects/${String(i+1).padStart(2,'0')}.svg`
}))

export default function Projects() {
  return (
    <section className="container-narrow py-12 md:py-16">
      <h1 className="text-3xl font-semibold mb-6">Todos los proyectos</h1>
      <ProjectGrid projects={projects} />
    </section>
  )
}
