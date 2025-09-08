import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
    </div>
  )
}
