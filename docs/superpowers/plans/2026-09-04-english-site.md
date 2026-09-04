# Versión en Inglés de la Web Alventor — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear una versión en inglés navegable de la web pública de Alventor (7 páginas, catálogo real de proyectos/noticias, selector ES/EN), idéntica visualmente a la versión en castellano.

**Architecture:** Carpeta `/en/` con copias traducidas de las 7 páginas que usan el sistema de nav/footer compartido, reutilizando `css/`, `js/` e `img/` vía rutas relativas `../`. `js/data.js` gana campos `_en` opcionales con fallback a español; `js/components.js` gana un selector de idioma y etiquetas bilingües.

**Tech Stack:** HTML estático + Tailwind CDN + JS vanilla (sin build tool, sin framework de test — verificación vía Node/grep y checklist manual en navegador).

**Nota sobre adaptación del formato de plan:** Esta es una tarea con mucho contenido de traducción (texto de marketing), no solo lógica. Las Tareas 1 y 2 (datos y componentes compartidos) llevan código completo y verificación automatizable, como es habitual. Para las 7 páginas HTML, en vez de reescribir cada archivo completo dentro de este plan (duplicaría ~120KB de HTML ya existente), cada tarea de página incluye una **tabla completa de traducción ES→EN de cada cadena visible** (contenido real, no placeholders) más los cambios de estructura exactos (rutas `../`, `hreflang`, `lang`), y un comando de verificación automatizable (grep de caracteres/acentos españoles residuales). La Tarea 3 sí incluye el HTML completo de un ejemplo trabajado (`quienes-somos.html`) para fijar el patrón exacto.

---

## Precondición (ya completada antes de este plan)

El usuario exportó desde el admin el catálogo real: 40 proyectos, 5 noticias (archivo `alventor-data-2026-09-04.json`). Sin imágenes rotas. Este plan usa ese catálogo real (no los 3 proyectos de ejemplo que hoy están en `js/data.js`).

## Estructura de archivos afectados

- **Modificar:** `js/data.js` (catálogo real + bilingüe)
- **Modificar:** `js/components.js` (nav/footer bilingües + selector de idioma)
- **Crear:** `en/quienes-somos.html`, `en/servicios.html`, `en/proyectos.html`, `en/contacto.html`, `en/carrera.html`, `en/actualidad.html`, `en/index.html`
- **Modificar:** `index.html`, `servicios.html`, `proyectos.html`, `quienes-somos.html`, `contacto.html`, `carrera.html`, `actualidad.html` (añadir `<link rel="alternate" hreflang>` en cada `<head>`)
- **Fuera de alcance:** `manual.html`, `reconstruccion.html`, `admin/` (ver spec)

---

### Task 1: `js/data.js` — catálogo real bilingüe

**Files:**
- Modify: `js/data.js` (reemplazo completo de `DEFAULT_PROJECTS`, `DEFAULT_NEWS`, `SECTOR_LABELS`, `CAT_LABELS`, `fmtDate`, `projectCardHTML`, `newsCardHTML`; añadir `SECTOR_LABELS_EN`, `CAT_LABELS_EN`, `TYPE_LABELS_EN`)

- [ ] **Step 1: Reemplazar el archivo completo**

Sustituye **todo el contenido** de `js/data.js` por el siguiente (mismo `AlventorData` que ya existe, sin cambios en su lógica de `localStorage`; solo cambian los datos por defecto y las funciones de render):

