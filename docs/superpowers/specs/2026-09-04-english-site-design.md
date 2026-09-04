# Versión en inglés de la web Alventor — Diseño

## Objetivo

Crear una versión en inglés de la web pública de Alventor (`alventor.es`), navegable mediante
un selector de idioma ES/EN en el nav, manteniendo el aspecto visual idéntico a la versión en
castellano.

## Contexto

- Sitio HTML estático (sin build tool), hosteado en GitHub Pages (`CNAME` → `alventor.es`).
- 9 páginas HTML actuales: `index`, `servicios`, `proyectos`, `quienes-somos`, `contacto`,
  `carrera`, `actualidad`, `reconstruccion`, `manual`. `manual.html` es documentación interna
  del panel admin, no cara al público. `reconstruccion.html` es una página huérfana: no está
  enlazada desde `NAV_LINKS` (nadie llega a ella navegando el sitio), no usa el sistema
  compartido de nav/footer (`nav-root`/`footer-root`/`components.js` — tiene su propio
  header/footer estáticos con enlaces `href="#"` que no llevan a ningún sitio) y ya mezcla
  español e inglés de forma inconsistente. Ninguna de las dos entra en este trabajo.
- `js/components.js` genera de forma centralizada el nav y el footer compartidos por todas
  las páginas públicas (funciones `renderNav()` / `renderFooter()`), con lógica de ruta base
  ya existente para el caso `/admin`.
- `js/data.js` gestiona proyectos y noticias con un patrón localStorage-first: `AlventorData`
  lee de `localStorage`, y si no hay nada guardado cae a `DEFAULT_PROJECTS`/`DEFAULT_NEWS`
  (actualmente solo 3 proyectos y 4 noticias de ejemplo). El contenido real y actualizado que
  el usuario ha ido añadiendo desde `admin/` vive únicamente en el `localStorage` de su
  navegador — nunca se exportó ni se volcó al repositorio.
- El panel `admin/` (`admin/index.html` + `admin/admin.js`) es una herramienta interna en
  castellano, independiente de `components.js` (no usa `nav-root`/`footer-root`).

## Alcance

### Incluido

- Carpeta `/en/` con las **7 páginas públicas** que usan el sistema compartido de nav/footer
  traducidas: `index`, `servicios`, `proyectos`, `quienes-somos`, `contacto`, `carrera`,
  `actualidad`.
- Selector de idioma **ES / EN** (texto, sin banderas) en el nav de escritorio y en el menú
  móvil.
- `js/components.js` adaptado para ser bilingüe sin duplicarse.
- `js/data.js` con el catálogo real y definitivo de proyectos/noticias (a partir del JSON
  exportado desde el admin) más sus campos traducidos al inglés.
- Traducción de: textos de cada página, formulario de contacto (incluidas las opciones del
  desplegable), textos `alt` de imágenes, `<title>` de cada página.
- Etiquetas `hreflang="es"` / `hreflang="en"` enlazando cada página con su par en el otro
  idioma, por buenas prácticas de SEO en sitios bilingües.

### Explícitamente fuera de alcance

- `manual.html` — sigue existiendo solo en castellano y no se enlaza desde el selector de
  idioma.
- `reconstruccion.html` — página huérfana, sin enlace desde el nav ni el sistema compartido;
  queda fuera igual que `manual.html`, sin traducir ni corregir en este trabajo.
- El panel `admin/` — sigue gestionando contenido únicamente en castellano; no se añaden
  campos bilingües a sus formularios en este trabajo.
- Detección automática del idioma del navegador, o redirección automática — el idioma que ve
  el visitante lo determina exclusivamente la URL en la que está. La raíz del sitio
  (`alventor.es`) siempre sirve la versión en castellano por defecto.
- Traducción automática de proyectos/noticias que se añadan en el futuro desde el admin —
  aparecerán en la página en inglés con su texto en español como respaldo (ver más abajo),
  hasta que alguien les añada la traducción a mano en el código.

## Arquitectura de archivos

- `/en/index.html`, `/en/servicios.html`, ... — copia de cada página pública con el texto
  traducido al inglés, misma maquetación y clases Tailwind que su equivalente en español.
- Las páginas de `/en/` **reutilizan** los recursos compartidos existentes vía ruta relativa
  ascendente: `../css/custom.css`, `../js/data.js`, `../js/components.js`, `../js/main.js`,
  `../js/tailwind-config.js`, `../img/*`. No se duplica ningún CSS, JS ni imagen — solo el
  HTML con el texto ya traducido.
- Esto garantiza que el resultado visual sea idéntico: es la misma hoja de estilos y el mismo
  motor de animaciones/interacciones (`main.js`) el que sirve a ambos idiomas.

