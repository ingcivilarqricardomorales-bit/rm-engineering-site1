export default function CaseStudy({ title, intro, body }) {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1>{title}</h1>
      <p className="lead">{intro}</p>
      {body?.map((b,i)=>(<p key={i}>{b}</p>))}
    </article>
  )
}