```javascript
/* ============================================================
   ALVENTOR — Data Layer (localStorage-backed)
   ============================================================ */

const KEYS = {
  projects: 'alventor_projects',
  news:     'alventor_news',
};

const DEFAULT_PROJECTS = [
  {
    id: 3,
    title: "Obras Civiles e Infraestructuras Básicas PTE 50000 Archena",
    title_en: "Civil Works and Basic Infrastructure — PTE 50000 Archena",
    description: "Ejecución de obras civiles e infraestructuras básicas de la Plataforma Técnica de Ejecución PTE 50000 en Archena, incluyendo movimiento de tierras, cimentaciones y estructuras de acceso.",
    description_en: "Execution of civil works and basic infrastructure for the PTE 50000 Technical Execution Platform in Archena, including earthworks, foundations and access structures.",
    image: "img/Archena2.jpg",
    type: "EPC",
    location: "Archena, ESP",
    sector: "infraestructuras",
    badge: "Modelo EPC",
    badge_en: "EPC Model",
    featured: false,
    hidden: true
  },
  {
    id: 2,
    title: "LAV | Edificios Técnicos Ferroviarios",
    title_en: "HSR | Railway Technical Buildings",
    description: "Construcción y adecuación de edificios técnicos en la Línea de Alta Velocidad Córdoba–Málaga, incluyendo obra civil, instalaciones eléctricas y de climatización, comunicaciones y espacios destinados a los sistemas de control y señalización ferroviaria.",
    description_en: "Construction and fit-out of technical buildings on the Córdoba–Málaga High-Speed Rail Line, including civil works, electrical and HVAC installations, communications and spaces for railway control and signalling systems.",
    image: "img/Ave1.jpg",
    type: "EPC",
    location: "Andalucia, ESP",
    sector: "infraestructuras",
    badge: "Modelo EPC - FERROVIARIO",
    badge_en: "EPC Model - RAILWAY",
    featured: true,
    status: "completado",
    year: "",
    value: "",
    tags: []
  },
  {
    title: "Construcción de ACC Costa Rica",
    title_en: "Construction of Costa Rica ACC",
    location: "San José, Costa Rica",
    description: "Ejecución de la obra civil completa del nuevo Centro de Control de Área (ACC) de Costa Rica, incluyendo edificación, instalaciones técnicas y adecuación de infraestructura para los sistemas de control de tráfico aéreo.",
    description_en: "Execution of the complete civil works for Costa Rica's new Area Control Centre (ACC), including building works, technical installations and infrastructure fit-out for air traffic control systems.",
    sector: "infraestructuras",
    status: "completado",
    type: "Construcción",
    badge: "EPC",
    year: "2019",
    value: "€ 835.377,78",
    image: "img/ACCCostaRica.JPG",
    tags: ["ACC", "Control Aéreo", "Obra Civil", "Centroamérica"],
    id: 1788106000651,
    featured: true
  },
  {
    id: 1026,
    title: "Túneles Vilariño — Línea de Alta Velocidad",
    title_en: "Vilariño Tunnels — High-Speed Rail Line",
    description: "Obras civiles e instalaciones en interior de túneles de la línea de alta velocidad en Galicia, bajo los estrictos estándares técnicos y de seguridad de las obras ferroviarias AVE.",
    description_en: "Civil works and installations inside high-speed rail tunnels in Galicia, under the strict technical and safety standards of AVE railway works.",
    image: "img/Entrada tunel.jpg",
    type: "Construcción",
    location: "Vilariño, Galicia, ESP",
    sector: "infraestructuras",
    badge: "Obras civiles ferroviarias",
    badge_en: "Railway Civil Works",
    status: "completado",
    featured: true,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1018,
    title: "Hangar Maestranza — Base Aérea Cuatro Vientos Madrid",
    title_en: "Maestranza Hangar — Cuatro Vientos Air Base, Madrid",
    description: "Dotación completa de instalaciones mecánicas, ventilación y servicios técnicos para hangar de mantenimiento aeronáutico de grandes dimensiones.",
    description_en: "Full mechanical installations, ventilation and technical services for a large-scale aeronautical maintenance hangar.",
    image: "img/1771586297891.jfif",
    type: "Instalaciones",
    location: "Madrid, ESP",
    sector: "instalaciones",
    badge: "Instalaciones mecánicas industriales",
    badge_en: "Industrial Mechanical Installations",
    status: "completado",
    featured: true,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    title: "Supervisión CWS Kuwait",
    title_en: "CWS Supervision, Kuwait",
    location: "Kuwait",
    description: "Servicios de supervisión técnica de obra (CWS) para infraestructura de vigilancia aérea en Kuwait, garantizando el cumplimiento de estándares de calidad y plazos.",
    description_en: "Construction works supervision (CWS) services for air surveillance infrastructure in Kuwait, ensuring compliance with quality standards and schedules.",
    sector: "infraestructuras",
    status: "completado",
    type: "Construcción",
    badge: "Supervisión obra",
    badge_en: "Works Supervision",
    year: "",
    value: "€ 193.038,55",
    image: "img/SIMULATOR FURNITURE.png",
    tags: ["Supervisión", "Kuwait", "Oriente Medio"],
    id: 1788106000661,
    featured: false
  },
  {
    id: 1019,
    title: "Hangar Base Aérea Talavera de la Reina",
    title_en: "Hangar — Talavera de la Reina Air Base",
    description: "Instalaciones mecánicas, ventilación industrial y servicios técnicos para hangar de mantenimiento de vehículos y maquinaria pesada.",
    description_en: "Mechanical installations, industrial ventilation and technical services for a heavy vehicle and machinery maintenance hangar.",
    image: "img/adi-edificio_dotacional-talavera_hangar-4.jpg",
    type: "Instalaciones",
    location: "Talavera de la Reina, Toledo, ESP",
    sector: "instalaciones",
    badge: "Instalaciones mecánicas industriales",
    badge_en: "Industrial Mechanical Installations",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1004,
    title: "Hospital Geriátrico y Centro de Día — La Unión",
    title_en: "Geriatric Hospital and Day Centre — La Unión",
    description: "Construcción de edificio e instalaciones completas de hospital geriátrico y centro de día de nueva planta, bajo normativa técnica sanitaria y en régimen llave en mano.",
    description_en: "Construction of a new-build geriatric hospital and day centre, building and full installations, under healthcare technical regulations and delivered turnkey.",
    image: "/img/IMG_20140722_133815.jpg",
    type: "EPC",
    location: "La Unión, Murcia, ESP",
    sector: "edificacion",
    badge: "Llave en mano · Nueva construcción sanitaria",
    badge_en: "Turnkey · New Healthcare Facility",
    status: "completado",
    featured: false,
    hidden: false,
    year: "2020",
    value: "€ 8,4 MM",
    tags: []
  },
  {
    id: 1016,
    title: "Hotel Princes of Kos — Grecia",
    title_en: "Hotel Princes of Kos — Greece",
    description: "Reforma y adecuación de zonas exteriores, piscinas y áreas de ocio del complejo vacacional en la isla griega de Kos, con gestión logística internacional especializada.",
    description_en: "Renovation and fit-out of outdoor areas, pools and leisure spaces of the holiday resort on the Greek island of Kos, with specialised international logistics management.",
    image: "img/princesskos.jfif",
    type: "EPC",
    location: "Kos, GRC",
    sector: "edificacion",
    badge: "Espacios exteriores",
    badge_en: "Outdoor Areas",
    status: "completado",
    featured: true,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    title: "Centro Control Aéreo aeropuerto La Mesa",
    title_en: "La Mesa Airport Air Control Centre",
    location: "San Pedro Sula, Honduras",
    description: "Desarrollo integral del proyecto de Centro de Control Aereo y radar en San Pedro Sula, Honduras, consolidando la presencia en Centroamérica junto con Costa Rica.",
    description_en: "Full development of the Air Control Centre and radar project in San Pedro Sula, Honduras, consolidating our presence in Central America alongside Costa Rica.",
    sector: "infraestructuras",
    status: "completado",
    type: "EPC",
    badge: "Proyecto Centroamérica",
    badge_en: "Central America Project",
    year: "2021",
    value: "€ 1.230.737,77",
    image: "img/Anexis-118.jpg",
    tags: ["Radar", "Honduras", "Centroamérica"],
    id: 1788106000656
  },
  {
    id: 1,
    title: "Reforma Zonas Comunes Meliá Milan",
    title_en: "Common Area Refurbishment — Meliá Milan",
    description: "Reforma integral de las zonas comunes del hotel Meliá Milano, incluyendo hall de entrada, áreas de restauración y espacios de uso general con acabados de alto standing en hotel en plena operación.",
    description_en: "Full refurbishment of the common areas of the Meliá Milano hotel, including the entrance hall, dining areas and general-use spaces, with high-end finishes in a fully operating hotel.",
    image: "img/Melia Milano Hall.JPG",
    type: "EPC",
    location: "Milan, ITA",
    sector: "edificacion",
    badge: "Rehabilitación Hotelera",
    badge_en: "Hotel Refurbishment",
    featured: true,
    status: "completado",
    year: "",
    value: "",
    tags: []
  },
  {
    title: "Bournemouth Radar Site",
    title_en: "Bournemouth Radar Site",
    location: "Bournemouth, Reino Unido",
    location_en: "Bournemouth, United Kingdom",
    description: "Ejecución del emplazamiento radar de Bournemouth, en el Reino Unido, dentro del programa de modernización de infraestructura de vigilancia aérea.",
    description_en: "Execution of the Bournemouth radar site in the United Kingdom, as part of the air surveillance infrastructure modernisation programme.",
    sector: "infraestructuras",
    status: "completado",
    type: "EPC",
    badge: "Europa Occidental",
    badge_en: "Western Europe",
    year: "",
    value: "€ 350.495,15",
    image: "img/IMG-20211112-WA0014.jpg",
    tags: ["Radar", "Reino Unido", "Europa"],
    id: 1788106000659,
    featured: false
  },
  {
    id: 1008,
    title: "Hotel Meliá White House — Londres",
    title_en: "Hotel Meliá White House — London",
    description: "Reforma integral de instalaciones en hotel de cinco estrellas en el centro de Londres, ejecutada con el hotel en plena actividad y bajo normativa de construcción del Reino Unido.",
    description_en: "Full refurbishment of facilities in a five-star hotel in central London, carried out with the hotel fully operational and under UK construction regulations.",
    image: "img/WhatsApp Image 2020-11-11 at 20.22.42 (1).jpeg",
    type: "EPC",
    location: "London, GBR",
    sector: "edificacion",
    badge: "Reforma integral",
    badge_en: "Full Refurbishment",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1027,
    title: "Estación Ferroviaria Pontevedra — ADIF",
    title_en: "Pontevedra Railway Station — ADIF",
    description: "Instalaciones electromecánicas de modernización de estación ferroviaria para ADIF, coordinadas con el servicio ferroviario en activo y bajo protocolos de seguridad ferroviaria.",
    description_en: "Electromechanical installations for the modernisation of a railway station for ADIF, coordinated with live rail service under railway safety protocols.",
    image: "img/Estación Cerceda-Meirama_Nuevo ascensor y andenes y marquesina remodelados.jpg",
    type: "Instalaciones",
    location: "Pontevedra, Galicia, ESP",
    sector: "infraestructuras",
    badge: "Modernización ferroviaria",
    badge_en: "Railway Modernisation",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1011,
    title: "Hotel Tivoli — Vilamoura, Portugal",
    title_en: "Hotel Tivoli — Vilamoura, Portugal",
    description: "Reforma integral de habitaciones en uno de los hoteles de referencia del Algarve, con coordinación total con la operativa del establecimiento durante toda la obra.",
    description_en: "Full refurbishment of rooms in one of the Algarve's flagship hotels, with full coordination with the establishment's operations throughout the works.",
    image: "/img/tivoli-room-2.jpg",
    type: "EPC",
    location: "Vilamoura, Algarve, PRT",
    sector: "edificacion",
    badge: "Reforma integral",
    badge_en: "Full Refurbishment",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "€ 1,2MM",
    tags: ["Reforma", "Hospitality", "Llave en Mano"]
  },
  {
    id: 1029,
    title: "Edificios Técnicos – LAV Madrid–Barcelona",
    title_en: "Technical Buildings – Madrid–Barcelona HSR",
    description: "Construcción y adecuación de edificios técnicos en la Línea de Alta Velocidad Madrid–Barcelona, incluyendo obra civil e instalaciones asociadas a los sistemas de control, señalización, comunicaciones y energía, bajo los exigentes estándares técnicos y de seguridad de la infraestructura ferroviaria.",
    description_en: "Construction and fit-out of technical buildings on the Madrid–Barcelona High-Speed Rail Line, including civil works and installations for control, signalling, communications and power systems, under the demanding technical and safety standards of railway infrastructure.",
    image: "img/ave2.jpg",
    type: "EPC",
    location: "Madrid - Barcelona, ESP",
    sector: "infraestructuras",
    badge: "Sistemas de control ferroviario · AVE",
    badge_en: "Railway Control Systems · AVE",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1006,
    title: "Residencia Geriátrica Huelva",
    title_en: "Huelva Geriatric Care Home",
    description: "Reforma integral del centro con refuerzo de la estructura existente y renovación completa de todas las instalaciones técnicas. Proyecto llave en mano con actividad asistencial continuada.",
    description_en: "Full refurbishment of the facility with structural reinforcement of the existing building and complete renewal of all technical installations. Turnkey project delivered with continuous care operations.",
    image: "img/Residenciaclecehuelva.jpg",
    type: "EPC",
    location: "Huelva, Andalucía, ESP",
    sector: "edificacion",
    badge: "Llave en mano · Reforma integral + Refuerzo estructural",
    badge_en: "Turnkey · Full Refurbishment + Structural Reinforcement",
    status: "completado",
    featured: false,
    hidden: false,
    year: "2019",
    value: "€ 4,5 MM",
    tags: []
  },
  {
    title: "Radares en Agadir, Safi e Ifrane",
    title_en: "Radars in Agadir, Safi and Ifrane",
    location: "Agadir, Safi e Ifrane, Marruecos",
    location_en: "Agadir, Safi and Ifrane, Morocco",
    description: "Suministro e instalación de sistemas radar en tres emplazamientos de Marruecos, como parte de la modernización de la red nacional de vigilancia aérea.",
    description_en: "Supply and installation of radar systems at three sites in Morocco, as part of the modernisation of the national air surveillance network.",
    sector: "infraestructuras",
    status: "completado",
    type: "EPC",
    badge: "Red de Radares Marruecos",
    badge_en: "Morocco Radar Network",
    year: "2020",
    value: "€ 2.301.423,93",
    image: "img/IMG-20180805-WA0076.jpg",
    tags: ["Radar", "Marruecos", "Red Nacional", "Vigilancia Aérea"],
    id: 1788106000654
  },
  {
    id: 1010,
    title: "Hotel Tryp — Múnich",
    title_en: "Hotel Tryp — Munich",
    description: "Renovación integral de los sistemas de climatización y ventilación del hotel bajo normativa técnica alemana, con el establecimiento en activo durante toda la intervención.",
    description_en: "Full renovation of the hotel's HVAC and ventilation systems under German technical regulations, with the establishment operating throughout the intervention.",
    image: "img/PHOTO-2020-10-30-16-42-11 (2).jpg",
    type: "Instalaciones",
    location: "München, DEU",
    sector: "instalaciones",
    badge: "Climatización y ventilación",
    badge_en: "HVAC and Ventilation",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1001,
    title: "CIMI Los Alcores — Sevilla",
    title_en: "CIMI Los Alcores — Seville",
    description: "Construcción de nuevas unidades residenciales y dotación completa de instalaciones técnicas para el centro de menores. Proyecto llave en mano ejecutado sin interrupción del servicio asistencial.",
    description_en: "Construction of new residential units and complete technical installations for the minors' care centre. Turnkey project executed without interrupting care services.",
    image: "img/2016-03-29-PHOTO-00000130.jpg",
    type: "EPC",
    location: "Los Alcores, Sevilla, ESP",
    sector: "edificacion",
    badge: "Llave en mano · Reforma integral y nueva construcción",
    badge_en: "Turnkey · Full Refurbishment and New Build",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1017,
    title: "Taller ADIF Fuencarral — Madrid",
    title_en: "ADIF Fuencarral Workshop — Madrid",
    description: "Instalaciones mecánicas y de climatización industrial en taller de mantenimiento de material rodante ferroviario para ADIF, con ventilación especializada para entornos ferroviarios.",
    description_en: "Mechanical and industrial HVAC installations at a rolling-stock maintenance workshop for ADIF, with specialised ventilation for railway environments.",
    image: "img/260603-np-madrid-adif-acceso-ferroviario-fuencarral.jpg",
    type: "Instalaciones",
    location: "Fuencarral, Madrid, ESP",
    sector: "instalaciones",
    badge: "Instalaciones mecánicas e industriales",
    badge_en: "Mechanical and Industrial Installations",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1002,
    title: "CIMI Huelva — Santa Úrsula",
    title_en: "CIMI Huelva — Santa Úrsula",
    description: "Rehabilitación integral del edificio existente y construcción de nuevas edificaciones con instalaciones completas. Proyecto llave en mano con actividad asistencial continuada durante toda la obra.",
    description_en: "Full rehabilitation of the existing building and construction of new facilities with complete installations. Turnkey project with continuous care operations throughout the works.",
    image: "img/DSC_0396.JPG",
    type: "EPC",
    location: "Huelva, Andalucía, ESP",
    sector: "edificacion",
    badge: "Llave en mano · Rehabilitación + Nueva edificación",
    badge_en: "Turnkey · Rehabilitation + New Building",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1007,
    title: "Hotel Cactus Playa — Palma de Mallorca",
    title_en: "Hotel Cactus Playa — Palma de Mallorca",
    description: "Reforma integral de instalaciones y espacios en hotel vacacional en primera línea de Palma de Mallorca.",
    description_en: "Full refurbishment of facilities and spaces at a beachfront holiday hotel in Palma de Mallorca.",
    image: "img/cactus palma.jpg",
    type: "EPC",
    location: "Palma de Mallorca, ESP",
    sector: "edificacion",
    badge: "Reforma integral",
    badge_en: "Full Refurbishment",
    status: "completado",
    featured: false,
    hidden: true,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1012,
    title: "Hotel Alua Flamingo — Málaga",
    title_en: "Hotel Alua Flamingo — Málaga",
    description: "Reforma integral de habitaciones e instalaciones técnicas del hotel vacacional en la Costa del Sol, con mejora sustancial de la eficiencia energética del establecimiento.",
    description_en: "Full refurbishment of rooms and technical installations at the holiday hotel on the Costa del Sol, with a substantial improvement in the establishment's energy efficiency.",
    image: "img/hotel-costa-malaga-adults-recommended-by-pierre-vacances-torremolinos-pic-51.jfif",
    type: "EPC",
    location: "Málaga, ESP",
    sector: "edificacion",
    badge: "Reforma integral",
    badge_en: "Full Refurbishment",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1024,
    title: "Puesta en Marcha STS + Smartlogger — Prosolia",
    title_en: "STS + Smartlogger Commissioning — Prosolia",
    description: "Puesta en marcha de sistemas de transformación, inversores y plataformas de monitorización Smartlogger en plantas fotovoltaicas de media y gran potencia.",
    description_en: "Commissioning of transformation systems, inverters and Smartlogger monitoring platforms at medium and large-scale photovoltaic plants.",
    image: "img/stshuawei.jpg",
    type: "Instalaciones",
    location: "España",
    location_en: "Spain",
    sector: "instalaciones",
    badge: "Comisionado y puesta en marcha",
    badge_en: "Commissioning and Start-Up",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1013,
    title: "Complejo Turístico Bellevue — BlueBay Hotels",
    title_en: "Bellevue Resort — BlueBay Hotels",
    description: "Reforma integral y ampliación de capacidad del complejo turístico, con intervención simultánea en múltiples zonas del establecimiento y gestión avanzada de frentes de trabajo.",
    description_en: "Full refurbishment and capacity expansion of the resort, with simultaneous intervention across multiple areas of the establishment and advanced management of parallel work fronts.",
    image: "img/o7-be-klub-servicios-15837214.jpg",
    type: "EPC",
    location: "España",
    location_en: "Spain",
    sector: "edificacion",
    badge: "Reforma y ampliación",
    badge_en: "Refurbishment and Expansion",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1014,
    title: "Hotel Sol Timor — Torremolinos",
    title_en: "Hotel Sol Timor — Torremolinos",
    description: "Reforma integral de la totalidad de instalaciones del hotel en la Costa del Sol, ejecutada en plazo ajustado durante período de baja ocupación con equipos operando en paralelo.",
    description_en: "Full refurbishment of all hotel installations on the Costa del Sol, completed on a tight schedule during the low-occupancy season with teams operating in parallel.",
    image: "img/sol-torremolinos-don-marco-adults-recommended-exterior-10d2f9ee.jpg",
    type: "EPC",
    location: "Torremolinos, Málaga, ESP",
    sector: "edificacion",
    badge: "Reforma integral",
    badge_en: "Full Refurbishment",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1028,
    title: "Estación Ferroviaria Salamanca — ADIF",
    title_en: "Salamanca Railway Station — ADIF",
    description: "Renovación de instalaciones electromecánicas en la estación de Salamanca, nodo ferroviario clave de la red española, con plena coordinación con la operativa de ADIF.",
    description_en: "Renovation of electromechanical installations at Salamanca station, a key node in the Spanish rail network, in full coordination with ADIF's operations.",
    image: "img/Anden_principal_estación_Salamanca.jpg",
    type: "Instalaciones",
    location: "Salamanca, ESP",
    sector: "infraestructuras",
    badge: "Modernización ferroviaria",
    badge_en: "Railway Modernisation",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1015,
    title: "Hotel Exe Macarena — Sevilla",
    title_en: "Hotel Exe Macarena — Seville",
    description: "Reforma integral de habitaciones e instalaciones en hotel de referencia en el centro histórico de Sevilla, dentro del plan de renovación de la cadena Hotusa Hotels.",
    description_en: "Full refurbishment of rooms and installations at a flagship hotel in the historic centre of Seville, as part of the Hotusa Hotels chain renovation plan.",
    image: "img/exe-sevilla-macarena-habitacion-13f8f5dd.jpg",
    type: "EPC",
    location: "Sevilla, ESP",
    sector: "edificacion",
    badge: "Reforma integral",
    badge_en: "Full Refurbishment",
    status: "completado",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1020,
    title: "Planta Producción Biocarburantes — Murcia",
    title_en: "Biofuel Production Plant — Murcia",
    description: "Instalaciones mecánicas completas de planta de producción de biocarburantes: sistemas de proceso, almacenamiento y seguridad en zona ATEX para combustibles sostenibles.",
    description_en: "Complete mechanical installations for a biofuel production plant: process systems, storage and safety in an ATEX zone for sustainable fuels.",
    image: "",
    type: "EPC",
    location: "Murcia, ESP",
    sector: "instalaciones",
    badge: "Instalaciones industriales de proceso · ATEX",
    badge_en: "Industrial Process Installations · ATEX",
    status: "completado",
    featured: false,
    hidden: true
  },
  {
    id: 1021,
    title: "Planta Producción Biocarburantes — Canarias",
    title_en: "Biofuel Production Plant — Canary Islands",
    description: "Instalaciones mecánicas de planta de biocarburantes en las Islas Canarias, con soluciones técnicas contrastadas y gestión logística especializada para entorno insular.",
    description_en: "Mechanical installations for a biofuel plant in the Canary Islands, with proven technical solutions and specialised logistics management for an island setting.",
    image: "",
    type: "EPC",
    location: "Islas Canarias, ESP",
    location_en: "Canary Islands, ESP",
    sector: "instalaciones",
    badge: "Instalaciones industriales · Territorio insular",
    badge_en: "Industrial Installations · Island Territory",
    status: "completado",
    featured: false,
    hidden: true
  },
  {
    id: 1022,
    title: "Plantas Fotovoltaicas Talay",
    title_en: "Talay Photovoltaic Plants",
    description: "Instalaciones eléctricas de AT/BT, inversores y sistemas de monitorización en plantas de generación solar de gran potencia.",
    description_en: "MV/LV electrical installations, inverters and monitoring systems at large-scale solar generation plants.",
    image: "",
    type: "Instalaciones",
    location: "España",
    location_en: "Spain",
    sector: "instalaciones",
    badge: "Instalaciones eléctricas · Fotovoltaica",
    badge_en: "Electrical Installations · Photovoltaic",
    status: "completado",
    featured: false,
    hidden: true
  },
  {
    id: 1023,
    title: "Reemplazo Inversores Solares — Baleares",
    title_en: "Solar Inverter Replacement — Balearic Islands",
    description: "Sustitución de inversores en plantas solares de las Islas Baleares, mejorando el rendimiento global y extendiendo la vida operativa de las instalaciones de generación.",
    description_en: "Inverter replacement at solar plants in the Balearic Islands, improving overall performance and extending the operational life of the generation facilities.",
    image: "",
    type: "Instalaciones",
    location: "Islas Baleares, ESP",
    location_en: "Balearic Islands, ESP",
    sector: "instalaciones",
    badge: "Renovación de sistemas · Energía solar",
    badge_en: "System Renewal · Solar Energy",
    status: "completado",
    featured: false,
    hidden: true,
    year: "",
    value: "",
    tags: []
  },
  {
    id: 1025,
    title: "Mantenimiento Inversores — Plantas Solares",
    title_en: "Inverter Maintenance — Solar Plants",
    description: "Servicio de mantenimiento preventivo y correctivo de inversores en plantas solares distribuidas, con tiempos de respuesta a avería mínimos y reportes técnicos periódicos.",
    description_en: "Preventive and corrective maintenance service for inverters at distributed solar plants, with minimal fault response times and periodic technical reports.",
    image: "img/Inversor-solar-fotovoltaico.jpg",
    type: "Instalaciones",
    location: "España",
    location_en: "Spain",
    sector: "instalaciones",
    badge: "Operación y mantenimiento · Energía solar",
    badge_en: "Operation and Maintenance · Solar Energy",
    status: "activo",
    featured: false,
    hidden: false,
    year: "",
    value: "",
    tags: []
  },
  {
    title: "Diseño y Suministro de Torres Metálicas Argelia",
    title_en: "Design and Supply of Steel Towers — Algeria",
    location: "Argelia",
    location_en: "Algeria",
    description: "Diseño estructural y fabricación de torres metálicas para radar, incluyendo ingeniería de detalle y suministro completo para múltiples emplazamientos en Argelia.",
    description_en: "Structural design and manufacturing of radar steel towers, including detailed engineering and full supply for multiple sites in Algeria.",
    sector: "infraestructuras",
    status: "completado",
    type: "EPC",
    badge: "Diseño y Suministro",
    badge_en: "Design and Supply",
    year: "",
    value: "€ 803.393,77",
    image: "",
    tags: ["Torres Radar", "Ingeniería", "Fabricación", "África"],
    id: 1788106000652,
    hidden: true
  },
  {
    title: "Montajes e Instalaciones Sites Radar Argelia",
    title_en: "Radar Site Assembly and Installation — Algeria",
    location: "Argelia",
    location_en: "Algeria",
    description: "Montaje e instalación de equipos radar en múltiples emplazamientos simultáneos en Argelia, coordinando logística, obra civil y puesta en marcha en cada site.",
    description_en: "Assembly and installation of radar equipment at multiple simultaneous sites in Algeria, coordinating logistics, civil works and commissioning at each site.",
    sector: "infraestructuras",
    status: "completado",
    type: "Instalaciones",
    badge: "Montaje Multisitio",
    badge_en: "Multi-Site Assembly",
    year: "2023",
    value: "€ 1.139.269,03",
    image: "img/IMG-20210104-WA0001.jpg",
    tags: ["Radar", "Instalación", "Multisitio", "África"],
    id: 1788106000653,
    hidden: true
  },
  {
    title: "Radar S3T Morón",
    title_en: "Radar S3T Morón",
    location: "Morón de la Frontera, España",
    description: "Suministro, instalación y puesta en servicio del sistema de radar de vigilancia S3T en la Base Aérea de Morón, incluyendo la integración V2I. Uno de los proyectos de referencia de Alventor en España.",
    description_en: "Supply, installation and commissioning of the S3T surveillance radar system at Morón Air Base, including V2I integration. One of Alventor's flagship projects in Spain.",
    sector: "infraestructuras",
    status: "completado",
    type: "EPC",
    badge: "Proyecto Insignia España",
    badge_en: "Flagship Project Spain",
    year: "",
    value: "€ 530.261,98",
    image: "",
    tags: ["Radar", "Defensa", "España", "Vigilancia"],
    id: 1788106000655,
    hidden: true
  },
  {
    title: "Instalación Radar Pakistán",
    title_en: "Radar Installation — Pakistan",
    location: "Pakistán",
    location_en: "Pakistan",
    description: "Instalación de sistema radar en Pakistán, ampliando la presencia internacional de Alventor al continente asiático.",
    description_en: "Radar system installation in Pakistan, extending Alventor's international presence into the Asian continent.",
    sector: "infraestructuras",
    status: "completado",
    type: "Instalaciones",
    badge: "Presencia en Asia",
    badge_en: "Presence in Asia",
    year: "",
    value: "€ 132.298,30",
    image: "",
    tags: ["Radar", "Asia", "Instalación"],
    id: 1788106000657,
    hidden: true
  },
  {
    title: "Ghana Tamale Radar Tower",
    title_en: "Ghana Tamale Radar Tower",
    location: "Tamale, Ghana",
    description: "Diseño, suministro y construcción de torre radar en Tamale, Ghana, reforzando la presencia de Alventor en África subsahariana.",
    description_en: "Design, supply and construction of a radar tower in Tamale, Ghana, strengthening Alventor's presence in sub-Saharan Africa.",
    sector: "infraestructuras",
    status: "completado",
    type: "EPC",
    badge: "Torre Radar",
    badge_en: "Radar Tower",
    year: "",
    value: "€ 59.619,23",
    image: "",
    tags: ["Torre Radar", "Ghana", "África"],
    id: 1788106000658,
    hidden: true
  },
  {
    title: "Dirección de Obra Salalah",
    title_en: "Site Management — Salalah",
    location: "Salalah, Omán",
    location_en: "Salalah, Oman",
    description: "Dirección integral de obra del proyecto radar de Salalah, Omán, coordinando ingeniería, topografía y ejecución en campo durante todas las fases del proyecto.",
    description_en: "Full site management of the Salalah radar project in Oman, coordinating engineering, surveying and field execution throughout all project phases.",
    sector: "infraestructuras",
    status: "completado",
    type: "Construcción",
    badge: "Dirección de Obra",
    badge_en: "Site Management",
    year: "",
    value: "€ 224.824,75",
    image: "",
    tags: ["Dirección de Obra", "Omán", "Oriente Medio"],
    id: 1788106000660,
    hidden: true
  },
  {
    title: "Suministro Torre MSSR 15m Chipre",
    title_en: "Supply of 15m MSSR Tower — Cyprus",
    location: "Chipre",
    location_en: "Cyprus",
    description: "Fabricación y suministro de torre MSSR de 15 metros para instalación radar en Chipre, reforzando la presencia de Alventor en el Mediterráneo oriental.",
    description_en: "Manufacturing and supply of a 15-metre MSSR tower for radar installation in Cyprus, strengthening Alventor's presence in the eastern Mediterranean.",
    sector: "infraestructuras",
    status: "completado",
    type: "EPC",
    badge: "Suministro",
    badge_en: "Supply",
    year: "",
    value: "€ 132.157,23",
    image: "",
    tags: ["Torre Radar", "Chipre", "Mediterráneo"],
    id: 1788106000662,
    hidden: true
  }
];

const DEFAULT_NEWS = [
  {
    title: "Alventor pondrá en operación la mayor almazara de Andalucía",
    title_en: "Alventor to bring Andalusia's largest olive oil mill into operation",
    excerpt: "Alventor participa en la puesta en operación de la mayor almazara de Andalucía, un proyecto industrial de gran escala y alta exigencia técnica que refuerza nuestra experiencia en el sector agroalimentario.",
    excerpt_en: "Alventor is taking part in bringing Andalusia's largest olive oil mill into operation, a large-scale industrial project with high technical demands that reinforces our experience in the agri-food sector.",
    date: "2026-06-15",
    category: "ejecucion",
    body: "Alventor participa en la fase final de puesta en operación de la mayor almazara de Andalucía, un proyecto industrial de gran escala y elevada exigencia técnica.\n\nLa actuación comprende la coordinación de los trabajos necesarios para la puesta en marcha de las instalaciones, integración de sistemas, verificación técnica y soporte a la entrada en operación del complejo.\n\nEste proyecto refuerza la experiencia de Alventor en instalaciones industriales, infraestructuras técnicas y proyectos de alta complejidad dentro del sector agroalimentario.",
    image: "img/WhatsApp Image 2026-09-04 at 12.57.08.jpeg",
    project: "",
    id: 1788518966387
  },
  {
    id: 1,
    title: "Alventor inicia la fase de puesta en marcha de la primera planta PTE 4000 de Costa Rica",
    title_en: "Alventor begins commissioning phase of Costa Rica's first PTE 4000 plant",
    excerpt: "El equipo técnico de Alventor se encuentra en Limonal coordinando los trabajos de comisionado y pruebas de aceptación de la planta PTE 4000, marcando un hito clave en la expansión internacional de la compañía.",
    excerpt_en: "Alventor's technical team is in Limonal coordinating commissioning works and acceptance testing for the PTE 4000 plant, marking a key milestone in the company's international expansion.",
    image: "img/CostaRicafrontal.jpg",
    category: "inicio-obra",
    date: "2025-05-12",
    location: "Limonal - Costa Rica",
    featured: true,
    hidden: true
  },
  {
    id: 2,
    title: "ALVENTOR impulsa una línea estratégica en proyectos internacionales de reconstrucción e infraestructuras críticas",
    title_en: "Alventor drives a strategic line in international reconstruction and critical infrastructure projects",
    excerpt: "Alventor consolida su posicionamiento en el mercado internacional con una cartera activa de proyectos de reconstrucción e infraestructuras críticas, desarrollando capacidad diferencial en entornos de alta exigencia técnica.",
    excerpt_en: "Alventor strengthens its international market position with an active portfolio of reconstruction and critical infrastructure projects, building differential capability in highly demanding technical environments.",
    image: "img/Radar Site Oman.jpg",
    category: "adjudicacion",
    date: "2025-04-18",
    location: "Proyectos Internacionales",
    location_en: "International Projects",
    featured: false
  },
  {
    id: 3,
    title: "Finalización de trabajos y arranque operativo de Almazara en Osuna",
    title_en: "Completion of works and operational start-up of the Osuna olive oil mill",
    excerpt: "Alventor ha completado la construcción e instalación de la almazara en Osuna, entregando el activo listo para su primera campaña de producción tras superar con éxito las pruebas de puesta en marcha.",
    excerpt_en: "Alventor has completed the construction and installation of the olive oil mill in Osuna, delivering the asset ready for its first production campaign after successfully passing commissioning tests.",
    image: "img/Archena1.jpg",
    category: "entrega",
    date: "2025-03-05",
    location: "Osuna - Sevilla",
    location_en: "Osuna - Seville",
    featured: false,
    hidden: true
  },
  {
    id: 4,
    title: "Alventor lanza su nueva web corporativa",
    title_en: "Alventor launches its new corporate website",
    excerpt: "Alventor estrena su nueva presencia digital con una web corporativa renovada que refleja la identidad y el posicionamiento de la compañía como referente EPC en el mercado internacional de construcción e infraestructuras.",
    excerpt_en: "Alventor unveils its renewed corporate digital presence, reflecting the company's identity and positioning as an EPC benchmark in the international construction and infrastructure market.",
    image: "img/Torre_construccion.jpg",
    category: "entrega",
    date: "2025-05-20",
    location: "Servicios Centrales",
    location_en: "Head Office",
    featured: false
  }
];

/* ---- Public API ---- */
const AlventorData = {

  /* PROJECTS */
  getProjects() {
    try {
      const raw = localStorage.getItem(KEYS.projects);
      return raw ? JSON.parse(raw) : [...DEFAULT_PROJECTS];
    } catch { return [...DEFAULT_PROJECTS]; }
  },
  saveProjects(list) {
    localStorage.setItem(KEYS.projects, JSON.stringify(list));
  },
  addProject(data) {
    const list = this.getProjects();
    const item = { ...data, id: Date.now() };
    list.push(item);
    this.saveProjects(list);
    return item;
  },
  updateProject(id, data) {
    const list = this.getProjects();
    const i = list.findIndex(p => String(p.id) === String(id));
    if (i !== -1) { list[i] = { ...list[i], ...data }; this.saveProjects(list); }
  },
  deleteProject(id) {
    this.saveProjects(this.getProjects().filter(p => String(p.id) !== String(id)));
  },
  toggleProjectVisibility(id) {
    const list = this.getProjects();
    const i = list.findIndex(p => String(p.id) === String(id));
    if (i !== -1) { list[i].hidden = !list[i].hidden; this.saveProjects(list); }
  },
  toggleProjectFeatured(id) {
    const list = this.getProjects();
    const i = list.findIndex(p => String(p.id) === String(id));
    if (i !== -1) { list[i].featured = !list[i].featured; this.saveProjects(list); }
  },
  getVisibleProjects() {
    return this.getProjects().filter(p => !p.hidden);
  },

  /* NEWS */
  getNews() {
    try {
      const raw = localStorage.getItem(KEYS.news);
      return raw ? JSON.parse(raw) : [...DEFAULT_NEWS];
    } catch { return [...DEFAULT_NEWS]; }
  },
  saveNews(list) {
    localStorage.setItem(KEYS.news, JSON.stringify(list));
  },
  addNewsItem(data) {
    const list = this.getNews();
    const item = { ...data, id: Date.now() };
    list.unshift(item);
    this.saveNews(list);
    return item;
  },
  updateNewsItem(id, data) {
    const list = this.getNews();
    const i = list.findIndex(n => String(n.id) === String(id));
    if (i !== -1) { list[i] = { ...list[i], ...data }; this.saveNews(list); }
  },
  deleteNewsItem(id) {
    this.saveNews(this.getNews().filter(n => String(n.id) !== String(id)));
  },
  toggleNewsVisibility(id) {
    const list = this.getNews();
    const i = list.findIndex(n => String(n.id) === String(id));
    if (i !== -1) { list[i].hidden = !list[i].hidden; this.saveNews(list); }
  },
  getVisibleNews() {
    return this.getNews().filter(n => !n.hidden);
  },
  resetToDefaults() {
    localStorage.removeItem(KEYS.projects);
    localStorage.removeItem(KEYS.news);
  }
};

/* ---- Render helpers (used by public pages) ---- */
const SECTOR_LABELS = {
  infraestructuras: 'Infraestructuras',
  edificacion: 'Edificación',
  instalaciones: 'Instalaciones Técnicas',
};

const SECTOR_LABELS_EN = {
  infraestructuras: 'Infrastructure',
  edificacion: 'Building',
  instalaciones: 'Technical Installations',
};

const CAT_LABELS = {
  adjudicacion: 'Adjudicación',
  'inicio-obra': 'Inicio de Obra',
  ejecucion: 'Ejecución',
  entrega: 'Entrega',
};

const CAT_LABELS_EN = {
  adjudicacion: 'Contract Award',
  'inicio-obra': 'Groundbreaking',
  ejecucion: 'Execution',
  entrega: 'Delivery',
};

const TYPE_LABELS_EN = {
  'EPC': 'EPC',
  'Construcción': 'Construction',
  'Instalaciones': 'Facilities',
};

function fmtDate(str, lang = 'es') {
  if (!str) return '';
  const d = new Date(str + 'T12:00:00');
  const locale = lang === 'en' ? 'en-GB' : 'es-ES';
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
}

function projectCardHTML(p, lang = 'es') {
  const isEn = lang === 'en';
  const title = isEn ? (p.title_en || p.title) : p.title;
  const description = isEn ? (p.description_en || p.description) : p.description;
  const badge = isEn ? (p.badge_en || p.badge) : p.badge;
  const location = isEn ? (p.location_en || p.location) : p.location;
  const type = isEn ? (TYPE_LABELS_EN[p.type] || p.type) : p.type;
  const sectorLabels = isEn ? SECTOR_LABELS_EN : SECTOR_LABELS;
  const fieldLabels = isEn ? { type: 'Type', location: 'Location' } : { type: 'Tipo', location: 'Ubicación' };

  return `
    <article data-sector="${p.sector}"
      class="bg-white border border-[#c4c6ce] flex flex-col group hover:border-[#C49A3C] hover:shadow-2xl transition-all duration-500 card-lift reveal">
      <div class="relative h-64 overflow-hidden bg-[#0b1f3a]">
        <img src="${p.image}" alt="${title}"
          class="w-full h-full object-cover grayscale-hover">
        <div class="absolute top-4 right-4 bg-[#C49A3C] text-[#000615] px-3 py-1 text-[10px] font-bold tracking-widest uppercase">${badge}</div>
      </div>
      <div class="p-8 flex flex-col flex-grow">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-[2px] bg-[#C49A3C] flex-shrink-0"></span>
          <span class="text-[#30628d] uppercase tracking-[0.2em] text-[10px] font-bold">${sectorLabels[p.sector] || p.sector}</span>
        </div>
        <h3 class="text-xl font-semibold mb-3 text-[#0b1f3a] group-hover:text-[#C49A3C] transition-colors leading-snug">${title}</h3>
        <p class="text-sm text-[#44474d] mb-6 flex-grow leading-relaxed">${description}</p>
        <div class="grid grid-cols-2 gap-4 border-t border-[#c4c6ce] pt-5">
          <div>
            <span class="block text-[9px] text-[#75777e] uppercase tracking-widest mb-1">${fieldLabels.type}</span>
            <span class="block text-sm font-semibold text-[#0b1f3a]">${type}</span>
          </div>
          <div>
            <span class="block text-[9px] text-[#75777e] uppercase tracking-widest mb-1">${fieldLabels.location}</span>
            <span class="block text-sm font-semibold text-[#0b1f3a]">${location}</span>
          </div>
        </div>
      </div>
    </article>`;
}

function newsCardHTML(n, featured = false, lang = 'es') {
  const isEn = lang === 'en';
  const title = isEn ? (n.title_en || n.title) : n.title;
  const excerpt = isEn ? (n.excerpt_en || n.excerpt) : n.excerpt;
  const location = isEn ? (n.location_en || n.location) : n.location;
  const catLabels = isEn ? CAT_LABELS_EN : CAT_LABELS;
  const cat = catLabels[n.category] || n.category;
  const date = fmtDate(n.date, lang);

  if (featured) {
    return `
      <article class="group cursor-pointer reveal-left">
        <div class="relative overflow-hidden h-[400px] mb-6">
          <img src="${n.image}" alt="${title}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          <div class="absolute top-6 left-6">
            <span class="bg-[#0b1f3a] text-white text-[10px] px-4 py-2 uppercase tracking-widest font-bold">${cat}</span>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-4 mb-3">
            <span class="text-xs text-[#75777e]">${date}</span>
            <span class="h-px w-10 bg-[#c4c6ce]"></span>
            <span class="text-xs text-[#75777e] uppercase">${location || ''}</span>
          </div>
          <h3 class="text-2xl font-semibold text-[#0b1f3a] mb-3 group-hover:text-[#C49A3C] transition-colors leading-snug">${title}</h3>
          <p class="text-sm text-[#44474d] max-w-xl leading-relaxed">${excerpt}</p>
        </div>
      </article>`;
  }
  return `
    <article class="border-b border-[#c4c6ce] pb-7 group cursor-pointer reveal">
      <span class="text-[10px] text-[#30628d] mb-2 block uppercase tracking-widest font-bold">${cat}</span>
      <h4 class="text-base font-semibold text-[#0b1f3a] mb-2 group-hover:text-[#30628d] transition-colors leading-snug">${title}</h4>
      <div class="flex items-center gap-2 text-[#75777e] mb-2">
        <span class="material-symbols-outlined text-[15px]">location_on</span>
        <span class="text-xs">${location || ''}</span>
      </div>
      <p class="text-xs text-[#44474d] leading-relaxed line-clamp-2">${excerpt}</p>
      <span class="text-[10px] text-[#75777e] mt-2 block">${date}</span>
    </article>`;
}
```

- [ ] **Step 2: Verificación automatizada (Node, sin dependencias)**

Crea un archivo temporal `tmp-verify-data.js` en la raíz de `WEB_ALVENTOR` con este contenido:

```javascript
const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('js/data.js', 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const { AlventorData, projectCardHTML, newsCardHTML, fmtDate } = sandbox;

const projects = AlventorData.getProjects();
if (projects.length !== 40) throw new Error(`expected 40 projects, got ${projects.length}`);

const projectsWithEn = projects.filter(p => p.title_en && p.description_en);
if (projectsWithEn.length !== 40) throw new Error(`expected all 40 projects to have title_en/description_en, got ${projectsWithEn.length}`);

const news = AlventorData.getNews();
if (news.length !== 5) throw new Error(`expected 5 news items, got ${news.length}`);

const newsWithEn = news.filter(n => n.title_en && n.excerpt_en);
if (newsWithEn.length !== 5) throw new Error(`expected all 5 news items to have title_en/excerpt_en, got ${newsWithEn.length}`);

const fallbackProject = { ...projects[0] };
delete fallbackProject.title_en;
delete fallbackProject.description_en;
const htmlEn = projectCardHTML(fallbackProject, 'en');
if (!htmlEn.includes(fallbackProject.title)) throw new Error('fallback to Spanish title failed when title_en is missing');

const d = fmtDate('2025-05-12', 'en');
if (typeof d !== 'string' || d.length === 0) throw new Error('fmtDate en failed');

console.log('OK — all data.js assertions passed');
```

Run: `node tmp-verify-data.js`
Expected: `OK — all data.js assertions passed` (sin errores).

- [ ] **Step 3: Borrar el script temporal**

```bash
rm tmp-verify-data.js
```

- [ ] **Step 4: Commit**

```bash
git add js/data.js
git commit -m "Fijar catálogo real de proyectos/noticias y añadir campos bilingües en data.js"
```

---

### Task 2: `js/components.js` — nav/footer bilingües + selector ES/EN

**Files:**
- Modify: `js/components.js` (reemplazo completo)

- [ ] **Step 1: Reemplazar el archivo completo**

```javascript
/* ============================================================
   ALVENTOR — Shared Nav + Footer Components
   ============================================================ */

const NAV_LINKS = [
  { href: 'quienes-somos.html', label: 'Quiénes Somos', label_en: 'About Us' },
  { href: 'servicios.html',     label: 'Servicios',      label_en: 'Services' },
  { href: 'proyectos.html',     label: 'Proyectos',      label_en: 'Projects' },
  { href: 'actualidad.html',    label: 'Actualidad',     label_en: 'News' },
  { href: 'carrera.html',       label: 'Carrera',        label_en: 'Careers' },
  { href: 'contacto.html',      label: 'Contacto',       label_en: 'Contact' },
];

const NAV_TEXT = {
  es: { cta: 'Solicitar Cotización', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú' },
  en: { cta: 'Request a Quote',      openMenu: 'Open menu',  closeMenu: 'Close menu' },
};

const FOOTER_TEXT = {
  es: {
    tagline: 'Especialistas en ejeuccion de proyectos integrales y EPC para los sectores de infraestructuras, edificacion, energía e industria.',
    contactBtn: 'Contacto',
    navHeading: 'NAVEGACIÓN',
    legalHeading: 'COMPLIANCE',
    legalLinks: ['Aviso Legal', 'Política de Privacidad', 'Política Ambiental', 'Cookies'],
    contactHeading: 'CONTACTO',
    rights: '© 2024 Alventor Engineering &amp; Construction. Todos los derechos reservados.',
    adminLink: 'Panel Admin',
  },
  en: {
    tagline: 'Specialists in integrated project execution and EPC contracts for the infrastructure, building, energy and industrial sectors.',
    contactBtn: 'Contact',
    navHeading: 'NAVIGATION',
    legalHeading: 'COMPLIANCE',
    legalLinks: ['Legal Notice', 'Privacy Policy', 'Environmental Policy', 'Cookies'],
    contactHeading: 'CONTACT',
    rights: '© 2024 Alventor Engineering &amp; Construction. All rights reserved.',
    adminLink: 'Admin Panel',
  },
};

function getBase() {
  return window.location.pathname.includes('/admin') ? '../' : '';
}

function getRootBase() {
  if (window.location.pathname.includes('/admin')) return '../';
  if (window.location.pathname.includes('/en/')) return '../';
  return '';
}

function isEnglish() {
  return window.location.pathname.includes('/en/');
}

function getCurrentFile() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || 'index.html';
}

function getLangSwitchHref() {
  const cur = getCurrentFile();
  return isEnglish() ? '../' + cur : 'en/' + cur;
}

function langSwitchHTML() {
  const en = isEnglish();
  const href = getLangSwitchHref();
  if (en) {
    return `
      <div class="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest">
        <a href="${href}" class="text-slate-400 hover:text-[#C49A3C] transition-colors">ES</a>
        <span class="text-slate-300">/</span>
        <span class="text-[#0b1f3a]">EN</span>
      </div>`;
  }
  return `
    <div class="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest">
      <span class="text-[#0b1f3a]">ES</span>
      <span class="text-slate-300">/</span>
      <a href="${href}" class="text-slate-400 hover:text-[#C49A3C] transition-colors">EN</a>
    </div>`;
}

function renderNav() {
  const base = getBase();
  const cur  = getCurrentFile();
  const en   = isEnglish();
  const t    = en ? NAV_TEXT.en : NAV_TEXT.es;

  const links = NAV_LINKS.map(l => `
    <a href="${base}${l.href}"
       class="nav-link text-sm font-medium uppercase tracking-wider text-slate-500 hover:text-[#C49A3C] transition-colors duration-200 ${cur === l.href ? 'active' : ''}">
      ${en ? l.label_en : l.label}
    </a>`).join('');

  const mobileLinks = NAV_LINKS.map(l => `
    <a href="${base}${l.href}"
       class="block text-lg font-bold uppercase tracking-wider py-2 border-b border-slate-100 ${cur === l.href ? 'text-[#C49A3C]' : 'text-[#0b1f3a]'} hover:text-[#C49A3C] transition-colors">
      ${en ? l.label_en : l.label}
    </a>`).join('');

  const html = `
    <nav id="main-nav" class="fixed top-0 left-0 w-full z-50 border-b border-slate-200"
         style="background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <!-- Logo -->
        <a href="${base}index.html"
           class="font-black tracking-tighter text-2xl text-[#0b1f3a] uppercase flex-shrink-0 hover:text-[#C49A3C] transition-colors">
          ALVENTOR
        </a>
        <!-- Desktop links -->
        <div class="hidden lg:flex items-center gap-8">${links}</div>
        <!-- Right actions -->
        <div class="flex items-center gap-4">
          ${langSwitchHTML()}
          <a href="${base}contacto.html"
             class="hidden md:inline-flex items-center bg-[#0b1f3a] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#C49A3C] transition-colors duration-200">
            ${t.cta}
          </a>
          <button id="hamburger" class="hamburger lg:hidden flex flex-col gap-1.5 p-2" aria-label="${t.openMenu}">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu">
      <button id="mobile-close" class="absolute top-6 right-6 text-2xl font-bold text-slate-800 hover:text-[#C49A3C] transition-colors" aria-label="${t.closeMenu}">✕</button>
      <div class="flex flex-col gap-1">${mobileLinks}</div>
      <div class="mt-4">${langSwitchHTML()}</div>
      <a href="${base}contacto.html"
         class="mt-6 inline-block bg-[#0b1f3a] text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-center hover:bg-[#C49A3C] transition-colors">
        ${t.cta}
      </a>
      <div class="mt-auto pt-8 border-t border-slate-100">
        <p class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Alventor Engineering & Construction</p>
        <p class="text-xs text-slate-400 mt-1">info@alventor.es · +34 621 121 462</p>
      </div>
    </div>

    <!-- Overlay -->
    <div id="menu-overlay" class="menu-overlay"></div>

    <!-- Page transition curtain -->
    <div id="page-curtain"></div>

    <!-- Scroll progress -->
    <div id="scroll-progress"></div>
  `;

  const root = document.getElementById('nav-root');
  if (root) root.innerHTML = html;
}

function renderFooter() {
  const base = getBase();
  const rootBase = getRootBase();
  const en = isEnglish();
  const t  = en ? FOOTER_TEXT.en : FOOTER_TEXT.es;

  const footerLinks = NAV_LINKS.map(l =>
    `<a class="text-[11px] text-slate-400 hover:text-white transition-colors uppercase tracking-wide" href="${base}${l.href}">${en ? l.label_en : l.label}</a>`
  ).join('');

  const legalLinksHTML = t.legalLinks.map(label =>
    `<a class="text-[11px] text-slate-400 hover:text-white transition-colors" href="#">${label}</a>`
  ).join('\n        ');

  const html = `
    <footer class="bg-[#0b1f3a] text-white border-t-4 border-[#C49A3C]">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <!-- Brand -->
        <div class="space-y-5">
          <a href="${base}index.html" class="text-2xl font-black tracking-tighter text-white uppercase hover:text-[#C49A3C] transition-colors">ALVENTOR</a>
          <p class="text-[11px] leading-relaxed text-slate-400">
            International Engineering &amp; Construction.<br>
            ${t.tagline}
          </p>
          <a href="${base}contacto.html"
             class="inline-block bg-[#C49A3C] text-[#0b1f3a] px-5 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
            ${t.contactBtn}
          </a>
        </div>

        <!-- Nav -->
        <div class="flex flex-col gap-3">
          <span class="font-bold text-[11px] uppercase tracking-widest mb-1 text-[#C49A3C]">${t.navHeading}</span>
          ${footerLinks}
        </div>

        <!-- Legal -->
        <div class="flex flex-col gap-3">
          <span class="font-bold text-[11px] uppercase tracking-widest mb-1 text-[#C49A3C]">${t.legalHeading}</span>
          ${legalLinksHTML}
        </div>

        <!-- Contact -->
        <div class="flex flex-col gap-3">
          <span class="font-bold text-[11px] uppercase tracking-widest mb-1 text-[#C49A3C]">${t.contactHeading}</span>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            C/ Rio Guadalete 5<br>
            Pol. El Saladar<br>
            30564 – Murcia
          </p>
          <p class="text-[11px] text-slate-400">+34 621 121 462</p>
          <p class="text-[11px] text-slate-400">info@alventor.es</p>
          <div class="flex gap-2 mt-2 flex-wrap">
            <span class="text-[9px] font-bold text-slate-500 border border-slate-700 px-2 py-1">ISO 9001</span>
            <span class="text-[9px] font-bold text-slate-500 border border-slate-700 px-2 py-1">ISO 14001</span>
            <span class="text-[9px] font-bold text-slate-500 border border-slate-700 px-2 py-1">ISO 45001</span>
          </div>
        </div>
      </div>

      <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-5 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3">
        <p class="text-[10px] text-slate-500 uppercase tracking-widest">
          ${t.rights}
        </p>
        <a href="${rootBase}admin/" class="text-[10px] text-slate-700 hover:text-slate-400 transition-colors uppercase tracking-widest">
          ${t.adminLink}
        </a>
      </div>
    </footer>
  `;

  const root = document.getElementById('footer-root');
  if (root) root.innerHTML = html;
}
```

- [ ] **Step 2: Verificación manual en navegador**

No hay `window`/`document` en Node, así que esta pieza se verifica sirviendo el sitio localmente y mirando el resultado:

```bash
python3 -m http.server 8080
```

Abre `http://localhost:8080/index.html` y `http://localhost:8080/en/index.html` (esta última no existirá hasta la Task 8, así que de momento solo comprueba `index.html`) y verifica:
- El nav muestra `ES / EN` a la derecha, con `ES` resaltado en negro y `EN` como enlace en gris.
- El footer muestra "NAVEGACIÓN" y los 6 enlaces en español.
- El menú móvil (reducir ventana o inspector en modo móvil) también muestra el selector `ES / EN`.

(La comprobación completa del lado inglés del selector se hace en la Task 9, cuando ya exista `en/index.html`.)

- [ ] **Step 3: Commit**

```bash
git add js/components.js
git commit -m "Hacer bilingüe el nav/footer compartido y añadir selector de idioma ES/EN"
```

---

### Task 3: Añadir `hreflang` a las 7 páginas en español

**Files:**
- Modify: `index.html:5-6`, `servicios.html:5-6`, `proyectos.html:5-6`, `quienes-somos.html:5-6`, `contacto.html:5-6`, `carrera.html:5-6`, `actualidad.html:5-6`

Mismo cambio mecánico en las 7 páginas: insertar 3 líneas justo después de la línea `<title>...</title>` de cada archivo (antes de la línea `<script src="https://cdn.tailwindcss.com...`).

- [ ] **Step 1: `index.html`** — después de `<title>Alventor — EPC & Construcción Internacional</title>`:

```html
  <link rel="alternate" hreflang="es" href="https://alventor.es/index.html">
  <link rel="alternate" hreflang="en" href="https://alventor.es/en/index.html">
  <link rel="alternate" hreflang="x-default" href="https://alventor.es/index.html">
```

- [ ] **Step 2: `servicios.html`** — después de `<title>Servicios | Alventor — EPC & Construcción</title>`:

```html
  <link rel="alternate" hreflang="es" href="https://alventor.es/servicios.html">
  <link rel="alternate" hreflang="en" href="https://alventor.es/en/servicios.html">
  <link rel="alternate" hreflang="x-default" href="https://alventor.es/servicios.html">
```

- [ ] **Step 3: `proyectos.html`** — después de `<title>Proyectos | Alventor — EPC & Construcción</title>`:

```html
  <link rel="alternate" hreflang="es" href="https://alventor.es/proyectos.html">
  <link rel="alternate" hreflang="en" href="https://alventor.es/en/proyectos.html">
  <link rel="alternate" hreflang="x-default" href="https://alventor.es/proyectos.html">
```

- [ ] **Step 4: `quienes-somos.html`** — después de `<title>Quiénes Somos | Alventor — EPC & Construcción</title>`:

```html
  <link rel="alternate" hreflang="es" href="https://alventor.es/quienes-somos.html">
  <link rel="alternate" hreflang="en" href="https://alventor.es/en/quienes-somos.html">
  <link rel="alternate" hreflang="x-default" href="https://alventor.es/quienes-somos.html">
```

- [ ] **Step 5: `contacto.html`** — después de `<title>Contacto | Alventor — EPC & Construcción</title>`:

```html
  <link rel="alternate" hreflang="es" href="https://alventor.es/contacto.html">
  <link rel="alternate" hreflang="en" href="https://alventor.es/en/contacto.html">
  <link rel="alternate" hreflang="x-default" href="https://alventor.es/contacto.html">
```

- [ ] **Step 6: `carrera.html`** — después de `<title>Carrera | Alventor — EPC & Construcción</title>`:

```html
  <link rel="alternate" hreflang="es" href="https://alventor.es/carrera.html">
  <link rel="alternate" hreflang="en" href="https://alventor.es/en/carrera.html">
  <link rel="alternate" hreflang="x-default" href="https://alventor.es/carrera.html">
```

- [ ] **Step 7: `actualidad.html`** — después de `<title>Actualidad | Alventor — EPC & Construcción</title>`:

```html
  <link rel="alternate" hreflang="es" href="https://alventor.es/actualidad.html">
  <link rel="alternate" hreflang="en" href="https://alventor.es/en/actualidad.html">
  <link rel="alternate" hreflang="x-default" href="https://alventor.es/actualidad.html">
```

- [ ] **Step 8: Verificar**

```bash
grep -c 'hreflang' index.html servicios.html proyectos.html quienes-somos.html contacto.html carrera.html actualidad.html
```
Expected: `3` en cada archivo.

- [ ] **Step 9: Commit**

```bash
git add index.html servicios.html proyectos.html quienes-somos.html contacto.html carrera.html actualidad.html
git commit -m "Añadir etiquetas hreflang ES/EN a las páginas públicas"
```

---

### Task 4: `en/quienes-somos.html` — ejemplo trabajado completo

Esta tarea fija el **patrón exacto** que siguen las Tareas 5-10: rutas `../css`, `../js`, `../img`; enlaces internos como nombre de archivo suelto (sin `../`, para quedarse dentro de `/en/`); `<html lang="en">`; `<title>` traducido; bloque `hreflang` (mismas 3 líneas que en la Task 3, sin cambios); todo el texto visible traducido.

De paso, esta versión en inglés corrige un bug ya existente en el original: la imagen del hero apuntaba a `img/ACC_Costa_Rica.JPG` (con guiones bajos) pero el archivo real se llama `img/ACCCostaRica.JPG` — la nueva versión usa la ruta correcta desde el principio. (El original en español sigue roto; es un arreglo aparte, fuera de este plan — ver nota al final del documento.)

**Files:**
- Create: `en/quienes-somos.html`

- [ ] **Step 1: Crear el directorio y el archivo**

```bash
mkdir -p en
```

Crea `en/quienes-somos.html` con este contenido completo:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us | Alventor — EPC & Construction</title>
  <link rel="alternate" hreflang="es" href="https://alventor.es/quienes-somos.html">
  <link rel="alternate" hreflang="en" href="https://alventor.es/en/quienes-somos.html">
  <link rel="alternate" hreflang="x-default" href="https://alventor.es/quienes-somos.html">
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <script src="../js/tailwind-config.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/custom.css">
  <style>.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24}</style>
