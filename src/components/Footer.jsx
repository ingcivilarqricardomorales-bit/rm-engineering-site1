export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container-narrow py-8 grid md:grid-cols-3 gap-8 text-sm text-neutral-600">
        <div>
          <p className="font-semibold text-neutral-800">RM Engineering & Architectural Design</p>
          <p>Arquitectura, ingeniería y consultoría integral.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-800">Contacto</p>
          <p>Panamá — info@rm-eng-arch.com</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-800">Legal</p>
          <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
