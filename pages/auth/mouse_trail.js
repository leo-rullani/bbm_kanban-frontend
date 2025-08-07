/**
 * Injects the 5‑image trail into #xy and returns the wrapper root.
 * @returns {HTMLElement|null}
 */
function buildTrail() {
  const root = document.getElementById('xy');
  if (!root) return null;

  const IMG_PATH = '../../assets/icons/';
  const files = [
    'soccerfan.jpg',
    'icehockey.jpg',
    'music.jpg',
    'schwingen.jpg',
    'onair.jpg'   // immer letztes Bild
  ];

  root.innerHTML =
    '<div class="trail-wrapper">' +
    files
      .map((f, i) => `<img src="${IMG_PATH}${f}" alt="trail-${i}">`)
      .join('') +
    '</div>';

  return root;
}

/**
 * Handles movement, idle‑fade and deactivation on form focus.
 * @param {HTMLElement} root – element returned by buildTrail()
 */
function attachTrail(root) {
  const imgs = root.querySelectorAll('img');
  const coords = Array.from({ length: imgs.length }, () => ({ x: 0, y: 0 }));
  let idleTimer;

  /** Updates image positions on mousemove */
  const move = (e) => {
    // stop fade‑out while cursor moves
    root.classList.remove('idle');
    clearTimeout(idleTimer);

    const smoothing = 0.8;      // sanftes Nachziehen
    const last = coords[0] || { x: e.clientX, y: e.clientY };
    coords.unshift({
      x: last.x + (e.clientX - last.x) * smoothing,
      y: last.y + (e.clientY - last.y) * smoothing
    });
    coords.length = imgs.length;

    // jedes Bild bekommt seine (ältere) Koordinate → natürlicher Abstand
    coords.forEach((c, i) => {
  const horizontalSpread = 260; // je Bild 60px weiter rechts
  const x = c.x - 100 - i * horizontalSpread;
  const y = c.y - 100;
  imgs[i].style.transform = `translate(${x}px, ${y}px)`;
});



    // idle fade‑out nach 0.8 s
    idleTimer = setTimeout(() => root.classList.add('idle'), 800);
  };

  /** Removes the trail permanently once a login‑field gets focus */
  const kill = () => {
    document.removeEventListener('mousemove', move);
    clearTimeout(idleTimer);
    root.style.display = 'none';
  };

  document.addEventListener('mousemove', move);
  const form = document.querySelector('#loginForm, #sign_up_form');
  if (form) form.addEventListener('focusin', kill);
}

/* ─── Bootstrap ──────────────────────────────────────────────────────── */
(() => {
  const root = buildTrail();
  if (root) attachTrail(root);
})();
