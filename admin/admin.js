/* ================================================
   Alventor Admin Panel — admin.js
   ================================================ */

const ADMIN_PASSWORD = 'alventor2024';
const SESSION_KEY = 'alventor_admin_auth';

// ─── Auth ────────────────────────────────────────

const loginScreen = document.getElementById('login-screen');
const dashboard   = document.getElementById('dashboard');

function checkSession() {
  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    showDashboard();
  }
}

function showDashboard() {
  loginScreen.style.display = 'none';
  dashboard.classList.remove('hidden');
  dashboard.style.display = 'flex';
  initTabs();
  switchTab('proyectos');
}

document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const val = document.getElementById('login-pass').value;
  if (val === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, '1');
    document.getElementById('login-error').classList.add('hidden');
    showDashboard();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
    document.getElementById('login-pass').value = '';
    document.getElementById('login-pass').focus();
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
});

// ─── Tabs ────────────────────────────────────────

function initTabs() {
  document.querySelectorAll('.sidebar-nav').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(name) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav').forEach(b => {
    b.classList.remove('bg-white/20', 'text-white');
    b.classList.add('text-[#7587a7]');
  });

  document.getElementById('tab-' + name).classList.add('active');
  const activeBtn = document.querySelector(`[data-tab="${name}"]`);
  if (activeBtn) {
    activeBtn.classList.add('bg-white/20', 'text-white');
    activeBtn.classList.remove('text-[#7587a7]');
  }

  if (name === 'proyectos') renderProyectosTable();
  if (name === 'noticias') renderNoticiasTable();
}

// ─── Toast ───────────────────────────────────────

const toastEl  = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
const toastIcon = document.getElementById('toast-icon');
let toastTimer;

