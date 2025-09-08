export default function About() {
  return (
    <section className="container-narrow py-12 md:py-16">
      <h1 className="text-3xl font-semibold mb-6">El Estudio</h1>
      <div className="prose prose-neutral">
        <p>
          Somos un estudio interdisciplinario que integra arquitectura, estructuras y MEP para entregar resultados medibles:
          menor energía operativa, mayor confort y costos de ciclo de vida optimizados.
        </p>
        <ul>
          <li>Diseño estructural con ACI 318-25 y ASCE 7-22.</li>
          <li>Protección contra incendios conforme a NFPA 101/13/20.</li>
          <li>Eléctrico y telecom: NEC 2023, IEEE.</li>
        </ul>
      </div>
    </section>
  )
}
