import { useParams, Link } from 'react-router-dom'

export default function Post() {
  const { slug } = useParams()
  return (
    <section className="container-narrow py-12 md:py-16 prose prose-neutral">
      <Link to="/blog">← Volver</Link>
      <h1>Título del artículo</h1>
      <p>Slug: <code>{slug}</code></p>
      <p>Escribe aquí tu artículo técnico.</p>
    </section>
  )
}
