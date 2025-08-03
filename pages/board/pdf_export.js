/* ---- pdf_export.js (logos entfernt) ---- */

export async function downloadDebriefingPdf() {
    if (!window.currentBoard) { alert('Board data missing'); return; }
    if (!window.html2pdf)      await loadHtml2Pdf();

    // 1) Template bauen
    const pdfHtml = buildPdfTemplate(window.currentBoard);

    // 2) Unsichtbaren Container einfügen
    const holder = document.createElement('div');
    holder.style.cssText = `
        position:fixed; top:0; left:0; width:210mm;
        background:#fff; z-index:-1; pointer-events:none;
    `;
    holder.innerHTML = pdfHtml;
    document.body.appendChild(holder);

    // 3) PDF erzeugen
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

    // 4) Aufräumen
    document.body.removeChild(holder);
}

/* ---------- Helper ---------- */

async function loadHtml2Pdf() {
    return new Promise(res => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        s.onload = res;
        document.head.appendChild(s);
    });
}

/** Erzeugt druckfertiges HTML – ohne Logos */
function buildPdfTemplate(board) {
    const today = new Date().toLocaleDateString('de-CH');

    return `
      <style>
        body{font-family:Arial,Helvetica,sans-serif;font-size:10pt}
        h1{margin:0 0 6mm 0;font-size:18pt}
        h2{margin:4mm 0 2mm 0;font-size:14pt}
        table{width:100%;border-collapse:collapse;margin-bottom:4mm}
        th,td{border:0.1mm solid #888;padding:2mm;text-align:left}
        th{background:#eee}
      </style>

      <header style="text-align:center;margin-bottom:6mm">
          <h1>${board.title}</h1>
          <p>${today}</p>
      </header>

      ${['to-do','in-progress','review','done']
        .map(st => renderStatusTable(st, board.tasks.filter(t => t.status === st)))
        .join('')}
    `;
}

/** Baut eine Tabelle je Status */
function renderStatusTable(status, tasks) {
    if (!tasks.length) return '';
    const rows = tasks.map(t => `
        <tr>
            <td>${t.title}</td>
            <td>${t.assignee?.fullname ?? '—'}</td>
            <td>${t.reviewer?.fullname ?? '—'}</td>
            <td>${t.priority}</td>
            <td>${t.due_date ?? '—'}</td>
        </tr>`).join('');
    return `
      <h2>${status.replace('-', ' ').toUpperCase()}</h2>
      <table>
        <thead>
          <tr><th>Task</th><th>Assignee</th><th>Reviewer</th><th>Prio</th><th>Due</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
}