## Navegación y selector de idioma

### `js/components.js`

- `NAV_LINKS` gana una segunda etiqueta en inglés por entrada (p.ej.
  `{ href: 'servicios.html', label: 'Servicios', label_en: 'Services' }`). `renderNav()` y
  `renderFooter()` detectan el idioma activo comprobando si `window.location.pathname`
  contiene `/en/`, y usan la etiqueta correspondiente.
- Se añade una función `getRootBase()` (independiente de la `getBase()` existente, que sigue
  gobernando solo el caso `/admin`) que devuelve `'../'` cuando la página está dentro de
  `/en/`, usada exclusivamente por el enlace "Panel Admin" del footer (que siempre apunta al
  único panel admin real, en la raíz del repositorio).
- Los enlaces del logo, el CTA de contacto y los enlaces de navegación normales **no** usan
  `getRootBase()`: al ser rutas relativas de solo nombre de archivo (`servicios.html`, no
  `/servicios.html`), ya resuelven correctamente dentro de la carpeta actual (raíz o `/en/`),
  manteniendo al visitante dentro del idioma en el que está navegando.

### Selector de idioma

- Se añade un pequeño elemento **ES / EN** en el nav de escritorio y en el menú móvil. El
  idioma activo se muestra resaltado (no clicable); el otro es un enlace.
- El destino del enlace se calcula a partir del nombre de archivo actual (reutilizando
  `getCurrentFile()`, ya existente):
  - Desde una página en la raíz (`/servicios.html`) el enlace a inglés apunta a
    `en/servicios.html`.
  - Desde una página dentro de `/en/` (`/en/servicios.html`) el enlace a español apunta a
    `../servicios.html`.
- No hay redirección automática por idioma de navegador ni memoria de la elección entre
  visitas: el idioma mostrado depende únicamente de la URL.
- Cada página lleva en el `<head>` sus etiquetas `hreflang` correspondientes, apuntando a la
  URL absoluta de su par en el otro idioma.

## Contenido dinámico (`js/data.js`)

### Paso previo obligatorio

El usuario debe exportar desde el panel admin (botón "Exportar") el JSON con el catálogo real
de proyectos y noticias tal como existe hoy en el `localStorage` de su navegador. Este
proyecto de traducción no puede empezar la parte de contenido dinámico sin ese archivo.

### Cambios en el esquema de datos

- `DEFAULT_PROJECTS` y `DEFAULT_NEWS` se sustituyen por el catálogo real exportado (esto
  corrige de paso el problema ya detectado de que otros navegadores/ordenadores veían
  únicamente los 3 proyectos de ejemplo en vez del contenido real).
- Cada proyecto gana los campos opcionales `title_en` y `description_en`; cada noticia gana
  `title_en` y `excerpt_en`. Los campos existentes en español no se renombran ni se tocan, así
  que el admin sigue funcionando exactamente igual que hoy.
- `SECTOR_LABELS` y `CAT_LABELS` ganan sus diccionarios equivalentes en inglés
  (`SECTOR_LABELS_EN`, `CAT_LABELS_EN`).
- `projectCardHTML(p, lang = 'es')` y `newsCardHTML(n, featured, lang = 'es')` ganan un
  parámetro de idioma con valor por defecto `'es'` (no rompe ninguna llamada existente en las
  páginas en castellano). Cuando `lang === 'en'`, usan `title_en`/`description_en`/`excerpt_en`
  y el diccionario de etiquetas en inglés; si un campo `_en` no existe, hacen fallback al
  campo en español correspondiente.
- `fmtDate()` gana el mismo parámetro de idioma, usando el locale `en-GB` para las fechas en
  las páginas en inglés.
- Las páginas de `/en/` (`en/index.html`, `en/proyectos.html`) invocan estas mismas funciones
  con `lang: 'en'`; siguen leyendo de la misma fuente de datos (`AlventorData.getVisibleProjects()`
  / `getVisibleNews()`), por lo que cualquier edición hecha desde el admin se refleja en ambos
  idiomas igual que hoy — con fallback a español para los campos `_en` que falten.

## Notas de mantenimiento futuro

- Un proyecto/noticia nuevo añadido desde el admin no tendrá `title_en`/`description_en` hasta
  que alguien lo edite a mano en `js/data.js`; mientras tanto la página en inglés mostrará el
  texto en español como respaldo, sin romperse.
- El admin panel sigue siendo la única fuente de verdad para el contenido en español; este
  trabajo no introduce una segunda fuente de verdad ni un flujo de sincronización automático.
