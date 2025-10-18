import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function App() {
  const services = [
    { title: "Arquitectura & BIM", desc: "Anteproyecto, modelado BIM (ISO-19650), planos constructivos y especificaciones técnicas.", bullets: ["Eficiencia energética","Coordinación multidisciplinaria","Normativa local"] },
    { title: "Estructuras & Sismo", desc: "Análisis/diseño según ASCE 7, ACI/AISC. Optimización por desempeño y revisión independiente.", bullets: ["Modelos lineales/no lineales","Pórticos, muros, cimentaciones","QA/QC estructural"] },
    { title: "Hidrosanitarias", desc: "Sistemas de agua potable, pluvial y sanitaria cumpliendo UPC/IPC. Memorias Técnicas e isométricos.", bullets: ["Cálculo de caudal/DFU","Trampas de grasa, PTAR","Detalles y especificaciones"] },
    { title: "Eléctricas & NFPA", desc: "Diseño BT/MT según NEC (NFPA 70). Alumbrado, tomacorrientes, tableros y protecciones.", bullets: ["Cortocircuito y caída de tensión","Selectividad/Coordinación","Puesta a tierra, GFCI/AFCI"] },
    { title: "Gerencia de Proyectos", desc: "Planificación y control con PMI/Lean. Cronograma, presupuesto, entregables y trazabilidad.", bullets: ["Matrices RACI","Gestión de riesgos","Control de calidad"] },
    { title: "Peritajes & Auditorías", desc: "Inspecciones, diagnósticos y peritajes técnicos con informe y plan de acción.", bullets: ["Patologías de obra","Cumplimiento normativo","Valoración de riesgos"] },
  ];

  const projects = [
    { title: "Microsoft Project", tag: "Diagrama de Gantt", metric: "Ruta Crítica", img: "/msp.png" },
    { title: "Precios Unitarios", tag: "CAPAC-SUNTRAC", metric: "Rendimientos", img: "/pu.png" },
    { title: "Planos y Memorias Técnicas", tag: "CSI", metric: "Estándares en la construcción", img: "/p.png" },
    { title: "Trámites de Construcción", tag: "Entidades Públicas y Privadas", metric: "Permisos de Construcción y Ocupación", img: "/t.png" },
    { title: "Paisajismo", tag: "Forma y Espacio", metric: "Lenguaje del sitio", img: "/ls.png" },
    { title: "Renderización", tag: "Tiempo Real", metric: "Lumion/Vray/D5/Enscape/Twinmotion", img: "/rd.png" },
  ];

  return (
    <div className="bg-[#f6f7f9]">
      <Navbar />
      <Hero />
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Servicios</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <article key={s.title} className="rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md transition-shadow p-6">
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{s.desc}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section id="projects" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Análisis y Diseño</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((c) => (
            <figure key={c.title} className="group relative rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm">
              <img src={c.img} alt={c.title} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="text-xs opacity-90">{c.tag}</div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-amber-300">{c.metric}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="contact" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-black/10 bg-white shadow-sm p-8">
          <h2 className="text-3xl font-bold">Contacto</h2>
          <p className="mt-2 text-gray-600">Cuéntanos sobre tu proyecto. Respondemos entre 24 y 72 horas hábiles.</p>
          <form name="contact" method="POST" action="/success.html" data-netlify="true" netlify-honeypot="bot-field" acceptCharset="UTF-8" className="mt-8 grid gap-4">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden"><label> No llenar: <input name="bot-field" /> </label></p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                <input id="name" name="name" autoComplete="name" required className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Tu nombre" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" type="email" name="email" autoComplete="email" required className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="tunombre@ejemplo.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
              <input id="subject" name="subject" defaultValue="Solicitud de cotización" className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
              <textarea id="message" name="message" required rows={6} className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Describe brevemente tu proyecto, plazos y alcance…"></textarea>
            </div>
            <div data-netlify-recaptcha="true"></div>
            <div className="flex items-center justify-between gap-4">
              <button type="submit" className="rounded-xl px-6 py-3 font-semibold shadow-sm bg-amber-500 text-white hover:opacity-90">Enviar solicitud</button>
              <a href="https://wa.me/50766074960" target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">WhatsApp</a>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
