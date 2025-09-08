import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/logo.svg'

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-xl text-sm transition ${isActive ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100'}`
    }
  >
    {label}
  </NavLink>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(o => !o)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="container-narrow flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="RM Studio" className="h-9 w-9" />
          <span className="font-semibold tracking-tight">RM Engineering & Architectural Design</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/projects" label="Proyectos" />
          <NavItem to="/services" label="Servicios" />
          <NavItem to="/about" label="Estudio" />
          <NavItem to="/blog" label="Blog" />
          <NavItem to="/contact" label="Contacto" />
        </nav>
        <button className="md:hidden p-2" onClick={toggle} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-neutral-200">
          <div className="container-narrow py-2 flex flex-col">
            <NavItem to="/projects" label="Proyectos" />
            <NavItem to="/services" label="Servicios" />
            <NavItem to="/about" label="Estudio" />
            <NavItem to="/blog" label="Blog" />
            <NavItem to="/contact" label="Contacto" />
          </div>
        </div>
      )}
    </header>
  )
}