</head>
<body class="bg-[#fcf8fb] text-[#1b1b1d] antialiased">

  <div id="nav-root"></div>

  <main class="pt-20">

    <!-- HERO -->
    <section class="relative h-[560px] flex items-center overflow-hidden bg-[#0b1f3a]">
      <div class="absolute inset-0 opacity-30">
        <img class="w-full h-full object-cover"
          src="../img/ACCCostaRica.JPG"
          alt="ACC Costa Rica">
      </div>
      <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <div class="max-w-3xl">
          <span class="hero-line block text-[11px] font-bold uppercase tracking-[0.4em] text-[#C49A3C] mb-5">About Us</span>
          <h1 class="hero-line text-5xl md:text-6xl font-black text-white tracking-tight mb-6">Global Vision, Real Execution Capability</h1>
          <p class="hero-line text-lg text-[#7587a7] max-w-xl leading-relaxed">
            Alventor takes full responsibility from engineering through to final delivery. We are specialists in EPC-model projects. We don't just design projects — we execute them with technical rigour and operational excellence.
          </p>
        </div>
      </div>
    </section>

    <!-- METRICS -->
    <section class="bg-[#fcf8fb] py-20 border-b border-[#c4c6ce]">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center stagger">
          <div class="reveal p-8 border border-[#c4c6ce] bg-[#f6f3f5]">
            <div class="text-6xl font-black text-[#000615]" data-counter="15" data-prefix="+">0</div>
            <div class="text-[11px] font-bold uppercase tracking-widest text-[#30628d] mt-3">Years of Expertise</div>
          </div>
          <div class="reveal p-8 border border-[#C49A3C] bg-white shadow-lg">
            <div class="text-6xl font-black text-[#000615]" data-counter="100" data-prefix="+">0</div>
            <div class="text-[11px] font-bold uppercase tracking-widest text-[#C49A3C] mt-3">Projects Delivered</div>
            <p class="mt-3 text-sm text-[#44474d]">Proven experience in highly complex assets.</p>
          </div>
          <div class="reveal p-8 border border-[#c4c6ce] bg-[#f6f3f5]">
            <div class="text-6xl font-black text-[#000615]" data-counter="10" data-prefix="+">0</div>
            <div class="text-[11px] font-bold uppercase tracking-widest text-[#30628d] mt-3">International Markets</div>
          </div>
        </div>
      </div>
    </section>

    <!-- EPC METHODOLOGY -->
    <section class="py-24">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div class="reveal-left">
          <span class="gold-bar mb-5"></span>
          <span class="text-[11px] font-bold uppercase tracking-widest text-[#C49A3C] mb-4 block">Our Strength</span>
          <h2 class="text-3xl font-bold text-[#000615] mb-6">EPC Methodology: Committed to Results</h2>
          <div class="space-y-5 text-[#44474d] leading-relaxed">
            <p>Our execution capability is built on the EPC model (Engineering, Procurement, and Construction). This approach lets us centralise management and guarantee the success of every project phase.</p>
            <p>Alventor takes on the technical and operational risk, freeing our clients to focus on their core business while we bring their vision to life.</p>
          </div>
          <ul class="space-y-6 pt-6 stagger">
            <li class="reveal flex items-start gap-4">
              <span class="material-symbols-outlined text-[#C49A3C] bg-[#ffdea0]/40 p-2 flex-shrink-0">calendar_today</span>
              <div>
                <strong class="text-[#000615] block mb-1">Schedule Guarantee</strong>
                <span class="text-sm">Strict control of critical timelines to ensure on-time delivery.</span>
              </div>
            </li>
            <li class="reveal flex items-start gap-4">
              <span class="material-symbols-outlined text-[#C49A3C] bg-[#ffdea0]/40 p-2 flex-shrink-0">payments</span>
              <div>
                <strong class="text-[#000615] block mb-1">Cost Efficiency</strong>
                <span class="text-sm">Financial optimisation through global, strategic supply chain management.</span>
              </div>
            </li>
            <li class="reveal flex items-start gap-4">
              <span class="material-symbols-outlined text-[#C49A3C] bg-[#ffdea0]/40 p-2 flex-shrink-0">verified</span>
              <div>
                <strong class="text-[#000615] block mb-1">Certified Quality</strong>
                <span class="text-sm">Absolute technical rigour from basic engineering through to final commissioning.</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="reveal-right relative group">
          <div class="absolute -inset-4 bg-[#C49A3C]/5 transition-all group-hover:scale-105"></div>
          <img class="relative shadow-2xl w-full aspect-video object-cover"
            src="../img/antenas-ensamblaje.JPG"
            alt="Antenna assembly">
          <div class="absolute -bottom-6 -right-6 bg-[#0b1f3a] text-white p-8 hidden lg:block">
            <p class="text-4xl font-black text-[#C49A3C]">99.2%</p>
            <p class="text-[10px] font-bold uppercase tracking-widest text-[#7587a7] mt-1">On-Time Delivery Rate</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXECUTION PILLARS -->
    <section class="bg-[#000615] py-24">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12">
        <div class="mb-14 text-center max-w-2xl mx-auto reveal">
          <span class="text-[11px] font-bold uppercase tracking-widest text-[#C49A3C] mb-3 block">Field Experience</span>
          <h2 class="text-3xl font-bold text-white">Experts in Infrastructure Execution</h2>
          <p class="text-[#7587a7] mt-3 text-sm">A track record built on delivering landmark projects in critical sectors.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
          <div class="reveal bg-[#0b1f3a] p-10 border border-[#30628d]/20 hover:border-[#C49A3C]/40 transition-colors duration-300">
            <div class="w-12 h-12 flex items-center justify-center bg-[#C49A3C] mb-8">
              <span class="material-symbols-outlined text-[#000615]">engineering</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Engineering That Works</h3>
            <p class="text-sm text-[#7587a7] leading-relaxed">We don't just deliver drawings — we deliver constructive solutions proven by years of field experience.</p>
          </div>
          <div class="reveal bg-[#0b1f3a] p-10 border border-[#30628d]/20 hover:border-[#C49A3C]/40 transition-colors duration-300">
            <div class="w-12 h-12 flex items-center justify-center bg-[#C49A3C] mb-8">
              <span class="material-symbols-outlined text-[#000615]">local_shipping</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Critical Supply</h3>
            <p class="text-sm text-[#7587a7] leading-relaxed">Integrated logistics to ensure every component is in the right place at the right time.</p>
          </div>
          <div class="reveal bg-[#0b1f3a] p-10 border border-[#30628d]/20 hover:border-[#C49A3C]/40 transition-colors duration-300">
            <div class="w-12 h-12 flex items-center justify-center bg-[#C49A3C] mb-8">
              <span class="material-symbols-outlined text-[#000615]">construction</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">High-Standard Construction</h3>
            <p class="text-sm text-[#7587a7] leading-relaxed">In-house teams and certified processes for flawless execution under the most demanding HSE standards.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EPC PROCESS -->
    <section class="py-24">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        <div class="relative reveal-left">
          <img class="w-full h-[520px] object-cover shadow-2xl"
            src="../img/ingenieria1.jpg"
            alt="Radome engineering">
        </div>
        <div class="reveal-right">
          <span class="gold-bar mb-5"></span>
          <h2 class="text-3xl font-bold text-[#000615] mb-8">Operational rigour at every stage.</h2>
          <div class="space-y-8 stagger">
            <div class="reveal flex gap-6 items-start">
              <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#e4e2e4] font-black text-[#0b1f3a]">01</div>
              <div>
                <h4 class="text-lg font-semibold text-[#000615] mb-2">Award &amp; Planning</h4>
                <p class="text-sm text-[#44474d] leading-relaxed">Thorough technical analysis for feasibility and risk mitigation from day one.</p>
              </div>
            </div>
            <div class="reveal flex gap-6 items-start">
              <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#e4e2e4] font-black text-[#0b1f3a]">02</div>
              <div>
                <h4 class="text-lg font-semibold text-[#000615] mb-2">Controlled Execution</h4>
                <p class="text-sm text-[#44474d] leading-relaxed">Use of BIM methodologies for real-time tracking of construction milestones.</p>
              </div>
            </div>
            <div class="reveal flex gap-6 items-start">
              <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#C49A3C] font-black text-[#000615]">03</div>
              <div>
                <h4 class="text-lg font-semibold text-[#000615] mb-2">Delivery &amp; Commissioning</h4>
                <p class="text-sm text-[#44474d] leading-relaxed">International handover protocols to ensure the client is operational immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#fcf8fb] border-t border-[#c4c6ce] py-20 reveal">
      <div class="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 class="text-3xl font-bold text-[#000615] mb-5">Trust your project to those who know how to build it.</h2>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <a href="contacto.html"
             class="inline-flex items-center gap-2 bg-[#0b1f3a] text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-[#C49A3C] hover:text-[#000615] transition-colors duration-200">
            Contact Our Directors
          </a>
          <a href="proyectos.html"
             class="inline-flex items-center gap-2 border border-[#30628d] text-[#30628d] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#30628d] hover:text-white transition-colors duration-200">
            View Success Stories
          </a>
        </div>
      </div>
    </section>

  </main>

  <div id="footer-root"></div>

  <script src="../js/data.js"></script>
  <script src="../js/components.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificación automatizada (residuos de español)**

```bash
grep -oE '[áéíóúñÁÉÍÓÚÑ¿¡]' en/quienes-somos.html | sort -u
```
Expected: sin salida (ningún carácter español suelto). Nota: si alguna vez aparece un nombre propio con acento (poco probable en esta página), es una excepción válida — el check es para detectar texto sin traducir, no nombres propios.

```bash
grep -c 'contacto.html\|proyectos.html' en/quienes-somos.html
```
Expected: `2` (los dos enlaces internos, sin `../` delante — deben quedarse dentro de `/en/`).

- [ ] **Step 3: Verificación visual**

Con el servidor local ya corriendo (`python3 -m http.server 8080` desde la Task 2), abre `http://localhost:8080/en/quienes-somos.html` y compara con `http://localhost:8080/quienes-somos.html`: misma maquetación, mismas imágenes, mismos colores — solo el texto cambia. El nav debe mostrar el selector con `EN` resaltado y `ES` como enlace que lleva de vuelta a `quienes-somos.html`.

- [ ] **Step 4: Commit**

```bash
git add en/quienes-somos.html
git commit -m "Añadir versión en inglés de quienes-somos.html"
```

---

### Task 5: `en/servicios.html`

**Files:**
- Create: `en/servicios.html`

- [ ] **Step 1: Crear el archivo**

Copia `servicios.html` a `en/servicios.html` y aplica estos cambios:

**Cabecera:**
- `<html lang="es">` → `<html lang="en">`
- `<title>Servicios | Alventor — EPC & Construcción</title>` → `<title>Services | Alventor — EPC & Construction</title>`
- Añade el bloque `hreflang` de la Task 3, Step 2 (mismo contenido, sin cambios).
- `<script src="js/tailwind-config.js">` → `<script src="../js/tailwind-config.js">`
- `<link rel="stylesheet" href="css/custom.css">` → `<link rel="stylesheet" href="../css/custom.css">`
- Al final: `<script src="js/data.js">`, `js/components.js`, `js/main.js` → prefijo `../js/` en los tres.
- Toda imagen `src="img/..."` → `src="../img/..."`.

**Textos visibles (español → inglés), en orden de aparición:**

| Español | Inglés |
|---|---|
| `alt="Sitio de construcción EPC"` | `alt="EPC construction site"` |
| Control Técnico · Entrega Garantizada | Technical Control · Guaranteed Delivery |
| Servicios y Capacidades Operativas | Services and Operational Capabilities |
| Especialistas en la ejecución integral de proyectos y gestion de modelo EPC. Desarrollamos construcción real. Responsabilidad total del ciclo completo del proyecto. | Specialists in the integrated execution of projects and EPC-model management. We deliver real construction. Full responsibility for the entire project lifecycle. |
| Modelo Turnkey | Turnkey Model |
| EPC: Gestión Integral de Proyectos | EPC: Integrated Project Management |
| Lideramos el proyecto desde la ingeniería de detalle hasta la entrega llave en mano. Controlamos estrictamente los costes y plazos, asumiendo la responsabilidad técnica y operativa para garantizar activos listos para la producción. | We lead the project from detailed engineering through to turnkey delivery. We strictly control costs and schedules, taking on full technical and operational responsibility to deliver production-ready assets. |
| Diseño e Ingeniería de detalle | Detailed Design and Engineering |
| Gestión de compras y suministros | Procurement and Supply Management |
| Ejecución y construcción directa | Direct Execution and Construction |
| Puesta en marcha y validación | Commissioning and Validation |
| Construcción y Edificación Especializada | Specialised Construction and Building |
| Capacidad real de ejecución en entornos de alta complejidad operativa. | Real execution capability in highly complex operational environments. |
| Construcción de Infraestructuras | Infrastructure Construction |
| Ejecución de obra civil, estructuras industriales y cimentaciones especiales. Construcción real orientada a la durabilidad y eficiencia de proyectos complejos. | Execution of civil works, industrial structures and special foundations. Real construction focused on durability and efficiency for complex projects. |
| `alt="entrada tunel Vilariño"` | `alt="Vilariño tunnel entrance"` |
| Edificación y Rehabilitación | Building and Refurbishment |
| Expertos en construccion y rehabilitacion de hoteles en operación. Control de ruido, plazos críticos y acabados de alto standing sin detener el negocio. | Experts in construction and refurbishment of hotels in full operation. Noise control, critical schedules and high-end finishes without stopping the business. |
| Ejecución en activos operativos | Execution on operating assets |
| Gestión integral de gremios | Full trade coordination |
| Cumplimiento estricto de plazos | Strict schedule compliance |
| Solicitar Dossier Técnico | Request Technical Dossier |
| Instalaciones (MEP) | Installations (MEP) |
| Sistemas eléctricos, mecánicos y de control industrial. Convertimos edificios en máquinas eficientes mediante instalaciones inteligentes, seguras y plenamente mantenibles. | Electrical, mechanical and industrial control systems. We turn buildings into efficient machines through smart, safe and fully maintainable installations. |
| Ingeniería Aplicada | Applied Engineering |
| Ingeniería orientada al éxito de la ejecución. Optimizamos proyectos para reducir costes y plazos, transformando diseños teóricos en soluciones constructivas reales. | Engineering focused on execution success. We optimise projects to reduce costs and schedules, turning theoretical designs into real constructive solutions. |
| Control operativo absoluto. Gestionamos el alcance, el coste y el cronograma con rigor para asegurar que cada proyecto se entregue según lo pactado. | Absolute operational control. We manage scope, cost and schedule with rigour to ensure every project is delivered as agreed. |
| CONTROL DE COSTES | COST CONTROL |
| Responsabilidad presupuestaria total. Eliminamos desviaciones mediante una gestión financiera proactiva. | Full budget accountability. We eliminate overruns through proactive financial management. |
| CONTROL DE PLAZOS | SCHEDULE CONTROL |
| Planificación avanzada de hitos constructivos para asegurar la entrega en la fecha comprometida. | Advanced planning of construction milestones to ensure delivery on the committed date. |
| CONTROL DE CALIDAD | QUALITY CONTROL |
| Supervisión técnica rigurosa de cada fase constructiva para cumplir con los estándares industriales más exigentes. | Rigorous technical supervision of every construction phase to meet the most demanding industrial standards. |
| GESTIÓN DE RIESGOS | RISK MANAGEMENT |
| Identificación y mitigación proactiva de cualquier variable que pueda afectar la ejecución o la seguridad. | Proactive identification and mitigation of any variable that could affect execution or safety. |
| El Compromiso Alventor | The Alventor Commitment |
| Responsabilidad Total - modelo EPC | Total Responsibility - EPC Model |
| Control Integral<br>Diseño \| Procura \| Construcción | Full Control<br>Design \| Procurement \| Construction |
| Único Interlocutor | Single Point of Contact |
| Simplificamos la comunicación. Alventor responde por el 100% del proyecto. | We simplify communication. Alventor is accountable for 100% of the project. |
| Construcción Real | Real Construction |
| No somos consultores, somos constructores. Lo proyectado se convierte en realidad. | We are not consultants, we are builders. What is designed becomes reality. |
| Garantía de Entrega | Delivery Guarantee |
| Aseguramos por contrato los plazos de entrega y el precio final del activo. | We contractually guarantee delivery schedules and the final price of the asset. |
| Solicitar Cotización EPC | Request an EPC Quote |

`HOSPITALITY`, `Project Management` y el `alt="Radar Site Oman"` ya están en inglés en el original — no cambian. Los enlaces `href="contacto.html"` quedan igual (nombre de archivo suelto, se resuelven dentro de `/en/`).

- [ ] **Step 2: Verificación**

```bash
grep -oE '[áéíóúñÁÉÍÓÚÑ¿¡]' en/servicios.html | sort -u
```
Expected: sin salida.

```bash
grep -c '"\.\./' en/servicios.html
```
Expected: un número > 0 (todas las rutas a css/js/img usan `../`).

- [ ] **Step 3: Commit**

```bash
git add en/servicios.html
git commit -m "Añadir versión en inglés de servicios.html"
```

---

### Task 6: `en/proyectos.html`

Esta página renderiza tarjetas dinámicamente vía JS (`projectCardHTML`) — además de traducir el HTML estático, hay que pasar `'en'` como idioma en las llamadas de render.

**Files:**
- Create: `en/proyectos.html`

- [ ] **Step 1: Crear el archivo**

Copia `proyectos.html` a `en/proyectos.html` y aplica los mismos cambios de cabecera y rutas que en la Task 5 (`lang="en"`, `<title>`, `hreflang`, prefijo `../` en css/js/img).

**Textos visibles:**

| Español | Inglés |
|---|---|
| `<title>Proyectos \| Alventor — EPC & Construcción</title>` | `<title>Projects \| Alventor — EPC & Construction</title>` |
| `alt="Portafolio EPC Alventor"` | `alt="Alventor EPC Portfolio"` |
| Control Técnico · Entrega Garantizada | Technical Control · Guaranteed Delivery |
| Portafolio de Ejecución Real | Real Execution Portfolio |
| Experiencia en ejecución bajo modelo EPC y construcción especializada. Compromiso absoluto con el control de costes y plazos críticos. | Experience executing under the EPC model and specialised construction. Absolute commitment to controlling costs and critical schedules. |
| Todos los Sectores | All Sectors |
| Infraestructuras | Infrastructure |
| Edificación | Building |
| Instalaciones Técnicas | Technical Installations |
| No hay proyectos en esta categoría. | No projects in this category. |
| Proyectos Entregados | Projects Delivered |
| Control de Operaciones | Operations Control |
| Estándares Globales de Calidad | Global Quality Standards |
| ¿Tiene un proyecto similar? | Have a similar project? |
| Cuéntenos su desafío y le asignaremos un ingeniero de referencia en 24h. | Tell us about your challenge and we'll assign you a lead engineer within 24h. |
| Iniciar Consultoría | Start a Consultation |

**Importante — los botones de filtro** (`data-filter="all"`, `data-filter="infraestructuras"`, `data-filter="industrial"`... espera, ya se eliminó "industrial"; quedan `all`, `infraestructuras`, `edificacion`, `instalaciones`): el **atributo** `data-filter` **no se traduce** (debe seguir coincidiendo exactamente con los valores de `sector` en `js/data.js`, que son identificadores internos en español: `infraestructuras`, `edificacion`, `instalaciones`). Solo se traduce el **texto visible** del botón, según la tabla de arriba.

**Cambios en el `<script>` inline al final del archivo:**

```javascript
function renderGrid(sector) {
  const all = AlventorData.getVisibleProjects();
  const filtered = sector === 'all' ? all : all.filter(p => p.sector === sector);
  const grid = document.getElementById('projects-grid');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('project-count');

  if (!filtered.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = filtered.map(p => projectCardHTML(p, 'en')).join('');
  }
  count.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''}`;
  refreshReveal();
}
```

(Único cambio respecto al original: `projectCardHTML(p)` → `projectCardHTML(p, 'en')`, y el texto `proyecto${...}` → `project${...}`.)

También traduce el texto del empty-state visible en el HTML (`No hay proyectos en esta categoría.` → `No projects in this category.`, ya incluido en la tabla de arriba).

- [ ] **Step 2: Verificación**

```bash
grep -oE '[áéíóúñÁÉÍÓÚÑ¿¡]' en/proyectos.html | sort -u
```
Expected: sin salida.

```bash
grep -c "projectCardHTML(p, 'en')" en/proyectos.html
```
Expected: `1`.

Verificación visual: abre `http://localhost:8080/en/proyectos.html`, comprueba que las tarjetas muestran badge/tipo/ubicación en inglés (vienen de `js/data.js`, ya bilingüe desde la Task 1) y que los botones de filtro funcionan igual que en la versión en español.

