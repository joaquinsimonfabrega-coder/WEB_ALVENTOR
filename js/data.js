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
    title: "Centro Logístico Terminal T4",
    description: "Ejecución integral de flujos de carga y automatización de sistemas de clasificación bajo contrato llave en mano.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXBP6jJUsVPOnpUPKDQ5cEBkS912Lg2xz1YXn7hhOEVbs4uAvaUmgFyQNKRsToHbFQpRejL4wO-w0LhcvWGpAPP-jUEVKSsXL928Uza59sp3bQaQJXyhzeWSfh9A93Vblj6BOGX8vU16cUNAmKQdtvNOv4S3BmxqN4q3LSQqXcdBgORcUb5DzKtcTYoCgrR-My5niWeXU9PyFKYGNNNRQPECLhpLc3vEISH4rfFq6wRKzAt53NwDCpHztGMsVPeosn0w1fWeOgGgr2",
    type: "EPC",
    location: "Madrid, ESP",
    sector: "infraestructuras",
    badge: "Modelo EPC",
    featured: true
  },
  {
    id: 2,
    title: "Planta Bio-Masa Integrada",
    description: "Diseño y ejecución integral de infraestructuras para procesamiento térmico y generación eléctrica de alta disponibilidad.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5fHBMEDyMcjcpOY9Vww56TX-sCNXyttK5Yz4fkAsWbKXFXIY15Zg4SNEDRl_krqjO7uONe2oGjFs5i3ldLwBPSrVf3lDH0dUmBBAI1M5Cpbonqj1AjHn1GN-2ypp4Pw9QwxY1Va8zDZBpltutsk75qGvGNusfRczLej8Ec_ltUefrzfnuVfuOonUz3UO6AVRHfx0ZuN9FmtNQuaT3BRtbN8D6hFmDg1t96D06LW2rYpgiupTDg1Xbavh7ReFNvoiwOai9COa16-k-",
    type: "EPC",
    location: "Sevilla, ESP",
    sector: "industrial",
    badge: "Modelo EPC",
    featured: true
  },
  {
    id: 3,
    title: "Resort Premium Costa del Sol",
    description: "Construcción integral de activos hoteleros con control exhaustivo de calidad y acabados de ingeniería superior.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0UlNs0GTvLKHfqEQMGqUW3VTF-qYLV4WOA7czCAD8bYMp1w7Po6pPPP7BImP6aPqEx223TYHCGCyKPG8oY7KmAGd31ljVwcEteJf7pvWdhvpkLnjazslN0wO3L67aLpxKvo2huf07j2KeYSccn0425K66g4lkgL-GZlwgIXA5jCk0CBhZoJHux-oOjq91b1wq7_F2F2VugG4GlE1mdnxGjFsiAf8og2wtdgotqH7v58QnSe5v1Mrd_o0pGPZICF7y20SnLwZGwr_P",
    type: "Construcción",
    location: "Málaga, ESP",
    sector: "edificacion",
    badge: "Construcción Especializada",
    featured: true
  },
  {
    id: 4,
    title: "Base de Mantenimiento AVE",
    description: "Modelo EPC para talleres industriales y centros de mantenimiento de alta velocidad con plazos de entrega estrictos.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhEPzQJp7cwRuycLhMwUPW3cmcWNiw41Uhw3IIfYmenoLeGqhveDLI2R6rAnM6UiNe8aawJqvFLsipJhMOLyYYmomhFWFdRM7c3O8neR0Am635AD0Tm_pzlkRzU7aFOyvpzKymp_mVny8idRdaykbRemxB0sF_sIBA5jk0ydd0OqfnC09CMXuBBBojgpsJ3XBMKPsrWpa_ZwYR9TKROIMdpfkFYNgNuGnIEctw4Pu5rOR9-HV_YVuHst8RI6yBDIPkHkMBzYbovYOT",
    type: "EPC",
    location: "Barcelona, ESP",
    sector: "infraestructuras",
    badge: "Modelo EPC",
    featured: false
  },
  {
    id: 5,
    title: "Ampliación Clínica Médica",
    description: "Ejecución integral de áreas quirúrgicas y laboratorios con control ambiental crítico y entrega llave en mano.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9OV7OfoYaTq9N9Ww8uq5UQf1Is8UB3nOjt0M2_bTjtvBCVWMo1ZguAyYPyekBpwUVf__rjFX1CVJZLK7yMRoeb7AJrd32KD-zxIXp7KyyyhwvR-cDpo7hpuBq9umGCPiz1pijz8EXj-LSnOf9lNuhakCzWQXvSxF8MgjWrjvX8Y8WNJpentkyFzUxx5f5P1q67Eer6fDozg5RzE_-wPGy0Xz-cI-8GpOP081cCuHDJwsnQfIM9H1lGyz-7LZCYnJk3HKiF1nymquJ",
    type: "Construcción",
    location: "Valencia, ESP",
    sector: "edificacion",
    badge: "Construcción Especializada",
    featured: false
  },
  {
    id: 6,
    title: "Data Center Tier III",
    description: "Ejecución de sistemas críticos de potencia y climatización con control de redundancia y estándares de máxima seguridad.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoEW2ef6iUkdyb8RqYmFQNXZ7lBhzwNFACUuEmnTwvHRvz_MRg2K1WkBL8lS2sQ0bnhSglh0U_FjuPAE25Ch2ORsU2qE142h861LTGZ7mBZHXLkxzoPcbSpofuj4kNrdP77nvF0xVt0o_-mP8vYDuEUdMJ5Ovw9EKWmKueT41dFx3EEBH4BREUpiJKpgAMQtEP8rNrj8zwYRj2fib1xGXNkwbE0JtnX3HgJvyi9RlcVhdztCEG4eKCuohrW0y9CjtCj9UGxyMrXHDT",
    type: "Instalaciones",
    location: "Bilbao, ESP",
    sector: "instalaciones",
    badge: "Instalaciones Técnicas",
    featured: false
  }
];

