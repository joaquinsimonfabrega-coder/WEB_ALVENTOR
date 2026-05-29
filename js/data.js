/* ============================================================
   ALVENTOR — Data Layer (localStorage-backed)
   ============================================================ */

const KEYS = {
  projects: 'alventor_projects',
  news:     'alventor_news',
};

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Reforma Zonas Comunes Meliá Milano",
    description: "Reforma integral de las zonas comunes del hotel Meliá Milano, incluyendo hall de entrada, áreas de restauración y espacios de uso general con acabados de alto standing en hotel en plena operación.",
    image: "img/Melia Milano Hall.JPG",
    type: "Rehabilitación",
    location: "Milano, ITA",
    sector: "edificacion",
    badge: "Rehabilitación Hotelera",
    featured: true
  },
  {
    id: 2,
    title: "Modernización Instalaciones Técnicas LAV Madrid - Sevilla",
    description: "Modernización de instalaciones técnicas en la Línea de Alta Velocidad Madrid-Sevilla, incluyendo sistemas de control, señalización y electrificación bajo estrictos protocolos de seguridad ferroviaria.",
    image: "img/Ave1.jpg",
    type: "EPC",
    location: "Madrid - Sevilla, ESP",
    sector: "infraestructuras",
    badge: "Modelo EPC",
    featured: true
  },
  {
    id: 3,
    title: "Obras Civiles e Infraestructuras Básicas PTE 50000 Archena",
    description: "Ejecución de obras civiles e infraestructuras básicas de la Plataforma Técnica de Ejecución PTE 50000 en Archena, incluyendo movimiento de tierras, cimentaciones y estructuras de acceso.",
    image: "img/Archena2.jpg",
    type: "EPC",
    location: "Archena, ESP",
    sector: "infraestructuras",
    badge: "Modelo EPC",
    featured: true
  }
];

const DEFAULT_NEWS = [
  {
    id: 1,
    title: "Alventor inicia la fase de puesta en marcha de la primera planta PTE 4000 de Costa Rica",
    excerpt: "El equipo técnico de Alventor se encuentra en Limonal coordinando los trabajos de comisionado y pruebas de aceptación de la planta PTE 4000, marcando un hito clave en la expansión internacional de la compañía.",
    image: "img/CostaRicafrontal.jpg",
    category: "inicio-obra",
    date: "2025-05-12",
    location: "Limonal - Costa Rica",
    featured: true
  },
  {
    id: 2,
    title: "ALVENTOR impulsa una línea estratégica en proyectos internacionales de reconstrucción e infraestructuras críticas",
    excerpt: "Alventor consolida su posicionamiento en el mercado internacional con una cartera activa de proyectos de reconstrucción e infraestructuras críticas, desarrollando capacidad diferencial en entornos de alta exigencia técnica.",
    image: "img/Radar Site Oman.jpg",
    category: "adjudicacion",
    date: "2025-04-18",
    location: "Proyectos Internacionales",
    featured: false
  },
  {
    id: 3,
    title: "Finalización de trabajos y arranque operativo de Almazara en Osuna",
    excerpt: "Alventor ha completado la construcción e instalación de la almazara en Osuna, entregando el activo listo para su primera campaña de producción tras superar con éxito las pruebas de puesta en marcha.",
    image: "img/Archena1.jpg",
    category: "entrega",
    date: "2025-03-05",
    location: "Osuna - Sevilla",
    featured: false
  },
  {
    id: 4,
    title: "Alventor lanza su nueva web corporativa",
    excerpt: "Alventor estrena su nueva presencia digital con una web corporativa renovada que refleja la identidad y el posicionamiento de la compañía como referente EPC en el mercado internacional de construcción e infraestructuras.",
    image: "img/Torre_construccion.jpg",
    category: "entrega",
    date: "2025-05-20",
    location: "Servicios Centrales",
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
  industrial: 'Industrial & Energía',
  edificacion: 'Edificación',
  instalaciones: 'Instalaciones Técnicas',
};

const CAT_LABELS = {
  adjudicacion: 'Adjudicación',
  'inicio-obra': 'Inicio de Obra',
  ejecucion: 'Ejecución',
  entrega: 'Entrega',
};

function fmtDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
}

