/* ----------------------------------------------------------------- - */
/*  Graphics report – HTML snippet                                   */
/*  ▸ is injected into currentTask.description when a task is created via board.js */
/*    if the board has been recognized as a graphics report.    */
/* ------------------------------------------------------------------ */
(function () {

    /* ---------- help selects ------------------------------------ */
    const yesNoSelect = `
        <select class="rapport_select">
            <option value="" selected>-</option>
            <option>Ja</option>
            <option>Nein</option>
        </select>`;

    const goodBadSelect = `
        <select class="rapport_select">
            <option value="" selected>-</option>
            <option>Gut</option>
            <option>Schlecht</option>
        </select>`;

    const deliverySelect = `
        <select class="rapport_select">
            <option value="" selected>-</option>
            <option>vollst. / pünktlich</option>
            <option>vollst. / spät</option>
            <option>unvollst. / pünktlich</option>
            <option>unvollst. / spät</option>
        </select>`;

    const designerSelect = `
        <select class="rapport_select">
            <option value="" selected>-</option>
            <option>Leo Rullani</option>
            <option>Mike Gsteiger</option>
            <option>Robine Appenzeller</option>
            <option>Ophelia Maier</option>
        </select>`;

    /* ------------------------------------------------------------------ */
    /*  Haupt‑HTML                                                       */
    /* ------------------------------------------------------------------ */
    const GRAPHICS_RAPPORT_FORM_HTML = /*html*/`
<table class="rapport_tbl">
  <thead>
    <tr><th colspan="3"><h2>GFX‑RAPPORT</h2></th></tr>
  </thead>
  <tbody>
    <!-- Grunddaten -------------------------------------------------- -->
    <tr><td>Spiel</td>
        <td contenteditable="true" data-placeholder="WIN – YB"></td></tr>

    <tr><td>Datum</td>
        <td style="display:flex;align-items:center;gap:6px">
            <!-- ► gelbes Icon + Click öffnet Date‑Picker                -->
            <img src="../../assets/icons/calendar_month.svg"
                 alt="Kalender"
                 style="height:20px;width:20px;cursor:pointer"
                 onclick="this.nextElementSibling.showPicker()">
            <!-- ► native Icon wird via CSS ausgeblendet                -->
            <input type="date"
                   class="rapport_date_input"
                   style="flex:1">
        </td>
    </tr>

    <tr><td>Grafiker/in</td><td>${designerSelect}</td></tr>

    <tr><td>Regie</td>
        <td>
          <select class="rapport_select">
            <option value="" selected>-</option>
            <option>A</option>
            <option>B</option>
          </select>
        </td></tr>

    <!-- 1. Kommunikation -------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">1.&nbsp;Kommunikation</th></tr>
    <tr><td>AL</td><td>${goodBadSelect}</td></tr>
    <tr><td>VAR / 4.OS</td><td>${goodBadSelect}</td></tr>
    <tr><td>MCR / Tech.</td><td>${goodBadSelect}</td></tr>
    <tr><td>Regie</td><td>${goodBadSelect}</td></tr>

    <!-- 2. Infos vor Kickoff ---------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">2.&nbsp;Infos vor Kickoff</th></tr>
    <tr><td>Opta‑Daten</td><td>${deliverySelect}</td></tr>
    <tr><td>Matchblatt</td><td>${deliverySelect}</td></tr>
    <tr><td>Form./Taktik</td><td>${deliverySelect}</td></tr>

    <!-- 3. Vortest --------------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">3.&nbsp;Grafik‑Vortest</th></tr>
    <tr><td>Grafiktest OK?</td><td>${yesNoSelect}</td></tr>

    <!-- 4. Matchgrafiken -------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">4.&nbsp;Matchgrafiken</th></tr>
    <tr>
      <td><img class="icon-goal" src="../../assets/icons/soccerball2.png" alt=""> Tore H</td>
      <td contenteditable="true" data-placeholder="#16 1:1"></td>
    </tr>
    <tr>
      <td><img class="icon-yc" src="../../assets/icons/yellow-card.png" alt=""> Gelb H</td>
      <td contenteditable="true" data-placeholder="-"></td>
    </tr>
    <tr>
      <td><img class="icon-rc" src="../../assets/icons/red-card.png" alt=""> Rot H</td>
      <td contenteditable="true" data-placeholder="-"></td>
    </tr>
    <tr>
      <td><img class="icon-goal" src="../../assets/icons/soccerball2.png" alt=""> Tore G</td>
      <td contenteditable="true" data-placeholder="#6 0:1"></td>
    </tr>
    <tr>
      <td><img class="icon-yc" src="../../assets/icons/yellow-card.png" alt=""> Gelb G</td>
      <td contenteditable="true" data-placeholder="-"></td>
    </tr>
    <tr>
      <td><img class="icon-rc" src="../../assets/icons/red-card.png" alt=""> Rot G</td>
      <td contenteditable="true" data-placeholder="-"></td>
    </tr>

    <!-- 5. PlayerPics ----------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">5.&nbsp;PlayerPics</th></tr>
    <tr><td>Heim vollständig?</td><td>${yesNoSelect}</td></tr>
    <tr><td>Gast vollständig?</td><td>${yesNoSelect}</td></tr>

    <!-- 6. Probleme -------------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">6.&nbsp;Probleme</th></tr>
    <tr><td colspan="2">
        <textarea class="rapport_textarea"
                  placeholder="Details und sonstige Auffälligkeiten…"
                  style="width:100%;min-height:80px;"></textarea>
    </td></tr>

    <!-- 7. Diskrepanzen --------------------------------------------- -->
    <tr class="rapport_section"><th colspan="2">7.&nbsp;Aufstellungs‑Diskrepanzen</th></tr>
    <tr><td>Abweichungen?</td><td>${yesNoSelect}</td></tr>
    <tr><td colspan="2">
        <textarea class="rapport_textarea"
                  placeholder="sfl.ch 4‑3‑3; Blue on‑air 4‑4‑2"
                  style="width:100%;min-height:60px;"></textarea>
    </td></tr>
  </tbody>
</table>`;

    /* -------------------------------------------------------------- */
    /*  global provision                           */
    /* -------------------------------------------------------------- */
    if (typeof window !== 'undefined') {
        window.GRAPHICS_RAPPORT_FORM_HTML = GRAPHICS_RAPPORT_FORM_HTML;
    }
})();