- [ ] **Step 3: Commit**

```bash
git add en/proyectos.html
git commit -m "Añadir versión en inglés de proyectos.html"
```

---

### Task 7: `en/contacto.html`

**Files:**
- Create: `en/contacto.html`

- [ ] **Step 1: Crear el archivo**

Copia `contacto.html` a `en/contacto.html` y aplica los mismos cambios de cabecera y rutas que en la Task 5.

**Textos visibles:**

| Español | Inglés |
|---|---|
| `<title>Contacto \| Alventor — EPC & Construcción</title>` | `<title>Contact \| Alventor — EPC & Construction</title>` |
| `alt="Oficina técnica Alventor"` | `alt="Alventor technical office"` |
| Gestión de Proyectos EPC | EPC Project Management |
| ¿Tiene un proyecto complejo?<br>Lo ejecutamos contigo. | Have a complex project?<br>We'll execute it with you. |
| Sede Principal | Head Office |
| Dirección | Address |
| Teléfono | Phone |
| Horario de Oficina | Office Hours |
| Lunes – Viernes: 08:00 – 15:30 | Monday – Friday: 08:00 – 15:30 |
| Protocolo de Respuesta | Response Protocol |
| Asignación de tecnico de enlace en un plazo máximo de 24 horas laborables. | A dedicated liaison engineer is assigned within a maximum of 24 business hours. |
| `alt="Murcia, España"` | `alt="Murcia, Spain"` |
| Murcia, España (texto superpuesto sobre el mapa) | Murcia, Spain |
| Gestión de Proyectos & EPC | Project Management & EPC |
| Nuestro protocolo de consultoría técnica está diseñado para desarrollos de integrales y contratos EPC. | Our technical consulting protocol is designed for integrated developments and EPC contracts. |
| Nombre del Solicitante | Applicant Name |
| `placeholder="Responsable del proyecto"` | `placeholder="Project lead"` |
| Entidad / Corporación | Entity / Corporation |
| `placeholder="Nombre legal de la empresa"` | `placeholder="Company's legal name"` |
| Alcance del Proyecto | Project Scope |
| Desarrollo Industrial Integral (option) | Integrated Industrial Development |
| Infraestructura Civil Crítica (option) | Critical Civil Infrastructure |
| Energías Renovables (Utility Scale) (option) | Renewable Energy (Utility Scale) |
| Logística Internacional & Supply Chain (option) | International Logistics & Supply Chain |
| Hospitalidad & Turismo (option) | Hospitality & Tourism |
| Consultoría Técnica Avanzada (option) | Advanced Technical Consulting |
| Email Corporativo | Corporate Email |
| `placeholder="dominio@empresa.com"` | `placeholder="domain@company.com"` |
| Especificaciones Técnicas & Requerimientos | Technical Specifications & Requirements |
| `placeholder="Describa la complejidad, ubicación y objetivos clave del proyecto..."` | `placeholder="Describe the project's complexity, location and key objectives..."` |
| Iniciar Protocolo | Start Protocol |
| ✓ Solicitud recibida. Le asignaremos un ingeniero de enlace en las próximas 24 horas laborables. | ✓ Request received. We will assign you a liaison engineer within the next 24 business hours. |
| Capacidad Ejecutiva Internacional | International Execution Capability |
| Ingeniería EPC | EPC Engineering |
| Desde el diseño conceptual hasta la puesta en marcha, asumimos la responsabilidad total del proyecto. | From conceptual design through to commissioning, we take full responsibility for the project. |
| Movilidad Global | Global Mobility |
| Despliegue de equipos técnicos y logística avanzada en cualquier zona geográfica de interés estratégico. | Deployment of technical teams and advanced logistics in any geographic area of strategic interest. |
| Centro de control y respuesta para infraestructuras operativas, garantizando continuidad de negocio. | Control and response centre for operating infrastructure, ensuring business continuity. |

