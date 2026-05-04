/* ============================================================
   ALVENTOR — Main JS: animations, nav, interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();

  // Small delay to let DOM settle after component injection
  requestAnimationFrame(() => {
    initMobileMenu();
    initNavScroll();
    initScrollReveal();
    initCounters();
    initScrollProgress();
    initProjectFilter();
    initPageTransitions();
    initContactForm();
    openPageCurtain();
  });
});

/* ---- Page entrance animation ---- */
function openPageCurtain() {
  const curtain = document.getElementById('page-curtain');
  if (!curtain) return;
  curtain.classList.add('opening');
  setTimeout(() => curtain.classList.remove('opening'), 600);
}

/* ---- Page exit + navigation ---- */
function initPageTransitions() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('http') ||
        link.target === '_blank') return;

    e.preventDefault();
    const curtain = document.getElementById('page-curtain');
    if (curtain) {
      curtain.classList.add('closing');
      setTimeout(() => { window.location.href = href; }, 420);
    } else {
      window.location.href = href;
    }
  });
}

/* ---- Mobile menu ---- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const closeBtn  = document.getElementById('mobile-close');
  const menu      = document.getElementById('mobile-menu');
  const overlay   = document.getElementById('menu-overlay');
  if (!hamburger || !menu) return;

  function open() {
    menu.classList.add('open');
    overlay.classList.add('visible');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    menu.classList.remove('open');
    overlay.classList.remove('visible');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
}

/* ---- Navbar scroll effect ---- */
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Scroll reveal (IntersectionObserver) ---- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* Called after dynamic content is rendered */
function refreshReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

/* ---- Animated counters ---- */
function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = 1;
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.counter, 10);
  const prefix   = el.dataset.prefix  || '';
  const suffix   = el.dataset.suffix  || '';
  const duration = 1400;
  const start    = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---- Scroll progress bar ---- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive: true });
}

/* ---- Project filter (proyectos.html) ---- */
function initProjectFilter() {
  const btns = document.querySelectorAll('[data-filter]');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button styles
      btns.forEach(b => {
        b.classList.remove('bg-[#0b1f3a]', 'text-white', 'border-[#0b1f3a]');
        b.classList.add('border-[#c4c6ce]', 'text-slate-600');
      });
      btn.classList.add('bg-[#0b1f3a]', 'text-white', 'border-[#0b1f3a]');
      btn.classList.remove('border-[#c4c6ce]', 'text-slate-600');

      // Show/hide cards
      const cards = document.querySelectorAll('[data-sector]');
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.sector === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.classList.remove('visible');
          requestAnimationFrame(() => card.classList.add('visible'));
        }
      });
    });
  });
}

/* ---- Contact form ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    if (btn) {
      btn.textContent = 'Enviando...';
      btn.disabled = true;
    }
    setTimeout(() => {
      const msg = document.getElementById('form-success');
      if (msg) { msg.classList.remove('hidden'); }
      form.reset();
      if (btn) { btn.textContent = 'Iniciar Protocolo'; btn.disabled = false; }
    }, 1200);
  });
}
