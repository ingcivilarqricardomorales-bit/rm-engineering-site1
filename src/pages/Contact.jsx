export default function Contact() {
  return (
    <section className="container-narrow py-12 md:py-16">
      <h1 className="text-3xl font-semibold mb-6">Contacto</h1>
      <form className="grid gap-4 max-w-xl">
        <input className="border border-neutral-300 rounded-2xl p-3" placeholder="Nombre" />
        <input className="border border-neutral-300 rounded-2xl p-3" placeholder="Email" type="email" />
        <textarea className="border border-neutral-300 rounded-2xl p-3" placeholder="Mensaje" rows="5" />
        <button type="submit" className="px-5 py-3 rounded-2xl bg-neutral-900 text-white w-fit">Enviar</button>
      </form>
    </section>
  )
}