**No se traducen** (quedan igual en inglés): la dirección física completa (`C/ Rio Guadalete 5`, `Pol. El Saladar`, `30564 – Murcia` — una dirección postal no se traduce), el teléfono, `info@alventor.es`, `GMT+1 (Madrid Time)`, `Global Operations`, `24/7 Support`, `Email` (ya es igual en ambos idiomas).

- [ ] **Step 2: Verificación**

```bash
grep -oE '[áéíóúñÁÉÍÓÚÑ¿¡]' en/contacto.html | sort -u
```
Expected: sin salida (la dirección física no lleva tildes ni ñ, así que no debería aparecer nada).

- [ ] **Step 3: Commit**

```bash
git add en/contacto.html
git commit -m "Añadir versión en inglés de contacto.html"
```

---

### Task 8: `en/carrera.html`

**Files:**
- Create: `en/carrera.html`

- [ ] **Step 1: Crear el archivo**

Copia `carrera.html` a `en/carrera.html` y aplica los mismos cambios de cabecera y rutas que en la Task 5. El script inline al final (envío del formulario `carrera-form`) no tiene texto visible que traducir — no requiere cambios de lógica.

**Textos visibles:**

| Español | Inglés |
|---|---|
| `<title>Carrera \| Alventor — EPC & Construcción</title>` | `<title>Careers \| Alventor — EPC & Construction</title>` |
| `alt="Equipo técnico Alventor"` | `alt="Alventor technical team"` |
| Talento & Desarrollo Profesional | Talent & Professional Development |
| Construye tu carrera<br>en el sector de infraestructuras - EPC. | Build your career<br>in the infrastructure - EPC sector. |
| Únase a un equipo de ingenieros e especialistas que ejecutan proyectos de alta complejidad a escala internacional. | Join a team of engineers and specialists executing highly complex projects on an international scale. |
| Por qué Alventor | Why Alventor |
| Ofrecemos proyectos de alto impacto, movilidad internacional y un entorno que exige y recompensa la excelencia técnica. | We offer high-impact projects, international mobility and an environment that demands and rewards technical excellence. |
| Desafío de Ejecución | Execution Challenge |
| Trabajará en contratos EPC real: desde la ingeniería de detalle hasta la entrega llave en mano, con total responsabilidad técnica. | You will work on real EPC contracts: from detailed engineering through to turnkey delivery, with full technical responsibility. |
| Alcance Internacional | International Reach |
| Proyectos desarrollados en Europa, Medio Oriente y Latam. Despliegue de equipos en destinos estratégicos con soporte logístico completo. | Projects developed across Europe, the Middle East and Latin America. Team deployment to strategic destinations with full logistics support. |
| Impacto Real | Real Impact |
| Su trabajo tiene consecuencias directas: infraestructuras que funcionan, plazos que se cumplen, clientes que confían. Sin burocracia innecesaria. | Your work has direct consequences: infrastructure that works, schedules that are met, clients who trust us. No unnecessary bureaucracy. |
| Posiciones Activas | Open Positions |
| Oportunidades disponibles | Available Opportunities |
| Seleccionamos profesionales con experiencia demostrable en entornos de alta exigencia. | We select professionals with proven experience in highly demanding environments. |
| Dirección (tag posición 1) | Management |
| Nacional · Movilidad requerida | National · Travel required |
| Jefe de Obra Hotelera | Hotel Site Manager |
| Responsable de la ejecución completa de proyectos de Rehabilitacion Hotelera nacional. Coordinación de subcontratas, control de coste y plazo, interlocución directa con el cliente. | Responsible for the full execution of domestic hotel refurbishment projects. Subcontractor coordination, cost and schedule control, direct client liaison. |
| +5 años de experiencia | +5 years of experience |
| Ingeniería Civil / Industrial / Arquitectura | Civil / Industrial Engineering / Architecture |
| Español + Inglés nivel avanzado | Spanish + Advanced English |
| Solicitar Entrevista (×3) | Request an Interview |
| Técnico Senior (tag posición 2) | Senior Technical |
| Murcia / Destino · Híbrido | Murcia / On-site · Hybrid |
| Ingeniero MEP | MEP Engineer |
| Diseño y supervisión de instalaciones mecánicas, eléctricas y de fontanería en proyectos de edificación industrial, hospitalaria y hotelera de gran escala. | Design and supervision of mechanical, electrical and plumbing installations in large-scale industrial, healthcare and hotel building projects. |
| +5 años en MEP | +5 years in MEP |
| Ingeniería Mecánica / Eléctrica / Industrial | Mechanical / Electrical / Industrial Engineering |
| Dominio de AutoCAD MEP / Revit MEP | Proficiency in AutoCAD MEP / Revit MEP |
| Murcia · Presencial | Murcia · On-site |
| Soporte a la gestión de proyectos: seguimiento de cronogramas, control documental, coordinación con proveedores y reporting al Project Manager senior. | Support to project management: schedule tracking, document control, supplier coordination and reporting to the senior Project Manager. |
| 0–3 años de experiencia | 0–3 years of experience |
| Grado en Ingeniería o ADE | Degree in Engineering or Business Administration |
| Inglés nivel B2 mínimo | Minimum B2-level English |
| ¿No ve su perfil? | Don't see your profile? |
| Constantemente incorporamos perfiles técnicos de alto nivel. Si tiene experiencia en el sector de la construcción, ingeniería EPC o gestión de proyectos internacionales, envíenos su candidatura espontánea. | We are constantly bringing in top-level technical profiles. If you have experience in construction, EPC engineering or international project management, send us your spontaneous application. |
| Revisamos todas las candidaturas recibidas | We review every application received |
| Respuesta garantizada en un plazo máximo de 15 días | Guaranteed response within a maximum of 15 days |
| Proceso de selección basado en capacidad técnica demostrable | Selection process based on demonstrable technical capability |
| Candidatura Espontánea | Spontaneous Application |
| Nombre Completo | Full Name |
| `placeholder="Su nombre"` | `placeholder="Your name"` |
| `placeholder="su@email.com"` | `placeholder="you@email.com"` |
| Área de Especialización | Area of Specialisation |
| Jefatura de Obra (option) | Site Management |
| Ingeniería MEP (option) | MEP Engineering |
| Gestión de Proyectos (option) | Project Management |
| Ingeniería Civil / Estructural (option) | Civil / Structural Engineering |
| Logística Internacional (option) | International Logistics |
| Control de Costes (option) | Cost Control |
| Otro (option) | Other |
| Resumen Profesional | Professional Summary |
| `placeholder="Experiencia relevante, proyectos destacados..."` | `placeholder="Relevant experience, notable projects..."` |
| Enviar Candidatura | Submit Application |
| ✓ Candidatura recibida. Le responderemos en un plazo máximo de 15 días. | ✓ Application received. We will respond within a maximum of 15 days. |
| Conozca nuestros proyectos | Explore our projects |
| Descubra la escala y complejidad de los contratos en los que trabajará. | Discover the scale and complexity of the contracts you'll be working on. |
| Ver Portafolio | View Portfolio |

