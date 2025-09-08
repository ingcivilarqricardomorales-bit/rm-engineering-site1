import { Link } from 'react-router-dom'

const posts = [
  { slug: 'normas-aci-318-25', title: 'Qué cambia en ACI 318-25', date: '2025-08-15' },
  { slug: 'asce7-22-panama', title: 'Viento y sismo con ASCE 7-22 en Panamá', date: '2025-07-10' },
]

export default function Blog() {
  return (
    <section className="container-narrow py-12 md:py-16">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>
      <div className="grid gap-4">
        {posts.map(p => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="p-5 rounded-2xl border border-neutral-200 hover:bg-neutral-50">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-neutral-600">{p.date}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
