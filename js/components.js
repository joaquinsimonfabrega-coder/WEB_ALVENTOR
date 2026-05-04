/* ============================================================
   ALVENTOR — Shared Nav + Footer Components
   ============================================================ */

const NAV_LINKS = [
  { href: 'quienes-somos.html', label: 'Quiénes Somos' },
  { href: 'servicios.html',     label: 'Servicios' },
  { href: 'proyectos.html',     label: 'Proyectos' },
  { href: 'actualidad.html',    label: 'Actualidad' },
  { href: 'carrera.html',       label: 'Carrera' },
  { href: 'contacto.html',      label: 'Contacto' },
];

function getBase() {
  return window.location.pathname.includes('/admin') ? '../' : '';
}

function getCurrentFile() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || 'index.html';
}

function renderNav() {
  const base = getBase();
  const cur  = getCurrentFile();

  const links = NAV_LINKS.map(l => `
    <a href="${base}${l.href}"
       class="nav-link text-sm font-medium uppercase tracking-wider text-slate-500 hover:text-[#C49A3C] transition-colors duration-200 ${cur === l.href ? 'active' : ''}">
      ${l.label}
    </a>`).join('');

  const mobileLinks = NAV_LINKS.map(l => `
    <a href="${base}${l.href}"
       class="block text-lg font-bold uppercase tracking-wider py-2 border-b border-slate-100 ${cur === l.href ? 'text-[#C49A3C]' : 'text-[#0b1f3a]'} hover:text-[#C49A3C] transition-colors">
      ${l.label}
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
          <a href="${base}contacto.html"
             class="hidden md:inline-flex items-center bg-[#0b1f3a] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#C49A3C] transition-colors duration-200">
            Solicitar Cotización
          </a>
          <button id="hamburger" class="hamburger lg:hidden flex flex-col gap-1.5 p-2" aria-label="Abrir menú">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu">
      <button id="mobile-close" class="absolute top-6 right-6 text-2xl font-bold text-slate-800 hover:text-[#C49A3C] transition-colors" aria-label="Cerrar menú">✕</button>
      <div class="flex flex-col gap-1">${mobileLinks}</div>
      <a href="${base}contacto.html"
         class="mt-6 inline-block bg-[#0b1f3a] text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-center hover:bg-[#C49A3C] transition-colors">
        Solicitar Cotización
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
  const footerLinks = NAV_LINKS.map(l =>
    `<a class="text-[11px] text-slate-400 hover:text-white transition-colors uppercase tracking-wide" href="${base}${l.href}">${l.label}</a>`
  ).join('');

  const html = `
    <footer class="bg-[#0b1f3a] text-white border-t-4 border-[#C49A3C]">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <!-- Brand -->
        <div class="space-y-5">
          <a href="${base}index.html" class="text-2xl font-black tracking-tighter text-white uppercase hover:text-[#C49A3C] transition-colors">ALVENTOR</a>
          <p class="text-[11px] leading-relaxed text-slate-400">
            International Engineering &amp; Construction.<br>
            Especialistas en ejeuccion de proyectos integrales y EPC para los sectores de infraestructuras, edificacion, energía e industria.
          </p>
          <a href="${base}contacto.html"
             class="inline-block bg-[#C49A3C] text-[#0b1f3a] px-5 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Contacto
          </a>
        </div>

        <!-- Nav -->
        <div class="flex flex-col gap-3">
          <span class="font-bold text-[11px] uppercase tracking-widest mb-1 text-[#C49A3C]">NAVEGACIÓN</span>
          ${footerLinks}
        </div>

        <!-- Legal -->
        <div class="flex flex-col gap-3">
          <span class="font-bold text-[11px] uppercase tracking-widest mb-1 text-[#C49A3C]">COMPLIANCE</span>
          <a class="text-[11px] text-slate-400 hover:text-white transition-colors" href="#">Aviso Legal</a>
          <a class="text-[11px] text-slate-400 hover:text-white transition-colors" href="#">Política de Privacidad</a>
          <a class="text-[11px] text-slate-400 hover:text-white transition-colors" href="#">Política Ambiental</a>
          <a class="text-[11px] text-slate-400 hover:text-white transition-colors" href="#">Cookies</a>
        </div>

        <!-- Contact -->
        <div class="flex flex-col gap-3">
          <span class="font-bold text-[11px] uppercase tracking-widest mb-1 text-[#C49A3C]">CONTACTO</span>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            Avda. Teniente Montesinos 8<br>
            Edificio A – Planta 7<br>
            30.100 Espinardo – Murcia
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
          © 2024 Alventor Engineering &amp; Construction. Todos los derechos reservados.
        </p>
        <a href="${base}admin/" class="text-[10px] text-slate-700 hover:text-slate-400 transition-colors uppercase tracking-widest">
          Panel Admin
        </a>
      </div>
    </footer>
  `;

  const root = document.getElementById('footer-root');
  if (root) root.innerHTML = html;
}
