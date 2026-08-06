# Informe de validación

Fecha: 5 de agosto de 2026

## Resultado

La versión entregada se publica directamente desde `public/` y no depende de Vite, React, Tailwind, npm ni un proceso de compilación.

## Pruebas realizadas

### Estructura y contenido

- Un único encabezado `h1`.
- Jerarquía de encabezados sin saltos.
- Identificadores HTML sin duplicados.
- Todas las imágenes contienen atributo `alt`.
- Todos los botones y enlaces tienen nombre accesible.
- Todos los controles visibles del formulario tienen etiqueta asociada.
- Todos los recursos locales referenciados existen.
- JSON-LD válido.
- `site.webmanifest` válido.
- `netlify.toml` válido.

### JavaScript

- `public/app.js` supera `node --check`.
- Menú móvil probado: apertura, cierre y tecla Escape.
- Selección de servicio comprobada.
- Preferencia de movimiento reducido comprobada.
- No se detectaron errores de consola durante las pruebas de interacción.

### Formulario y correo

- Consentimiento registrado mediante `privacyConsent=accepted`.
- Campo señuelo antispam activo.
- Comprobación de tiempo mínimo activa cuando JavaScript está disponible.
- Validación de nombre, correo, mensaje y consentimiento.
- Sanitización de contenido antes de crear el correo.
- Pruebas unitarias realizadas para:
  - envío válido;
  - correo inválido;
  - consentimiento ausente;
  - campo señuelo completado;
  - envío excesivamente rápido.
- La función genera contenido de correo en texto plano y HTML.

### Responsive y accesibilidad

Probado en los siguientes anchos:

- 360 px
- 390 px
- 768 px
- 1024 px
- 1440 px
- 1920 px

Resultado:

- Sin desbordamiento horizontal.
- Menú adaptativo funcional.
- Formulario de una columna en móvil y dos columnas en escritorio.
- Contenido visible sin JavaScript.
- Animaciones desactivadas con `prefers-reduced-motion`.
- Contrastes principales superiores a WCAG AA.

### Rendimiento

- Video principal reducido de aproximadamente 20.5 MB combinados a menos de 1.8 MB combinados.
- Video sin audio, 1280×720, 10 segundos.
- El video solo se carga en pantallas compatibles, sin ahorro de datos y sin reducción de movimiento.
- PNG pesados y duplicados eliminados.
- Tamaño total aproximado del proyecto: 2.8 MB.
- Imágenes secundarias en WebP y carga diferida.
- Analítica cargada únicamente después del consentimiento.

## Comprobaciones externas necesarias después del despliegue

Estas comprobaciones dependen de servicios externos y no pueden certificarse fuera de la cuenta de producción:

1. Confirmar que Netlify detecte el formulario `contact`.
2. Configurar las variables de entorno de SendGrid.
3. Realizar un envío real y confirmar recepción.
4. Ejecutar Lighthouse sobre la URL pública con CDN y encabezados activos.
5. Confirmar Search Console, sitemap, DNS y certificado TLS.

El código incluye la configuración necesaria para estas comprobaciones.
