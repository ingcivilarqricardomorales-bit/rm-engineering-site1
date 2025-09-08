# RM Studio — SOM+

Sitio React (Vite + Tailwind) con rutas, grilla de proyectos, blog y páginas base.

## Requisitos
- Node.js 18+

## Instalación
```bash
npm install
npm run dev
```

## Estructura
- `src/components`: Navbar, Footer, Hero, ProjectCard, ProjectGrid, CaseStudy
- `src/pages`: Home, Projects, About, Services, Contact, Blog, Post
- `public/projects`: Placeholders de imágenes de proyectos

## Personalización rápida
- Cambia colores en `tailwind.config.cjs`
- Logo en `src/assets/logo.svg`
- Proyectos en `src/pages/Home.jsx` y `src/pages/Projects.jsx`

## Deploy en GitHub + Netlify
1. Crea un repositorio en GitHub y sube todo el contenido.
2. En Netlify: **Add new site → Import an existing project → GitHub**.
3. Selecciona el repo, configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Variables opcionales (si usas librerías adicionales): `NODE_VERSION=18`
5. Deploy.

## Buenas prácticas para superar SOM
- Performance (LCP < 2.5s): imágenes optimizadas y lazy loading.
- Accesibilidad: roles, focus visible, contraste AA.
- SEO técnico: meta tags, rutas limpias, schema.org.
- UX: navegación clara, tipografía legible, microinteracciones sutiles.
