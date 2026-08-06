# RM Engineering & Architectural Design

Sitio institucional optimizado para Netlify, desarrollado como aplicación web estática sin dependencias de compilación.

## Arquitectura

- `public/index.html`: página principal, SEO, JSON-LD y formulario Netlify.
- `public/styles.css`: sistema visual, responsive y accesibilidad.
- `public/app.js`: menú accesible, video adaptativo, selección de servicios, animaciones y consentimiento analítico.
- `public/politica-de-privacidad.html`: política de privacidad.
- `public/terminos.html`: términos de uso.
- `public/success.html`: confirmación del formulario.
- `netlify/functions/submission-created.js`: notificación por SendGrid.
- `netlify.toml`: publicación, funciones, redirecciones, caché y encabezados de seguridad.

## Despliegue en Netlify

El repositorio no requiere `npm install` ni proceso de compilación.

- Directorio de publicación: `public`
- Directorio de funciones: `netlify/functions`

Netlify leerá estos valores directamente desde `netlify.toml`.

## Variables de entorno requeridas

Configurar en **Netlify → Site configuration → Environment variables**:

```text
SENDGRID_API_KEY=clave_privada_de_sendgrid
MAIL_TO=correo_que_recibe_las_solicitudes
MAIL_FROM=remitente_verificado_en_sendgrid
MAIL_FROM_NAME=RM Engineering
```

`MAIL_FROM_NAME` es opcional. `MAIL_FROM` debe estar autorizado en SendGrid.

## Formulario

El formulario utiliza:

- Netlify Forms.
- Campo señuelo antispam.
- Validación HTML nativa.
- Tiempo mínimo de envío cuando JavaScript está habilitado.
- Consentimiento de privacidad registrado como `privacyConsent=accepted`.
- Sanitización y validación adicional en la función de correo.

Después del despliegue, verificar en Netlify que el formulario `contact` aparezca en la sección **Forms**.

## Analítica

Google Analytics se carga únicamente si el visitante acepta la medición opcional. El identificador actual está definido en `public/app.js`:

```js
const analyticsId = "G-E9V1Y5PFKK";
```

## Validación recomendada después del despliegue

1. Enviar una solicitud real desde el formulario.
2. Confirmar el registro en Netlify Forms.
3. Confirmar la recepción del correo mediante SendGrid.
4. Revisar móvil y escritorio.
5. Ejecutar Lighthouse sobre la URL pública.
6. Verificar Search Console y el sitemap.

## Contenido profesional

El sitio no publica cifras, testimonios ni proyectos inventados. Cuando existan casos de estudio autorizados, deben añadirse como contenido verificable.
