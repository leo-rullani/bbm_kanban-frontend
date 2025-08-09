/* ---------- Task-PDF in neuem Tab/Print ---------- */

/**
 * Öffnet ein neues Tab mit dem Task-HTML + App-naher Optik.
 * Nutzer:innen wählen dann "Als PDF speichern".
 *
 * @param {string} taskHtml   – gespeichertes HTML der Taskbeschreibung
 * @param {string} baseTitle  – Dateiname/Überschrift (ohne Endung)
 * @param {Object} [opts]
 * @param {boolean} [opts.logo=true]         – BBM-Logo einblenden
 * @param {"top-left"|"top-right"|"bottom-left"|"bottom-right"} [opts.logoPos="top-left"]
 */
// --- REPLACE: exportDebriefingTaskPdf ---
export async function exportDebriefingTaskPdf(taskHtml, baseTitle = 'debriefing', opts = {}) {
    const options = { logo: true, logoPos: 'top-left', ...opts };

    // CSS-Variablen aus der App übernehmen
    const vars = readCssVars([
        '--bg-color','--bg-color-dark','--bg-color-light',
        '--font_white_color','--font-prime-color',
        '--btn-prime-color','--btn-prime-font-color',
        '--card-bg-color','--card-border-color'
    ]);

    // ▼ Neu: wir geben getPdfCss mit, ob ein Logo oben sitzt → für korrektes Padding
    const css = getPdfCss(vars, { logoPos: options.logoPos, hasLogo: !!options.logo });

    const titleText = baseTitle || 'debriefing';
    const fileBase  = sanitizeFilename(titleText) + '_' + new Date().toISOString().slice(0,10);

    const w = window.open('', '_blank');
    if (!w) { alert('Popup blocked – bitte Popups erlauben.'); return; }

    w.document.open();
    w.document.write(`<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(fileBase)}</title>
  <base href="${location.href}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>${css}</style>
</head>
<body>
  <header class="pdf-header">
    <h1 class="pdf-title">${escapeHtml(titleText)}</h1>
  </header>

  <main class="pdf-content">
    ${taskHtml || ''}
  </main>

  ${options.logo ? `<img class="pdf-logo ${options.logoPos}" src="../../assets/icons/bbm.png" alt="BBM Logo">` : ''}

  <script>
    window.addEventListener('load', () => setTimeout(() => window.print(), 50));
  </script>
</body>
</html>`);
    w.document.close();
}

/* ---------- Optional: Board-weiter PDF-Export (bestehend) ---------- */
export async function downloadDebriefingPdf() {
    if (!window.currentBoard) { alert('Board data missing'); return; }
    if (!window.html2pdf)      await loadHtml2Pdf();

    const pdfHtml = buildPdfTemplate(window.currentBoard);

    const holder = document.createElement('div');
    holder.style.cssText = `
        position:fixed; top:0; left:0; width:210mm;
        background:#fff; z-index:-1; pointer-events:none;
    `;
    holder.innerHTML = pdfHtml;
    document.body.appendChild(holder);

    await html2pdf().set({
        margin:10,
        filename:`debriefing_${new Date().toISOString().slice(0,10)}.pdf`,
        html2canvas:{
            scale:2,
            useCORS:true,
            imageTimeout:0,
            ignoreElements:el =>
                el.tagName==='IMG' && el.src.includes('download.svg')
        },
        jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' }
    }).from(holder).save();

    document.body.removeChild(holder);
}

/* ======================= Helpers ======================= */

function readCssVars(names){
    const cs = getComputedStyle(document.documentElement);
    const out = {};
    names.forEach(n => {
        out[n] = (cs.getPropertyValue(n) || '').trim();
    });
    // Fallbacks
    out['--bg-color']            ||= '#1C2739';
    out['--bg-color-dark']       ||= '#18202E';
    out['--bg-color-light']      ||= '#213049';
    out['--font_white_color']    ||= '#EDEDED';
    out['--font-prime-color']    ||= '#FFCC00';
    out['--btn-prime-color']     ||= '#FFCC00';
    out['--btn-prime-font-color']||= '#1C2739';
    out['--card-bg-color']       ||= '#213049';
    out['--card-border-color']   ||= '#2F4871';
    return out;
}

/**
 * HIER STYLST DU DAS PDF!
 * Passe diese Funktion an (Farben, Abstände, Tabellen, Logo-Größe usw.).
 */