/* ------------------------------------------------------------------
   Graphics board – Extras: Button "Kits" + Overlays (Grid → Team)
   Paste below the existing IIFE in board_template_graphics.js
------------------------------------------------------------------ */
(function () {
  const PAIRS_KEY = 'bbm.kitPairs.v2'; // neue Version wegen Font-Feldern
  const ICON_BASE = '../../assets/icons/';
  const LEAGUE_LOGO = ICON_BASE + 'brack_super_league.svg.png';

  const CLUBS = [
    { id: 'fcb',      name: 'FC Basel 1893',            file: 'fcb.png' },
    { id: 'fcluzern', name: 'FC Luzern',                file: 'fcluzern.svg.png' },
    { id: 'gcz',      name: 'Grasshopper Club Zürich',  file: 'gcz.png' },
    { id: 'ls',       name: 'FC Lausanne‑Sport',        file: 'ls.png' },
    { id: 'fclugano', name: 'FC Lugano',                file: 'fclugano.svg.png' },
    { id: 'sfc',      name: 'Servette FC',              file: 'sfc.png' },
    { id: 'fcwin',    name: 'FC Winterthur',            file: 'fcwin.svg.png' },
    { id: 'fcz',      name: 'FC Zürich',                file: 'fcz.png' },
    { id: 'fcsg',     name: 'FC St. Gallen 1879',       file: 'fcsg.svg.png' },
    { id: 'fcthun',   name: 'FC Thun',                  file: 'fcthun.svg' },
    { id: 'fcsion',   name: 'FC Sion',                  file: 'fcsion.svg' },
    { id: 'yb',       name: 'BSC Young Boys',           file: 'yb.svg.png' },
  ];

  // Offizielle Vereinsfarben (1:1 aus deiner Liste, Primärfarbe)
  const CLUB_COLORS = {
    fcb:      '#ff0000', // FC Basel 1893
    fcluzern: '#1e467d', // FC Luzern
    gcz:      '#005791', // Grasshopper Club Zürich
    ls:       '#00248b', // FC Lausanne-Sport
    fclugano: '#000000', // FC Lugano
    sfc:      '#66202f', // Servette FC
    fcwin:    '#d21217', // FC Winterthur
    fcz:      '#002855', // FC Zürich
    fcsg:     '#007c3e', // FC St. Gallen 1879
    fcthun:   '#ed272d', // FC Thun
    fcsion:   '#ed2424', // FC Sion
    yb:       '#ffdd00', // BSC Young Boys
  };

  // Klubfarben für Hover im Grid (identisch zur Vereinsfarbe)
  const HOVER_COLORS = { ...CLUB_COLORS };

  /* ========== Styles ========== */
  function injectKitsStyle() {
    if (document.getElementById('gfx-kits-style')) return;
    const css = `
      /* Overlay */
      #gfx-kits-overlay{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.55);}
      #gfx-kits-overlay.show{display:flex;}
      .gfx-kits-sheet{width:min(1080px,92vw);max-height:90vh;overflow:auto;background:#0f1525;color:#e5e7eb;border-radius:12px;box-shadow:0 18px 64px rgba(0,0,0,.55);padding:18px 18px 22px;}
      .gfx-kits-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
      .gfx-kits-head img{height:32px}
      .gfx-kits-title{font-size:18px;font-weight:700;color:var(--font_sec_color)}
      .gfx-kits-close{margin-left:auto;border:0;background:#1f2937;color:#e5e7eb;border-radius:8px;padding:6px 10px;cursor:pointer}

      /* Grid mit 12 Vereinen */
      .gfx-kits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
      .gfx-kits-tile{background:#0b1020;border:1px solid #1f2a44;border-radius:10px;padding:14px;text-align:center;display:grid;gap:8px;cursor:pointer;
                     transition:transform .15s ease, background-color .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease}
      .gfx-kits-crest{height:64px;width:64px;object-fit:contain;display:block;margin:0 auto;transition:transform .15s ease, filter .15s ease}
      .gfx-kits-name{font-size:13px;opacity:.9}

      .gfx-kits-tile:hover{transform:translateY(-2px) scale(1.02); background:var(--hover-bg, #101a33); color:var(--hover-fg, #e5e7eb); border-color:rgba(255,255,255,.25);
                           box-shadow:0 10px 28px rgba(0,0,0,.35)}
      .gfx-kits-tile:hover .gfx-kits-crest{transform:scale(1.12); filter:drop-shadow(0 6px 10px rgba(0,0,0,.35))}

      /* Team-Ansicht (Tabelle) */
      .gfx-kits-table{width:100%;border-collapse:collapse}
      .gfx-kits-table th,.gfx-kits-table td{border:1px solid #233152;padding:8px 10px;text-align:left;font-size:13px}
      .gfx-kits-table th{background:#111a2f}
      .gfx-kits-hex{width:120px;text-align:center;font-family:monospace;border:1px solid #2b3852;border-radius:6px;padding:6px;background:#0a0f1e;color:#e5e7eb}
      .gfx-kits-font{width:92px;text-align:center;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;border:1px solid #2b3852;border-radius:20px;
                     padding:6px 10px;cursor:pointer;background:#111a2f;color:#e5e7eb;transition:transform .12s ease, filter .12s ease, background-color .12s ease, color .12s ease}
      .gfx-kits-font:hover{transform:translateY(-1px); filter:brightness(1.05)}
      .gfx-kits-teamhead{display:flex;align-items:center;gap:10px;margin:4px 0 10px}
      .gfx-kits-teamhead img{height:28px;width:28px;object-fit:contain}
      .gfx-kits-back{margin-left:auto;border:0;background:#1f2937;color:#e5e7eb;border-radius:8px;padding:6px 10px;cursor:pointer}

      @media (max-width:900px){.gfx-kits-grid{grid-template-columns:repeat(2,1fr)}}
      @media (max-width:560px){.gfx-kits-grid{grid-template-columns:1fr}}
    `;
    const tag = document.createElement('style');
    tag.id = 'gfx-kits-style';
    tag.textContent = css;
    document.head.appendChild(tag);
  }

  /* ========== Storage Helpers (Home|Away + Font) ========== */
  function loadPairs() {
    try { return JSON.parse(localStorage.getItem(PAIRS_KEY)) || {}; }
    catch { return {}; }
  }
  function savePairs(obj) { localStorage.setItem(PAIRS_KEY, JSON.stringify(obj)); }
  function pairKey(homeId, awayId) { return `${homeId}|${awayId}`; }

  /* ========== Overlay Grundgerüst ========== */
  function ensureOverlay() {
    injectKitsStyle();
    let ov = document.getElementById('gfx-kits-overlay');
    if (ov) return ov;
    ov = document.createElement('div');
    ov.id = 'gfx-kits-overlay';
    ov.innerHTML = `
      <div class="gfx-kits-sheet" role="dialog" aria-modal="true" aria-label="Kits">
        <div class="gfx-kits-head">
          <img src="${LEAGUE_LOGO}" alt="Brack Super League">
          <div class="gfx-kits-title">Trikotübersicht Brack Super League</div>
          <button class="gfx-kits-close" type="button" aria-label="Close">✕</button>
        </div>
        <div id="gfx-kits-body"></div>
      </div>`;
    document.body.appendChild(ov);

    // Close actions
    ov.querySelector('.gfx-kits-close').addEventListener('click', closeOverlay);
    // Outside click schließt Overlay
    ov.addEventListener('mousedown', (e) => { if (e.target === ov) closeOverlay(); });
    // ESC schließt Overlay
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ov.classList.contains('show')) closeOverlay(); });
    return ov;
  }
  function openOverlay()  { ensureOverlay().classList.add('show'); }
  function closeOverlay() { const ov = document.getElementById('gfx-kits-overlay'); if (ov) ov.classList.remove('show'); }

  /* ========== Utilities: Farben & Font‑Pill ========== */
  function normalizeHex(v) {
    if (!v) return '';
    let s = v.trim().replace(/^#/,'');
    if (/^[0-9a-f]{3}$/i.test(s)) s = s.split('').map(ch=>ch+ch).join('');
    if (!/^[0-9a-f]{6}$/i.test(s)) return '';
    return '#'+s.toLowerCase();
  }
  function bestTextColor(hex) {
    if (!hex) return '#e5e7eb';
    const h = hex.replace('#','');
    const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
    const toLin = v => (v<=10) ? v/3294 : Math.pow((v/255 + 0.055)/1.055, 2.4);
    const L = 0.2126*toLin(r) + 0.7152*toLin(g) + 0.0722*toLin(b);
    const white = 1.05/(L+0.05), black = (L+0.05)/0.05;
    return white>black ? '#FFFFFF' : '#000000';
  }
  function inverse(hex) { return hex === '#000000' ? '#FFFFFF' : '#000000'; }

  function setFontPill(pill, hexColor, manual=false) {
    const val = (hexColor || '#FFFFFF').toUpperCase();
    pill.dataset.val = val;
    pill.dataset.manual = manual ? '1' : '0';
    pill.textContent = (val === '#000000') ? 'Black' : 'White';
    pill.style.background = val;
    pill.style.color = inverse(val);
  }
  function toggleFontPill(pill) {
    const next = (pill.dataset.val === '#000000') ? '#FFFFFF' : '#000000';
    setFontPill(pill, next, true);
    persistRowValue(pill.closest('tr'));
  }
  function applyInputPreview(input, relatedPill) {
    const hex = normalizeHex(input.value);
    if (!hex) { input.style.background=''; input.style.color=''; return; }
    input.style.background = hex;
    input.style.color = bestTextColor(hex);
    // Auto‑Empfehlung nur, wenn Nutzer noch nicht manuell gesetzt hat
    if (relatedPill && relatedPill.dataset.manual !== '1') {
      const rec = bestTextColor(hex);
      setFontPill(relatedPill, rec, false);
    }
  }

  /* ========== Grid (12 Logos) mit farbigem Hover ========== */
  function showGrid() {
    const body = ensureOverlay().querySelector('#gfx-kits-body');
    body.innerHTML = `<div class="gfx-kits-grid"></div>`;
    const grid = body.firstElementChild;

    CLUBS.forEach(c => {
      const tile = document.createElement('div');
      tile.className = 'gfx-kits-tile';
      const bg = HOVER_COLORS[c.id];
      if (bg) {
        const fg = bestTextColor(normalizeHex(bg));
        tile.style.setProperty('--hover-bg', bg);
        tile.style.setProperty('--hover-fg', fg);
      }
      tile.setAttribute('data-club', c.id);
      tile.innerHTML = `
        <img class="gfx-kits-crest" src="${ICON_BASE + c.file}" alt="${c.name}">
        <div class="gfx-kits-name">${c.name}</div>`;
      tile.addEventListener('click', () => showTeam(c.id));
      grid.appendChild(tile);
    });
    openOverlay();
  }

  /* ========== Team‑Ansicht (Home vs. alle anderen) ========== */
  function showTeam(homeId) {
    const body = ensureOverlay().querySelector('#gfx-kits-body');
    const homeClub = CLUBS.find(c => c.id === homeId);
    const pairs = loadPairs();

    body.innerHTML = `
      <div class="gfx-kits-teamhead">
        <img src="${ICON_BASE + homeClub.file}" alt="${homeClub.name}">
        <strong>${homeClub.name}</strong>
        <button class="gfx-kits-back" type="button">Zurück</button>
      </div>
      <table class="gfx-kits-table">
        <thead>
          <tr>
            <th style="width:27%">Home Club</th>
            <th style="width:13%">Shirt</th>
            <th style="width:10%">Font</th>
            <th style="width:27%">Away Club</th>
            <th style="width:13%">Shirt</th>
            <th style="width:10%">Font</th>
          </tr>
        </thead>
        <tbody id="gfx-kits-rows"></tbody>
      </table>
    `;
    body.querySelector('.gfx-kits-back').addEventListener('click', showGrid);

    const tbody = body.querySelector('#gfx-kits-rows');

    CLUBS.filter(c => c.id !== homeId).forEach(awayClub => {
      const key = pairKey(homeId, awayClub.id);
      const val = pairs[key] || {};
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${homeClub.name}</td>
        <td><input class="gfx-kits-hex" data-home="${homeId}" data-away="${awayClub.id}" data-side="home" placeholder="#000000" value="${val.home || ''}"></td>
        <td><button class="gfx-kits-font" data-home="${homeId}" data-away="${awayClub.id}" data-side="home">Font</button></td>
        <td>${awayClub.name}</td>
        <td><input class="gfx-kits-hex" data-home="${homeId}" data-away="${awayClub.id}" data-side="away" placeholder="#FFFFFF" value="${val.away || ''}"></td>
        <td><button class="gfx-kits-font" data-home="${homeId}" data-away="${awayClub.id}" data-side="away">Font</button></td>
      `;
      tbody.appendChild(tr);

      // Elemente referenzieren
      const homeInput = tr.querySelector('input.gfx-kits-hex[data-side="home"]');
      const awayInput = tr.querySelector('input.gfx-kits-hex[data-side="away"]');
      const homePill  = tr.querySelector('button.gfx-kits-font[data-side="home"]');
      const awayPill  = tr.querySelector('button.gfx-kits-font[data-side="away"]');

      // ===== NEU: Club-Zellen einfärben (fixe Vereinsfarben) =====
      const homeCell = tr.children[0];
      const awayCell = tr.children[3];
      const homeClubColor = CLUB_COLORS[homeId] || '#0b1020';
      const awayClubColor = CLUB_COLORS[awayClub.id] || '#0b1020';
      homeCell.style.background = homeClubColor;
      homeCell.style.color = (homeId === 'yb') ? '#000000' : '#FFFFFF';
      homeCell.style.fontWeight = '600';
      awayCell.style.background = awayClubColor;
      awayCell.style.color = (awayClub.id === 'yb') ? '#000000' : '#FFFFFF';
      awayCell.style.fontWeight = '600';

      // ===== Schriftfarbe-Regel: immer Weiß, außer YB = Schwarz =====
      setFontPill(homePill, (homeId === 'yb') ? '#000000' : '#FFFFFF', true);       // true = fix, nicht auto überschreiben
      setFontPill(awayPill, (awayClub.id === 'yb') ? '#000000' : '#FFFFFF', true);

      // Shirt-Preview beibehalten
      applyInputPreview(homeInput, homePill);
      applyInputPreview(awayInput, awayPill);

      // Toggle Font auf Klick (optional)
      homePill.addEventListener('click', () => { toggleFontPill(homePill); });
      awayPill.addEventListener('click', () => { toggleFontPill(awayPill); });
    });

    // Live‑Preview & Persist
    tbody.addEventListener('input', (e) => {
      if (!e.target.classList.contains('gfx-kits-hex')) return;
      const pill = e.target.closest('tr').querySelector(`.gfx-kits-font[data-side="${e.target.dataset.side}"]`);
      applyInputPreview(e.target, pill);
    });

    tbody.addEventListener('blur', (e) => {
      if (!e.target.classList.contains('gfx-kits-hex')) return;
      const tr = e.target.closest('tr');
      persistRowValue(tr);
    }, true);

    openOverlay();
  }

  function persistRowValue(tr) {
    const h = tr.querySelector('.gfx-kits-hex[data-side="home"]');
    const a = tr.querySelector('.gfx-kits-hex[data-side="away"]');
    const hp = tr.querySelector('.gfx-kits-font[data-side="home"]');
    const ap = tr.querySelector('.gfx-kits-font[data-side="away"]');

    const homeId = h.dataset.home, awayId = h.dataset.away;
    const key = pairKey(homeId, awayId);
    const state = loadPairs();
    state[key] = {
      home: normalizeHex(h.value) || '',
      away: normalizeHex(a.value) || '',
      homeFont: hp.dataset.val || '',
      awayFont: ap.dataset.val || '',
      homeFontManual: hp.dataset.manual === '1',
      awayFontManual: ap.dataset.manual === '1'
    };
    savePairs(state);
  }

  /* ========== Button neben "GFX‑Manual" einfügen (nur Board "graphics") ========== */
function attachKitsButton() {
  // Verhindert Doppel-Injektion
  if (document.querySelector('.gfx-kits-btn')) return;

  // Sichtbar nur im Board "graphics": nur wenn der GFX‑Manual‑Button existiert
  const manualBtn = Array.from(document.querySelectorAll('button,a'))
    .find(el => /gfx.?manual/i.test((el.textContent || '').trim()));

  if (!manualBtn) return; // nicht im Graphics-Board → nichts einfügen

  // Kits-Button direkt neben den GFX‑Manual‑Button setzen, Styling übernehmen
  const kitsBtn = document.createElement(manualBtn.tagName === 'A' ? 'a' : 'button');
  if (manualBtn.tagName !== 'A') kitsBtn.type = 'button';
  kitsBtn.textContent = 'Kits';
  if (manualBtn.className) kitsBtn.className = manualBtn.className + ' gfx-kits-btn';
  kitsBtn.addEventListener('click', showGrid);

  manualBtn.insertAdjacentElement('afterend', kitsBtn);
}

  document.addEventListener('DOMContentLoaded', attachKitsButton);

  // Optional expose
  if (typeof window !== 'undefined') {
    window.showGfxKitsGrid = showGrid;
    window.showGfxKitsTeam = showTeam;
  }
})();
