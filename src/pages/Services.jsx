export default function Services() {
  const services = [
    { title: 'Arquitectura', desc: 'Concepto, anteproyecto, planos IFC y supervisión.' },
    { title: 'Estructuras', desc: 'Concreto, acero, cimentaciones, revisión y valoraciones.' },
    { title: 'MEP', desc: 'HVAC, hidráulica, eléctrica, PCI y puesta en marcha.' },
    { title: 'Gestión', desc: 'PMI, cronogramas, licitaciones y control de obra.' },
  ]
  return (
    <section className="container-narrow py-12 md:py-16">
      <h1 className="text-3xl font-semibold mb-6">Servicios</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s,i)=>(
          <div key={i} className="border border-neutral-200 rounded-3xl p-6 bg-white">
            <h3 className="font-semibold text-lg">{s.title}</h3>
            <p className="text-neutral-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