// --- REPLACE: getPdfCss ---
// --- DROP‑IN REPLACEMENT ---
// --- REPLACE THIS FUNCTION IN pdf_export.js ---
function getPdfCss(vars, { logoPos = 'top-left', hasLogo = true } = {}) {
  // Position ermitteln
  const isTop    = hasLogo && /top/.test(logoPos);
  const isLeft   = hasLogo && /left/.test(logoPos);
  const isRight  = hasLogo && /right/.test(logoPos);
  const isBottom = hasLogo && /bottom/.test(logoPos);

  const posTop    = isTop    ? '10mm' : 'auto';
  const posBottom = isBottom ? '10mm' : 'auto';
  const posLeft   = isLeft   ? '12mm' : 'auto';
  const posRight  = isRight  ? '12mm' : 'auto';

  const logoSize      = '24mm';
  const extraGap      = '12mm';
  const defaultTopPad = '14mm';
  const headerPadTop  = isTop ? `calc(${posTop} + ${logoSize} + ${extraGap})` : defaultTopPad;

  return `
:root{
  --bg:${vars['--bg-color'] || '#1C2739'};
  --bg-dark:${vars['--bg-color-dark'] || '#18202E'};
  --bg-light:${vars['--bg-color-light'] || '#213049'};
  --text:${vars['--font_white_color'] || '#EDEDED'};
  --prime:${vars['--font-prime-color'] || '#FFCC00'};
  --btn:${vars['--btn-prime-color'] || '#FFCC00'};
  --btn-text:${vars['--btn-prime-font-color'] || '#1C2739'};
  --card:${vars['--card-bg-color'] || '#213049'};
  --border:${vars['--card-border-color'] || '#2F4871'};
}
*{box-sizing:border-box}
html,body{
  margin:0; padding:0;
  background:var(--bg);
  color:var(--text);
  font-family: Mulish, Arial, Helvetica, sans-serif;
  line-height:1.35; font-size:12pt;
}

/* Header & Content */
.pdf-header{display:flex;align-items:center;justify-content:space-between;padding:${headerPadTop} 14mm 0 14mm}
.pdf-title{margin:0;color:var(--prime);font-size:18pt}
.pdf-content{padding:8mm 14mm 14mm 14mm}

/* Tabellen */
table{width:100%;border-collapse:collapse;margin:6mm 0}
thead th{background:var(--bg-dark);color:var(--text)}
th,td{border:1px solid var(--border);padding:3mm;text-align:left;vertical-align:top}
tr:nth-child(even) td{background:rgba(255,255,255,0.02)}

/* ── BBM‑Logo: Screen = sticky (fixed), Print = statisch (absolute) ── */
.pdf-logo{
  width:${logoSize}; height:auto;
  opacity:.95;
  z-index:9999;
  pointer-events:none;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Auf Bildschirm: wirklich sticky */
@media screen{
  .pdf-logo{
    position: fixed !important;
    top:${posTop}; bottom:${posBottom};
    left:${posLeft}; right:${posRight};
  }
}

/* Beim Drucken/Print‑Preview: statisch auf Seite 1 */
@media print{
  .pdf-logo{
    position: absolute !important;
    top:${posTop}; bottom:${posBottom};
    left:${posLeft}; right:${posRight};
  }
}
`;
}

/* kleine Utils */
function sanitizeFilename(name){
    return (name || '')
        .replace(/[\\/:*?"<>|]+/g,'-')
        .replace(/\s+/g,'_')
        .slice(0,120);
}
function escapeHtml(s=''){
    return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* --- vorhandener Board-Export (Tabellen nach Status) --- */

function buildPdfTemplate(board) {
    const today = new Date().toLocaleDateString('de-CH');

    return `
      <style>
        body{font-family:Arial,Helvetica,sans-serif;font-size:10pt}
        h1{margin:0 0 6mm 0;font-size:18pt}
        h2{margin:4mm 0 2mm 0;font-size:14pt}
        table{width:100%;border-collapse:collapse;margin-bottom:4mm}
        th,td{border:0.2mm solid #888;padding:2mm;text-align:left}
        th{background:#eee}
      </style>

      <header style="text-align:center;margin-bottom:6mm">
          <h1>${escapeHtml(board.title)}</h1>
          <p>${today}</p>
      </header>

      ${['to-do','in-progress','review','done']
        .map(st => renderStatusTable(st, board.tasks.filter(t => t.status === st)))
        .join('')}
    `;
}

function renderStatusTable(status, tasks) {
    if (!tasks.length) return '';
    const rows = tasks.map(t => `
        <tr>
            <td>${escapeHtml(t.title || '')}</td>
            <td>${escapeHtml(t.assignee?.fullname ?? '—')}</td>
            <td>${escapeHtml(t.reviewer?.fullname ?? '—')}</td>
            <td>${escapeHtml(t.priority || '')}</td>
            <td>${escapeHtml(t.due_date ?? '—')}</td>
        </tr>`).join('');
    return `
      <h2>${escapeHtml(status.replace('-', ' ').toUpperCase())}</h2>
      <table>
        <thead>
          <tr><th>Task</th><th>Assignee</th><th>Reviewer</th><th>Prio</th><th>Due</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
}

async function loadHtml2Pdf() {
    return new Promise(res => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        s.onload = res;
        document.head.appendChild(s);
    });
}