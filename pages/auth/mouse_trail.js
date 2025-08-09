/**
 * mouse_trail.js
 * Zeigt einen 5‑Bild‑Mouse‑Trail nur bei Viewport > 1400px.
 * - Injiziert Bilder in #xy (eine .trail-wrapper mit 5 <img>)
 * - Animiert via mousemove + idle fade-out
 * - Permanent deaktiviert bei Fokus in Login-/Signup-Feldern
 * - Schaltet bei Resize automatisch um
 */

(() => {
  const THRESHOLD = 1400;                        // sichtbar NUR bei > 1400px
  const IMG_PATH = '../../assets/icons/';
  const files = [
    'soccerfan.jpg',
    'icehockey.jpg',
    'music.jpg',
    'schwingen.jpg',
    'onair.jpg'   // immer letztes Bild
  ];

  let root = null;
  let active = false;
  let killed = false;
  let idleTimer = null;
  let moveHandler = null;

  /** true wenn Viewport strikt größer als 1400px ist */
  const isWide = () => window.matchMedia(`(min-width: ${THRESHOLD + 1}px)`).matches;

  /**
   * Injiziert die .trail-wrapper in #xy (falls noch nicht vorhanden).
   * @returns {HTMLElement|null} der #xy-Root, wenn injiziert; sonst null
   */
  function buildTrail() {
    root = document.getElementById('xy');
    if (!root) return null;

    // Wrapper nur erzeugen, wenn er fehlt
    let wrapper = root.querySelector('.trail-wrapper');
    if (!wrapper) {
      root.innerHTML =
        '<div class="trail-wrapper">' +
        files.map((f, i) => `<img src="${IMG_PATH}${f}" alt="trail-${i}">`).join('') +
        '</div>';
      wrapper = root.querySelector('.trail-wrapper');
    }
    return root;
  }

  /** Entfernt nur unseren Wrapper (lässt anderes #xy‑Markup unberührt, falls vorhanden) */
  function destroyTrail() {
    if (!root) return;
    const wrapper = root.querySelector('.trail-wrapper');
    if (wrapper) wrapper.remove();
    root.classList.remove('idle');
  }

  /** Hängt Mousemove/Idle‑Logik an (no‑op wenn schon aktiv) */
  function attachTrail() {
    if (!root || active) return;

    const imgs = root.querySelectorAll('.trail-wrapper img');
    if (!imgs.length) return;

    const coords = Array.from({ length: imgs.length }, () => ({ x: 0, y: 0 }));

    moveHandler = (e) => {
      // Idle‑Fade stoppen solange sich die Maus bewegt
      root.classList.remove('idle');
      clearTimeout(idleTimer);

      const smoothing = 0.8; // sanftes Nachziehen
      const last = coords[0] || { x: e.clientX, y: e.clientY };
      coords.unshift({
        x: last.x + (e.clientX - last.x) * smoothing,
        y: last.y + (e.clientY - last.y) * smoothing
      });
      coords.length = imgs.length;

      // jedes Bild bekommt eine ältere Koordinate → natürlicher Abstand
      coords.forEach((c, i) => {
        const horizontalSpread = 260; // je Bild 260px weiter rechts
        const x = c.x - 100 - i * horizontalSpread;
        const y = c.y - 100;
        imgs[i].style.transform = `translate(${x}px, ${y}px)`;
      });

      // Idle‑Fade nach 0.8 s
      idleTimer = setTimeout(() => root.classList.add('idle'), 800);
    };

    document.addEventListener('mousemove', moveHandler);
    active = true;

    // Permanent abschalten, sobald ein Login-/Sign‑up‑Feld Fokus bekommt
    const form = document.querySelector('#loginForm, #sign_up_form');
    if (form) form.addEventListener('focusin', kill, { once: true });
  }

  /** Entfernt Listener/Timer (DOM bleibt erhalten) */
  function detachTrail() {
    if (!active) return;
    if (moveHandler) {
      document.removeEventListener('mousemove', moveHandler);
      moveHandler = null;
    }
    clearTimeout(idleTimer);
    idleTimer = null;
    active = false;
  }

  /** Permanent deaktivieren (auch bei Resize nicht mehr aktivieren) */
  function kill() {
    if (killed) return;
    killed = true;
    window.removeEventListener('resize', onResize);
    detachTrail();
    destroyTrail();
    if (root) root.style.display = 'none';
  }

  /** Aktiviert/Deaktiviert je nach Breite */
  function maybeActivate() {
    if (killed) return;

    // Root ggf. neu ermitteln (z. B. wenn DOM später kam)
    root = document.getElementById('xy');
    if (!root) return;

    if (isWide()) {
      buildTrail();   // injiziert bei Bedarf
      attachTrail();  // hängt Logik an, falls nicht aktiv
    } else {
      detachTrail();
      destroyTrail();
    }
  }

  function onResize() {
    maybeActivate();
  }

  function bootstrap() {
    maybeActivate();
    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();