`Junior` y `Project Manager Junior` ya están en inglés en el original — no cambian.

- [ ] **Step 2: Verificación**

```bash
grep -oE '[áéíóúñÁÉÍÓÚÑ¿¡]' en/carrera.html | sort -u
```
Expected: sin salida.

- [ ] **Step 3: Commit**

```bash
git add en/carrera.html
git commit -m "Añadir versión en inglés de carrera.html"
```

---

### Task 9: `en/actualidad.html`

Igual que `proyectos.html`, esta página renderiza noticias dinámicamente vía JS (`newsCardHTML`) y necesita pasar `'en'` como idioma.

**Files:**
- Create: `en/actualidad.html`

- [ ] **Step 1: Crear el archivo**

Copia `actualidad.html` a `en/actualidad.html` y aplica los mismos cambios de cabecera y rutas que en la Task 5.

**Textos visibles:**

| Español | Inglés |
|---|---|
| `<title>Actualidad \| Alventor — EPC & Construcción</title>` | `<title>News \| Alventor — EPC & Construction</title>` |
| `alt="Bitácora de operaciones Alventor"` | `alt="Alventor operations log"` |
| Bitácora de Operaciones | Operations Log |
| Actualidad de Proyectos | Project News |
| Seguimiento técnico de nuestra actividad global: adjudicaciones, inicios de obra y entregas llave en mano. | Technical tracking of our global activity: contract awards, groundbreakings and turnkey deliveries. |
| Todos (botón filtro) | All |
| Adjudicación (botón filtro) | Contract Award |
| Inicio de Obra (botón filtro) | Groundbreaking |
| Ejecución (botón filtro) | Execution |
| Entrega (botón filtro) | Delivery |
| Alventor al día | Alventor Today |
| Últimas noticias y actividades operativas. | Latest news and operational activities. |
| Estado Operativo | Operational Status |
| Monitor de Actividad Operativa | Operational Activity Monitor |
| Proyectos Iniciados este trimestre | Projects Started This Quarter |
| Media de ejecución global | Global Execution Average |
| Entrega en revisión final | Delivery in Final Review |
| Nuevas adjudicaciones Q1 | New Q1 Contract Awards |
| Reciba nuestras actualizaciones técnicas | Receive Our Technical Updates |
| Suscríbase para recibir informes trimestrales sobre el avance de nuestros proyectos globales. | Subscribe to receive quarterly reports on the progress of our global projects. |
| `placeholder="Su correo profesional"` | `placeholder="Your professional email"` |
| Suscribirse | Subscribe |
| ✓ Suscripción confirmada. Recibirá nuestro próximo informe trimestral. | ✓ Subscription confirmed. You will receive our next quarterly report. |