function projectCardHTML(p) {
  return `
    <article data-sector="${p.sector}"
      class="bg-white border border-[#c4c6ce] flex flex-col group hover:border-[#C49A3C] hover:shadow-2xl transition-all duration-500 card-lift reveal">
      <div class="relative h-64 overflow-hidden bg-[#0b1f3a]">
        <img src="${p.image}" alt="${p.title}"
          class="w-full h-full object-cover grayscale-hover">
        <div class="absolute top-4 right-4 bg-[#C49A3C] text-[#000615] px-3 py-1 text-[10px] font-bold tracking-widest uppercase">${p.badge}</div>
      </div>
      <div class="p-8 flex flex-col flex-grow">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-[2px] bg-[#C49A3C] flex-shrink-0"></span>
          <span class="text-[#30628d] uppercase tracking-[0.2em] text-[10px] font-bold">${SECTOR_LABELS[p.sector] || p.sector}</span>
        </div>
        <h3 class="text-xl font-semibold mb-3 text-[#0b1f3a] group-hover:text-[#C49A3C] transition-colors leading-snug">${p.title}</h3>
        <p class="text-sm text-[#44474d] mb-6 flex-grow leading-relaxed">${p.description}</p>
        <div class="grid grid-cols-2 gap-4 border-t border-[#c4c6ce] pt-5">
          <div>
            <span class="block text-[9px] text-[#75777e] uppercase tracking-widest mb-1">Tipo</span>
            <span class="block text-sm font-semibold text-[#0b1f3a]">${p.type}</span>
          </div>
          <div>
            <span class="block text-[9px] text-[#75777e] uppercase tracking-widest mb-1">Ubicación</span>
            <span class="block text-sm font-semibold text-[#0b1f3a]">${p.location}</span>
          </div>
        </div>
      </div>
    </article>`;
}

function newsCardHTML(n, featured = false) {
  const cat = CAT_LABELS[n.category] || n.category;
  const date = fmtDate(n.date);
  if (featured) {
    return `
      <article class="group cursor-pointer reveal-left">
        <div class="relative overflow-hidden h-[400px] mb-6">
          <img src="${n.image}" alt="${n.title}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          <div class="absolute top-6 left-6">
            <span class="bg-[#0b1f3a] text-white text-[10px] px-4 py-2 uppercase tracking-widest font-bold">${cat}</span>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-4 mb-3">
            <span class="text-xs text-[#75777e]">${date}</span>
            <span class="h-px w-10 bg-[#c4c6ce]"></span>
            <span class="text-xs text-[#75777e] uppercase">${n.location || ''}</span>
          </div>
          <h3 class="text-2xl font-semibold text-[#0b1f3a] mb-3 group-hover:text-[#C49A3C] transition-colors leading-snug">${n.title}</h3>
          <p class="text-sm text-[#44474d] max-w-xl leading-relaxed">${n.excerpt}</p>
        </div>
      </article>`;
  }
  return `
    <article class="border-b border-[#c4c6ce] pb-7 group cursor-pointer reveal">
      <span class="text-[10px] text-[#30628d] mb-2 block uppercase tracking-widest font-bold">${cat}</span>
      <h4 class="text-base font-semibold text-[#0b1f3a] mb-2 group-hover:text-[#30628d] transition-colors leading-snug">${n.title}</h4>
      <div class="flex items-center gap-2 text-[#75777e] mb-2">
        <span class="material-symbols-outlined text-[15px]">location_on</span>
        <span class="text-xs">${n.location || ''}</span>
      </div>
      <p class="text-xs text-[#44474d] leading-relaxed line-clamp-2">${n.excerpt}</p>
      <span class="text-[10px] text-[#75777e] mt-2 block">${date}</span>
    </article>`;
}
