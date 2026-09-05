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
    image: "/img/Archena2.jpg",
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
    image: "/img/Ave1.jpg",
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
    image: "/img/ACCCostaRica.JPG",
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
    image: "/img/Entrada tunel.jpg",
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
    image: "/img/1771586297891.jfif",
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
    image: "/img/SIMULATOR FURNITURE.png",
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
    image: "/img/adi-edificio_dotacional-talavera_hangar-4.jpg",
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
    image: "/img/princesskos.jfif",
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
    image: "/img/Anexis-118.jpg",
    tags: ["Radar", "Honduras", "Centroamérica"],
    id: 1788106000656
  },
  {
    id: 1,
    title: "Reforma Zonas Comunes Meliá Milan",
    title_en: "Common Area Refurbishment — Meliá Milan",
    description: "Reforma integral de las zonas comunes del hotel Meliá Milano, incluyendo hall de entrada, áreas de restauración y espacios de uso general con acabados de alto standing en hotel en plena operación.",
    description_en: "Full refurbishment of the common areas of the Meliá Milano hotel, including the entrance hall, dining areas and general-use spaces, with high-end finishes in a fully operating hotel.",
    image: "/img/Melia Milano Hall.JPG",
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
    image: "/img/IMG-20211112-WA0014.jpg",
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
    image: "/img/WhatsApp Image 2020-11-11 at 20.22.42 (1).jpeg",
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
    image: "/img/Estación Cerceda-Meirama_Nuevo ascensor y andenes y marquesina remodelados.jpg",
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
    image: "/img/ave2.jpg",
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
    image: "/img/Residenciaclecehuelva.jpg",
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
    image: "/img/IMG-20180805-WA0076.jpg",
    tags: ["Radar", "Marruecos", "Red Nacional", "Vigilancia Aérea"],
    id: 1788106000654
  },
  {
    id: 1010,
    title: "Hotel Tryp — Múnich",
    title_en: "Hotel Tryp — Munich",
    description: "Renovación integral de los sistemas de climatización y ventilación del hotel bajo normativa técnica alemana, con el establecimiento en activo durante toda la intervención.",
    description_en: "Full renovation of the hotel's HVAC and ventilation systems under German technical regulations, with the establishment operating throughout the intervention.",
    image: "/img/PHOTO-2020-10-30-16-42-11 (2).jpg",
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
    image: "/img/2016-03-29-PHOTO-00000130.jpg",
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
    image: "/img/260603-np-madrid-adif-acceso-ferroviario-fuencarral.jpg",
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
    image: "/img/DSC_0396.JPG",
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
    image: "/img/cactus palma.jpg",
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
    image: "/img/hotel-costa-malaga-adults-recommended-by-pierre-vacances-torremolinos-pic-51.jfif",
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
    image: "/img/stshuawei.jpg",
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
    image: "/img/o7-be-klub-servicios-15837214.jpg",
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
    image: "/img/sol-torremolinos-don-marco-adults-recommended-exterior-10d2f9ee.jpg",
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
    image: "/img/Anden_principal_estación_Salamanca.jpg",
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
    image: "/img/exe-sevilla-macarena-habitacion-13f8f5dd.jpg",
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
    image: "/img/Inversor-solar-fotovoltaico.jpg",
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
    image: "/img/IMG-20210104-WA0001.jpg",
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
    image: "/img/WhatsApp Image 2026-09-04 at 12.57.08.jpeg",
    project: "",
    id: 1788518966387
  },
  {
    id: 1,
    title: "Alventor inicia la fase de puesta en marcha de la primera planta PTE 4000 de Costa Rica",
    title_en: "Alventor begins commissioning phase of Costa Rica's first PTE 4000 plant",
    excerpt: "El equipo técnico de Alventor se encuentra en Limonal coordinando los trabajos de comisionado y pruebas de aceptación de la planta PTE 4000, marcando un hito clave en la expansión internacional de la compañía.",
    excerpt_en: "Alventor's technical team is in Limonal coordinating commissioning works and acceptance testing for the PTE 4000 plant, marking a key milestone in the company's international expansion.",
    image: "/img/CostaRicafrontal.jpg",
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
    image: "/img/Radar Site Oman.jpg",
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
    image: "/img/Archena1.jpg",
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
    image: "/img/Torre_construccion.jpg",
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