`LIVE` ya está en inglés en el original — no cambia. Los atributos `data-news-filter="..."` **no se traducen** (deben seguir coincidiendo con los valores de `category` en `js/data.js`: `all`, `adjudicacion`, `inicio-obra`, `ejecucion`, `entrega`).

**Cambios en el `<script>` inline al final del archivo:**

```javascript
let currentFilter = 'all';

function renderNews(filter) {
  const all = AlventorData.getVisibleNews();
  const filtered = filter === 'all' ? all : all.filter(n => n.category === filter);
  const feed = document.getElementById('news-feed');
  const count = document.getElementById('news-count');
  count.textContent = `${filtered.length} news item${filtered.length !== 1 ? 's' : ''}`;

  if (!filtered.length) {
    feed.innerHTML = `<div class="md:col-span-12 text-center py-16 text-slate-400">No news in this category.</div>`;
    return;
  }

  const featured = filtered[0];
  const rest = filtered.slice(1, 4);
  feed.innerHTML = `
    <div class="md:col-span-7">${newsCardHTML(featured, true, 'en')}</div>
    <div class="md:col-span-5 flex flex-col gap-6">
      ${rest.map(n => newsCardHTML(n, false, 'en')).join('')}
    </div>`;
  refreshReveal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderNews('all');

  document.querySelectorAll('.news-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.newsFilter;
      document.querySelectorAll('.news-filter').forEach(b => {
        b.classList.remove('bg-[#0b1f3a]', 'text-white', 'border-[#0b1f3a]');
        b.classList.add('border-[#c4c6ce]', 'text-slate-600');
      });
      btn.classList.add('bg-[#0b1f3a]', 'text-white', 'border-[#0b1f3a]');
      btn.classList.remove('border-[#c4c6ce]', 'text-slate-600');
      renderNews(currentFilter);
    });
  });

  const subForm = document.getElementById('subscribe-form');
  if (subForm) {
    subForm.addEventListener('submit', e => {
      e.preventDefault();
      subForm.style.display = 'none';
      document.getElementById('subscribe-success').classList.remove('hidden');
    });
  }
});
```

