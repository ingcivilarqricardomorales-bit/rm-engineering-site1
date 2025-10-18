import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <a href="#home" className="flex items-center gap-2 font-bold text-lg text-emerald-700">
          <img src="/logo.png" alt="RM Engineering & Architectural Design - Logo" className="h-8 w-8" />
          RM Engineering &amp; Architectural Design
        </a>
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <li><a href="#services" className="hover:text-emerald-600">Servicios</a></li>
          <li><a href="#projects" className="hover:text-emerald-600">Análisis y Diseños</a></li>
          <li><a href="#contact" className="hover:text-emerald-600">Contacto</a></li>
        </ul>
        <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100" aria-expanded={open} aria-controls="mobile-menu">
          <span className="sr-only">Abrir menú</span>☰
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-200 bg-white px-4 pb-4">
          <ul className="space-y-2 font-medium text-gray-700">
            <li><a href="#services" onClick={() => setOpen(false)}>Servicios</a></li>
            <li><a href="#projects" onClick={() => setOpen(false)}>Análisis y Diseños</a></li>
            <li><a href="#contact" onClick={() => setOpen(false)}>Contacto</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
