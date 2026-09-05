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
