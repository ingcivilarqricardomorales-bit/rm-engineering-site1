import React from "react";

export default function Hero() {
  return (
    <section id="home" className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <video aria-hidden="true" tabIndex={-1} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/hero-fallback.jpg">
        <source src="/hero-bg.webm" type="video/webm" />
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">Ingeniería + Arquitectura</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">Diseños integrados para resultados <span className="text-amber-600">medibles</span></h1>
          <p className="mt-5 text-lg text-white/90 max-w-xl">Cumplimiento estricto de códigos UPC/IPC, NFPA/NEC, ASCE 7 y mejores prácticas PMI. Optimizamos costo, tiempo y calidad con enfoque en desempeño.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold shadow-sm text-white" style={{ backgroundColor: "#1f6a56" }}>Solicitar cotización</a>
            <a href="#projects" className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold ring-1 ring-white/60 hover:bg-white/10">Ver Análisis y Diseños</a>
          </div>
        </div>
      </div>
    </section>
  );
}