function showToast(msg, type = 'success') {
  clearTimeout(toastTimer);
  toastMsg.textContent = msg;
  toastIcon.textContent = type === 'success' ? 'check_circle' : 'error';
  toastIcon.className = `material-symbols-outlined ${type === 'success' ? 'text-[#C49A3C]' : 'text-red-400'}`;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

// ─── Confirm Dialog ──────────────────────────────

let confirmCallback = null;

function openConfirm(msg, cb) {
  confirmCallback = cb;
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-overlay').classList.remove('hidden');
}

document.getElementById('confirm-cancel').addEventListener('click', () => {
  document.getElementById('confirm-overlay').classList.add('hidden');
  confirmCallback = null;
});

document.getElementById('confirm-ok').addEventListener('click', () => {
  document.getElementById('confirm-overlay').classList.add('hidden');
  if (confirmCallback) confirmCallback();
  confirmCallback = null;
});

// ─── Modal ───────────────────────────────────────

const modalOverlay = document.getElementById('modal-overlay');
const modalTitle   = document.getElementById('modal-title');
const modalBody    = document.getElementById('modal-body');
const modalSave    = document.getElementById('modal-save');

function openModal(title, bodyHTML, onSave) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHTML;
  modalOverlay.classList.add('open');
  modalSave.onclick = onSave;
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalBody.innerHTML = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-cancel').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// ─── Helpers ─────────────────────────────────────

const STATUS_LABELS = {
  activo: 'Activo',
  completado: 'Completado',
  pendiente: 'Pendiente',
};

const STATUS_COLORS = {
  activo: 'bg-green-100 text-green-800',
  completado: 'bg-blue-100 text-blue-800',
  pendiente: 'bg-yellow-100 text-yellow-800',
};

// ─── PROYECTOS TABLE ─────────────────────────────

function renderProyectosTable() {
  const items = AlventorData.getProjects();
  const tbody = document.getElementById('proyectos-tbody');
  const count = document.getElementById('proyectos-count');
  count.textContent = `${items.length} proyecto${items.length !== 1 ? 's' : ''}`;

  if (!items.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-12 text-slate-400 text-sm">No hay proyectos. Añada el primero.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map((p, idx) => `
    <tr class="border-b border-[#e4e2e4] last:border-0 transition-colors">
      <td class="px-3 py-4 w-10">
        <div class="flex flex-col gap-0.5">
          <button onclick="moveProyecto('${p.id}', -1)" ${idx === 0 ? 'disabled' : ''}
            class="text-[#7587a7] hover:text-[#0b1f3a] disabled:opacity-20 disabled:cursor-default transition-colors leading-none">
            <span class="material-symbols-outlined text-base">arrow_drop_up</span>
          </button>
          <button onclick="moveProyecto('${p.id}', 1)" ${idx === items.length - 1 ? 'disabled' : ''}
            class="text-[#7587a7] hover:text-[#0b1f3a] disabled:opacity-20 disabled:cursor-default transition-colors leading-none">
            <span class="material-symbols-outlined text-base">arrow_drop_down</span>
          </button>
        </div>
      </td>
      <td class="px-5 py-4">
        <div class="font-semibold text-[#0b1f3a] text-sm leading-tight">${esc(p.title)}</div>
        <div class="text-xs text-[#75777e] mt-0.5">${esc(p.location || '')}</div>
      </td>
      <td class="px-5 py-4 hidden md:table-cell">
        <span class="text-[10px] font-bold uppercase tracking-widest text-[#44474d]">${SECTOR_LABELS[p.sector] || p.sector}</span>
      </td>
      <td class="px-5 py-4 hidden lg:table-cell text-sm text-[#44474d]">${esc(p.location || '—')}</td>
      <td class="px-5 py-4 hidden lg:table-cell">
        <span class="text-[10px] font-bold px-2 py-1 rounded ${STATUS_COLORS[p.status] || 'bg-gray-100 text-gray-700'}">${STATUS_LABELS[p.status] || p.status || '—'}</span>
      </td>
      <td class="px-5 py-4 text-right whitespace-nowrap">
        <button onclick="editProyecto('${p.id}')"
          class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#30628d] hover:text-[#0b1f3a] transition-colors mr-3">
          <span class="material-symbols-outlined text-sm">edit</span> Editar
        </button>
        <button onclick="deleteProyecto('${p.id}', '${esc(p.title)}')"
          class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">
          <span class="material-symbols-outlined text-sm">delete</span> Borrar
        </button>
      </td>
    </tr>
  `).join('');
}

// ─── PROYECTO MODAL FORM ─────────────────────────

function proyectoFormHTML(p = {}) {
  return `
    <div class="space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Título del Proyecto *</label>
          <input id="f-title" type="text" value="${esc(p.title || '')}" required placeholder="Nombre del proyecto"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
        </div>
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Ubicación *</label>
          <input id="f-location" type="text" value="${esc(p.location || '')}" required placeholder="Ciudad, País"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Sector *</label>
          <select id="f-sector"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors appearance-none">
            ${Object.entries(SECTOR_LABELS).map(([v, l]) =>
              `<option value="${v}" ${p.sector === v ? 'selected' : ''}>${l}</option>`
            ).join('')}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Estado</label>
          <select id="f-status"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors appearance-none">
            ${Object.entries(STATUS_LABELS).map(([v, l]) =>
              `<option value="${v}" ${p.status === v ? 'selected' : ''}>${l}</option>`
            ).join('')}
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Tipo *</label>
          <select id="f-type"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors appearance-none">
            ${['EPC', 'Construcción', 'Instalaciones'].map(t =>
              `<option value="${t}" ${p.type === t ? 'selected' : ''}>${t}</option>`
            ).join('')}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Etiqueta (badge)</label>
          <input id="f-badge" type="text" value="${esc(p.badge || '')}" placeholder="Modelo EPC"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Año</label>
          <input id="f-year" type="text" value="${esc(p.year || '')}" placeholder="2024"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
        </div>
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Importe / Valor</label>
          <input id="f-value" type="text" value="${esc(p.value || '')}" placeholder="€ 12.5M"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Descripción *</label>
        <textarea id="f-desc" rows="3" required placeholder="Descripción técnica del proyecto..."
          class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors resize-none">${esc(p.description || '')}</textarea>
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">URL de Imagen</label>
        <input id="f-img" type="url" value="${esc(p.image || '')}" placeholder="https://..."
          class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Tags (separados por coma)</label>
        <input id="f-tags" type="text" value="${esc((p.tags || []).join(', '))}" placeholder="EPC, Hormigón, Industrial"
          class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
      </div>
      <p id="form-error" class="hidden text-xs text-red-600 font-medium">Por favor complete todos los campos obligatorios (*).</p>
    </div>
  `;
}

document.getElementById('add-proyecto-btn').addEventListener('click', () => {
  openModal('Nuevo Proyecto', proyectoFormHTML(), () => {
    const data = readProyectoForm();
    if (!data) return;
    AlventorData.addProject(data);
    closeModal();
    renderProyectosTable();
    showToast('Proyecto añadido correctamente.');
  });
});

function editProyecto(id) {
  const p = AlventorData.getProjects().find(x => String(x.id) === String(id));
  if (!p) return;
  openModal('Editar Proyecto', proyectoFormHTML(p), () => {
    const data = readProyectoForm();
    if (!data) return;
    AlventorData.updateProject(id, data);
    closeModal();
    renderProyectosTable();
    showToast('Proyecto actualizado.');
  });
}

function deleteProyecto(id, title) {
  openConfirm(`¿Eliminar el proyecto "${title}"? Esta acción no se puede deshacer.`, () => {
    AlventorData.deleteProject(id);
    renderProyectosTable();
    showToast('Proyecto eliminado.', 'error');
  });
}

function moveProyecto(id, dir) {
  const list = AlventorData.getProjects();
  const i = list.findIndex(p => String(p.id) === String(id));
  const j = i + dir;
  if (j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  AlventorData.saveProjects(list);
  renderProyectosTable();
}

function readProyectoForm() {
  const title = document.getElementById('f-title')?.value.trim();
  const location = document.getElementById('f-location')?.value.trim();
  const desc = document.getElementById('f-desc')?.value.trim();
  const errEl = document.getElementById('form-error');

  if (!title || !location || !desc) {
    errEl?.classList.remove('hidden');
    return null;
  }
  errEl?.classList.add('hidden');

  const tagsRaw = document.getElementById('f-tags')?.value || '';
  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
  const type  = document.getElementById('f-type')?.value || 'EPC';
  const badge = document.getElementById('f-badge')?.value.trim() || type;

  return {
    title,
    location,
    description: desc,
    sector: document.getElementById('f-sector')?.value || 'infraestructuras',
    status: document.getElementById('f-status')?.value || 'activo',
    type,
    badge,
    year: document.getElementById('f-year')?.value.trim() || '',
    value: document.getElementById('f-value')?.value.trim() || '',
    image: document.getElementById('f-img')?.value.trim() || '',
    tags,
  };
}

// ─── NOTICIAS TABLE ──────────────────────────────

function renderNoticiasTable() {
  const items = AlventorData.getNews();
  const tbody = document.getElementById('noticias-tbody');
  const count = document.getElementById('noticias-count');
  count.textContent = `${items.length} noticia${items.length !== 1 ? 's' : ''}`;

  if (!items.length) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center py-12 text-slate-400 text-sm">No hay noticias. Añada la primera.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map((n, idx) => `
    <tr class="border-b border-[#e4e2e4] last:border-0 transition-colors">
      <td class="px-3 py-4 w-10">
        <div class="flex flex-col gap-0.5">
          <button onclick="moveNoticia('${n.id}', -1)" ${idx === 0 ? 'disabled' : ''}
            class="text-[#7587a7] hover:text-[#0b1f3a] disabled:opacity-20 disabled:cursor-default transition-colors leading-none">
            <span class="material-symbols-outlined text-base">arrow_drop_up</span>
          </button>
          <button onclick="moveNoticia('${n.id}', 1)" ${idx === items.length - 1 ? 'disabled' : ''}
            class="text-[#7587a7] hover:text-[#0b1f3a] disabled:opacity-20 disabled:cursor-default transition-colors leading-none">
            <span class="material-symbols-outlined text-base">arrow_drop_down</span>
          </button>
        </div>
      </td>
      <td class="px-5 py-4">
        <div class="font-semibold text-[#0b1f3a] text-sm leading-tight">${esc(n.title)}</div>
        <div class="text-xs text-[#75777e] mt-0.5 line-clamp-1">${esc(n.excerpt || '')}</div>
      </td>
      <td class="px-5 py-4 hidden md:table-cell">
        <span class="text-[10px] font-bold uppercase tracking-widest text-[#44474d]">${CAT_LABELS[n.category] || n.category}</span>
      </td>
      <td class="px-5 py-4 hidden lg:table-cell text-sm text-[#44474d]">${fmtDateAdmin(n.date)}</td>
      <td class="px-5 py-4 text-right whitespace-nowrap">
        <button onclick="editNoticia('${n.id}')"
          class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#30628d] hover:text-[#0b1f3a] transition-colors mr-3">
          <span class="material-symbols-outlined text-sm">edit</span> Editar
        </button>
        <button onclick="deleteNoticia('${n.id}', '${esc(n.title)}')"
          class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">
          <span class="material-symbols-outlined text-sm">delete</span> Borrar
        </button>
      </td>
    </tr>
  `).join('');
}

function fmtDateAdmin(str) {
  if (!str) return '—';
  try {
    return new Date(str).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return str; }
}

// ─── NOTICIA MODAL FORM ──────────────────────────

function noticiaFormHTML(n = {}) {
  const today = new Date().toISOString().split('T')[0];
  return `
    <div class="space-y-5">
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Título *</label>
        <input id="n-title" type="text" value="${esc(n.title || '')}" required placeholder="Titular de la noticia"
          class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Categoría *</label>
          <select id="n-cat"
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors appearance-none">
            ${Object.entries(CAT_LABELS).map(([v, l]) =>
              `<option value="${v}" ${n.category === v ? 'selected' : ''}>${l}</option>`
            ).join('')}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Fecha *</label>
          <input id="n-date" type="date" value="${esc(n.date || today)}" required
            class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Extracto *</label>
        <textarea id="n-excerpt" rows="2" required placeholder="Resumen breve de la noticia (1-2 frases)..."
          class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors resize-none">${esc(n.excerpt || '')}</textarea>
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Cuerpo de la noticia</label>
        <textarea id="n-body" rows="5" placeholder="Texto completo de la noticia..."
          class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors resize-none">${esc(n.body || '')}</textarea>
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">URL de Imagen</label>
        <input id="n-img" type="url" value="${esc(n.image || '')}" placeholder="https://..."
          class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-widest text-[#75777e] mb-2">Proyecto relacionado (opcional)</label>
        <input id="n-proj" type="text" value="${esc(n.project || '')}" placeholder="Nombre del proyecto"
          class="w-full border border-[#c4c6ce] px-4 py-3 text-sm focus:outline-none focus:border-[#0b1f3a] transition-colors">
      </div>
      <p id="form-error" class="hidden text-xs text-red-600 font-medium">Por favor complete todos los campos obligatorios (*).</p>
    </div>
  `;
}

document.getElementById('add-noticia-btn').addEventListener('click', () => {
  openModal('Nueva Noticia', noticiaFormHTML(), () => {
    const data = readNoticiaForm();
    if (!data) return;
    AlventorData.addNewsItem(data);
    closeModal();
    renderNoticiasTable();
    showToast('Noticia añadida correctamente.');
  });
});

function editNoticia(id) {
  const n = AlventorData.getNews().find(x => String(x.id) === String(id));
  if (!n) return;
  openModal('Editar Noticia', noticiaFormHTML(n), () => {
    const data = readNoticiaForm();
    if (!data) return;
    AlventorData.updateNewsItem(id, data);
    closeModal();
    renderNoticiasTable();
    showToast('Noticia actualizada.');
  });
}

function deleteNoticia(id, title) {
  openConfirm(`¿Eliminar la noticia "${title}"? Esta acción no se puede deshacer.`, () => {
    AlventorData.deleteNewsItem(id);
    renderNoticiasTable();
    showToast('Noticia eliminada.', 'error');
  });
}

function moveNoticia(id, dir) {
  const list = AlventorData.getNews();
  const i = list.findIndex(n => String(n.id) === String(id));
  const j = i + dir;
  if (j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  AlventorData.saveNews(list);
  renderNoticiasTable();
}

function readNoticiaForm() {
  const title   = document.getElementById('n-title')?.value.trim();
  const excerpt = document.getElementById('n-excerpt')?.value.trim();
  const date    = document.getElementById('n-date')?.value;
  const errEl   = document.getElementById('form-error');

  if (!title || !excerpt || !date) {
    errEl?.classList.remove('hidden');
    return null;
  }
  errEl?.classList.add('hidden');

  return {
    title,
    excerpt,
    date,
    category: document.getElementById('n-cat')?.value || 'adjudicacion',
    body:     document.getElementById('n-body')?.value.trim() || '',
    image:    document.getElementById('n-img')?.value.trim() || '',
    project:  document.getElementById('n-proj')?.value.trim() || '',
  };
}

// ─── Reset data ──────────────────────────────────

document.getElementById('reset-btn').addEventListener('click', () => {
  openConfirm('¿Restaurar todos los datos a los valores por defecto? Se perderán los cambios realizados.', () => {
    AlventorData.resetToDefaults();
    const active = document.querySelector('.tab-pane.active');
    if (active?.id === 'tab-proyectos') renderProyectosTable();
    if (active?.id === 'tab-noticias') renderNoticiasTable();
    showToast('Datos restaurados a valores por defecto.');
  });
});

// ─── Escape util ─────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Init ────────────────────────────────────────

checkSession();