const DEFAULT_NEWS = [
  {
    id: 1,
    title: "Alventor liderará la construcción del nuevo centro de almacenamiento térmico en Bilbao",
    excerpt: "Contrato EPC adjudicado para la fase 1 del proyecto. La ejecución contempla el diseño estructural avanzado y la integración de sistemas de control térmico de última generación.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWrZIuqMzVtC5Kvaz4F_-zoHnUusuD_8yv6UTAEA-xdWNbimc7iXAp9pgSP7y6v7qyjM8rvwRLNlcVSZjrg-4AM-_r1BCXIdy2LwNDzBdtV05eTDhZE6DBlyHLFcfg2SpZRWx3cQ5BDPW2WTkfi42skTnDYS1oaA3A-I1u9j0BU3xl-BFUo4qYnrhEaqURIqUNZpurCDgKtnBXOPv4Ci-OVIVescm42s_1xQs9tDFgX58mJ3RmcHcAIwNAfsXRXrTGlu64RzkOWshn",
    category: "adjudicacion",
    date: "2024-10-24",
    location: "Hub Energético Norte",
    featured: true
  },
  {
    id: 2,
    title: "Arranque operativo: Planta de tratamiento de aguas en Antofagasta",
    excerpt: "Movilización de equipos pesados y establecimiento del campamento técnico para la fase de cimentación profunda.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCManmY6lR-reo_QgOnBJWtf9YKGA8Gx1q_TtysaX6AwZQLZt_4PEPwJ4YrahvEIjAXttBnpY7APyaxeqqcF3ygP6KmHz2J7SdG2GwMigXqSv_IpL3e1Pua8p1Y7VpC420sr0iklDv_Sa9rb2l8MQoTC6uc2TLrv9bVe2SkXsD2UMhYHg0UJK_IRAbIu6HOscZ0hSa8emqHnewKvs_mfcRag0Y9qvjUWYmo0h4Necuz9xjA4A2ojA7Cog8M7-NidIU36cFTvgw4LAmM",
    category: "inicio-obra",
    date: "2024-10-15",
    location: "Chile / Sector Industrial",
    featured: false
  },
  {
    id: 3,
    title: "Alcanzado el 65% de avance en la Refinería del Golfo",
    excerpt: "Finalizado el izaje de las estructuras críticas principales siguiendo los protocolos de seguridad de alto riesgo.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_WLaOw6Q0xTZOaWdxkFjPl5TTMeiHUvPhu06ZLXVQzYQ92POhhMVZXNFXze2qkNBaLjJfDX7LuRyo3N3hiVKYTUUIrocpLCeJWSsYkaH7hJcwn9u51HQ8lSy2un8QQ73wU03sTC4CDV3F_gr_N5pA44Jqi4pHa_9vRKc5DQ3EXz49UJsGPZN8hAdqetuoAnxHeFMEjCUHzjH_ri44P5oKlST5TKmRw3XRD_Jm3EaNgtval4HR7pnFGWfNgFEPYixfhrEKRtlBFyNg",
    category: "ejecucion",
    date: "2024-10-10",
    location: "Fase: Montaje Electromecánico",
    featured: false
  },
  {
    id: 4,
    title: "Entrega exitosa de la Terminal Logística Portuaria",
    excerpt: "Completada la puesta en marcha de los sistemas automatizados de carga y descarga 15 días antes de lo previsto.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXBP6jJUsVPOnpUPKDQ5cEBkS912Lg2xz1YXn7hhOEVbs4uAvaUmgFyQNKRsToHbFQpRejL4wO-w0LhcvWGpAPP-jUEVKSsXL928Uza59sp3bQaQJXyhzeWSfh9A93Vblj6BOGX8vU16cUNAmKQdtvNOv4S3BmxqN4q3LSQqXcdBgORcUb5DzKtcTYoCgrR-My5niWeXU9PyFKYGNNNRQPECLhpLc3vEISH4rfFq6wRKzAt53NwDCpHztGMsVPeosn0w1fWeOgGgr2",
    category: "entrega",
    date: "2024-10-01",
    location: "Hito: Handover técnico",
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