(Cambios respecto al original: `newsCardHTML(featured, true)` → `newsCardHTML(featured, true, 'en')`, `newsCardHTML(n, false)` → `newsCardHTML(n, false, 'en')`, y el mensaje de "sin noticias" traducido al inglés. El resto de la lógica es idéntica.)

- [ ] **Step 2: Verificación**

```bash
grep -oE '[áéíóúñÁÉÍÓÚÑ¿¡]' en/actualidad.html | sort -u
```
Expected: sin salida.

```bash
grep -c "newsCardHTML(.*'en')" en/actualidad.html
```
Expected: `2`.

- [ ] **Step 3: Commit**

```bash
git add en/actualidad.html
git commit -m "Añadir versión en inglés de actualidad.html"
```

---

### Task 10: `en/index.html`

La página más completa: hero, stats, resumen EPC, grid de servicios, proyectos destacados (dinámico), compromiso EPC, últimas noticias (dinámico), CTA.

**Files:**
- Create: `en/index.html`

- [ ] **Step 1: Crear el archivo**

Copia `index.html` a `en/index.html` y aplica los mismos cambios de cabecera y rutas que en la Task 5.

**Textos visibles:**

| Español | Inglés |
|---|---|
| `<title>Alventor — EPC & Construcción Internacional</title>` | `<title>Alventor — International EPC & Construction</title>` |
| `alt="antenas"` | `alt="antennas"` |
| Ingeniería · Procurement · Construcción | Engineering · Procurement · Construction |
| Especialistas en la ejecución integral de proyectos. Bajo el modelo EPC asumimos la responsabilidad total del ciclo del proyecto: desde el diseño y la procura hasta la construcción y puesta en marcha de activos críticos. | Specialists in the integrated execution of projects. Under the EPC model we take full responsibility for the entire project lifecycle: from design and procurement through to the construction and commissioning of critical assets. |
| Nuestros Servicios | Our Services |
| Ver Proyectos | View Projects |
| Proyectos Entregados | Projects Delivered |
| Años de Experiencia | Years of Experience |
| Mercados Internacionales | International Markets |
| Cumplimiento de Plazos | On-Time Delivery Rate |
| Modelo Turnkey | Turnkey Model |
| EPC: Gestión Integral de Proyectos | EPC: Integrated Project Management |
| Lideramos el proyecto desde la ingeniería de detalle hasta la entrega llave en mano. Controlamos estrictamente los costes y plazos, asumiendo la responsabilidad técnica y operativa para garantizar activos listos para la producción. | We lead the project from detailed engineering through to turnkey delivery. We strictly control costs and schedules, taking on full technical and operational responsibility to deliver production-ready assets. |
| Diseño e Ingeniería de detalle | Detailed Design and Engineering |
| Gestión de compras y suministros | Procurement and Supply Management |
| Ejecución y construcción directa | Direct Execution and Construction |
| Puesta en marcha y validación | Commissioning and Validation |
| Ver todos los servicios | View all services |
| `alt="Modelo Turnkey"` | `alt="Turnkey Model"` |
| Capacidades Operativas | Operational Capabilities |
| Ejecución real en entornos de alta complejidad. | Real execution in highly complex environments. |
| Construcción e Infraestructura | Construction and Infrastructure |
| Obra civil pesada, estructuras industriales y cimentaciones especiales orientadas a la durabilidad. | Heavy civil works, industrial structures and special foundations focused on durability. |
| Instalaciones MEP | MEP Installations |
| Sistemas eléctricos, mecánicos y de control industrial. Edificios convertidos en máquinas eficientes. | Electrical, mechanical and industrial control systems. Buildings turned into efficient machines. |
| Edificación y Rehabilitación Hotelera | Hotel Building and Refurbishment |
| Expertos en hoteles en operación. Control de ruido, plazos críticos y acabados de alto standing. | Experts in hotels in full operation. Noise control, critical schedules and high-end finishes. |
| Ingeniería Aplicada | Applied Engineering |
| Ingeniería orientada al éxito de la ejecución. Diseños teóricos convertidos en soluciones constructivas reales. | Engineering focused on execution success. Theoretical designs turned into real constructive solutions. |
| Control de alcance, coste y cronograma con rigor militar para entregar según lo pactado. | Scope, cost and schedule control with military rigour to deliver as agreed. |
| Suministro Crítico | Critical Supply |
| Logística integrada para que cada componente esté en el lugar preciso en el momento adecuado. | Integrated logistics to ensure every component is in the right place at the right time. |
| Explorar todos los servicios | Explore all services |
| Proyectos Destacados | Featured Projects |
| Casos reales de ejecución. | Real execution case studies. |
| Ver portafolio completo | View full portfolio |
| El Compromiso Alventor | The Alventor Commitment |
| Responsabilidad Total - Modelo de Gestion EPC | Total Responsibility - EPC Management Model |
| Control Integral<br>Diseño \| Procurement\| Construcción | Full Control<br>Design \| Procurement \| Construction |
| Único Interlocutor | Single Point of Contact |
| Simplificamos la comunicación y eliminamos la fragmentación de responsabilidades. Alventor responde por el 100% del proyecto. | We simplify communication and eliminate fragmented responsibility. Alventor is accountable for 100% of the project. |
| No somos consultores, somos constructores. Nuestra capacidad de ejecución física garantiza que lo proyectado se convierta en realidad. | We are not consultants, we are builders. Our physical execution capability ensures that what is designed becomes reality. |
| Garantía de Entrega | Delivery Guarantee |
| Nuestra metodología EPC nos permite asegurar por contrato los plazos de entrega y el precio final del activo. | Our EPC methodology lets us contractually guarantee delivery schedules and the final price of the asset. |
| Alventor al día | Alventor Today |
| Seguimiento actualizado de nuestra actividad global. | Up-to-date tracking of our global activity. |
| Todas las noticias | All news |
| ¿Tiene un proyecto complejo? Lo ejecutamos contigo. | Have a complex project? We'll execute it with you. |
| Nuestro protocolo de ejecucion técnica está diseñado para proyectos integrales o EPC en contratos de alta exigencia. | Our technical execution protocol is designed for integrated or EPC projects under highly demanding contracts. |
| Solicitar Contizacion | Request a Quote |
| Ver Casos de Éxito | View Success Stories |

`Building the Future`, `Scroll`, `HOSPITALITY` y `Project Management` ya están en inglés en el original — no cambian.

**Cambios en el `<script>` inline al final del archivo:**

```javascript
const featuredProj = AlventorData.getVisibleProjects().filter(p => p.featured).slice(0, 6);
document.getElementById('featured-projects').innerHTML =
  featuredProj.map(p => projectCardHTML(p, 'en')).join('');

const allNews = AlventorData.getVisibleNews();
const featuredNews = allNews.find(n => n.featured) || allNews[0];
const sideNews = allNews.filter(n => n.id !== featuredNews.id).slice(0, 3);

document.getElementById('latest-news').innerHTML = `
  <div class="md:col-span-7">${newsCardHTML(featuredNews, true, 'en')}</div>
  <div class="md:col-span-5 flex flex-col gap-6 justify-start">
    ${sideNews.map(n => newsCardHTML(n, false, 'en')).join('')}
  </div>`;

refreshReveal();
```

(Único cambio respecto al original: se añade `, 'en'` como último argumento en las tres llamadas a `projectCardHTML`/`newsCardHTML`.)

- [ ] **Step 2: Verificación**

```bash
grep -oE '[áéíóúñÁÉÍÓÚÑ¿¡]' en/index.html | sort -u
```
Expected: sin salida.

```bash
grep -c "'en')" en/index.html
```
Expected: `3` (las tres llamadas de render).

- [ ] **Step 3: Verificación visual completa**

Con el servidor local corriendo, recorre `http://localhost:8080/en/index.html` de arriba a abajo comparando con `http://localhost:8080/index.html`:
- El selector de idioma en el nav ahora sí puede probarse en los dos sentidos (ES→EN y EN→ES) en todas las páginas, porque ya existen las 7 versiones en `/en/`.
- Las tarjetas de "Featured Projects" y "Alventor Today" muestran badge/tipo/ubicación/fecha en inglés.
- El footer muestra "NAVIGATION", "CONTACT", etc.

- [ ] **Step 4: Commit**

```bash
git add en/index.html
git commit -m "Añadir versión en inglés de index.html"
```

---

### Task 11: Smoke test final y push

**Files:** ninguno (solo verificación)

- [ ] **Step 1: Verificación cruzada de residuos de español en las 7 páginas EN**

```bash
grep -rloE '[áéíóúñÁÉÍÓÚÑ¿¡]' en/*.html
```
Expected: sin salida (ningún archivo listado). Si aparece alguno, revisa si es un nombre propio legítimo (poco probable) o texto sin traducir.

- [ ] **Step 2: Verificación de que cada página EN referencia recursos con `../`**

```bash
for f in en/*.html; do echo "--- $f ---"; grep -o 'src="[^"]*"\|href="[^"]*css[^"]*"' "$f" | grep -v '^src="https://\|^href="https://\|^src="#' ; done
```
Revisa que ninguna ruta local (css/js/img) se quede sin el prefijo `../` — todas deben empezar por `../css/`, `../js/` o `../img/` (excepto los `href="contacto.html"` etc., que deben quedarse sin prefijo).

- [ ] **Step 3: Recorrido manual completo en navegador**

Con `python3 -m http.server 8080` corriendo desde la raíz de `WEB_ALVENTOR`:

1. Abre `http://localhost:8080/index.html`. Pulsa `EN` en el nav → debe llevarte a `en/index.html` conservando la página (home → home).
2. Desde `en/index.html`, navega por los 6 enlaces del menú (About Us, Services, Projects, News, Careers, Contact) — todos deben quedarse dentro de `/en/`.
3. En cada página en inglés, pulsa `ES` → debe devolverte a la página equivalente en español (ej. `en/servicios.html` → `servicios.html`, no a la home).
4. En `en/proyectos.html`, prueba los filtros de sector — deben funcionar igual que en español, mostrando badge/tipo/ubicación en inglés.
5. En `en/actualidad.html`, prueba los filtros de categoría — igual.
6. Prueba el menú móvil (reducir la ventana) en una página en inglés: el selector `ES/EN` y el botón "Request a Quote" deben aparecer correctamente.
7. Prueba el formulario de `en/contacto.html` y `en/carrera.html` (enviar sin rellenar debe mostrar la validación nativa del navegador; rellenando y enviando debe mostrar el mensaje de confirmación en inglés).
8. Verifica el enlace "Admin Panel" del footer en una página `/en/` — debe apuntar a `../admin/` y abrir el panel real (en español, sin cambios).

- [ ] **Step 4: Push**

```bash
git push origin main
```

- [ ] **Step 5: Confirmar despliegue**

Espera unos minutos a que GitHub Pages despliegue y repite una comprobación rápida del Step 3 (puntos 1-3) directamente sobre `https://alventor.es/` y `https://alventor.es/en/`.

---

## Notas fuera de este plan (detectadas durante el trabajo, no corregidas aquí)

- **`quienes-somos.html`** (versión en español) tiene la imagen del hero rota: `src="img/ACC_Costa_Rica.JPG"` no existe; el archivo real es `img/ACCCostaRica.JPG`. La Task 4 ya usa la ruta correcta en `en/quienes-somos.html`, pero el original en español sigue roto. Es un arreglo de una línea, independiente de este plan — pendiente de que el usuario lo autorice.
- **`reconstruccion.html`** y **`manual.html`** quedan fuera de alcance (ver spec) — no se tocan en este plan.
- El **panel admin** sigue gestionando contenido únicamente en español. Cualquier proyecto/noticia que se añada desde ahí en el futuro no tendrá `title_en`/`description_en`/`excerpt_en` hasta que se edite a mano en `js/data.js` — la página en inglés mostrará el texto en español como respaldo automático (no se rompe, pero tampoco se traduce solo).

