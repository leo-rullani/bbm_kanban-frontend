/**
 * DEMO: statische Requests ohne Backend.
 * Start immer 15:00, End 20:00, Location fix "ROC Sissach".
 */

const DEFAULT_START = "15:00";
const DEFAULT_END   = "20:00";
const DEFAULT_LOCATION = "ROC Sissach";
const STORE_KEY = "bbm-requests-demo-status";

/** Vier Beispiel-Einsätze */
const sampleRequests = [
  {
    id: "r1",
    dateISO: "2025-09-05",                    // Friday
    function: "Graphics Operator",
    project: "SFL Matchday 6",
    start: DEFAULT_START,
    end: DEFAULT_END,
    location: DEFAULT_LOCATION,
    status: "accepted",                       // vorgewählt (grün)
    meeting_point: "-",
    vehicle_out: "-",
    vehicle_return: "-",
    hotel: "-",
    shuttle: "-",
    deployment_location: "ROC Sissach",
    order_number: "ORD-2401"
  },
  {
    id: "r2",
    dateISO: "2025-09-12",                    // Friday
    function: "Camera 2",
    project: "SFL Matchday 7",
    start: DEFAULT_START,
    end: DEFAULT_END,
    location: DEFAULT_LOCATION,
    status: "open",                           // (gelb)
    meeting_point: "-",
    vehicle_out: "-",
    vehicle_return: "-",
    hotel: "-",
    shuttle: "-",
    deployment_location: "ROC Sissach",
    order_number: "ORD-2402"
  },
  {
    id: "r3",
    dateISO: "2025-09-20",                    // Saturday
    function: "Replay",
    project: "SFL Matchday 8",
    start: DEFAULT_START,
    end: DEFAULT_END,
    location: DEFAULT_LOCATION,
    status: "accepted",                       // vorgewählt (grün)
    meeting_point: "-",
    vehicle_out: "-",
    vehicle_return: "-",
    hotel: "-",
    shuttle: "-",
    deployment_location: "ROC Sissach",
    order_number: "ORD-2403"
  },
  {
    id: "r4",
    dateISO: "2025-09-28",                    // Sunday
    function: "Driver",
    project: "SFL Matchday 9",
    start: DEFAULT_START,
    end: DEFAULT_END,
    location: DEFAULT_LOCATION,
    status: "open",                           // (gelb)
    meeting_point: "-",
    vehicle_out: "-",
    vehicle_return: "-",
    hotel: "-",
    shuttle: "-",
    deployment_location: "ROC Sissach",
    order_number: "ORD-2404"
  }
];

/** Laufende Liste im UI */
let requestList = [];

/** Format: 'Friday, 5.9.2025' */
function formatDateNice(iso) {
  const d = new Date(iso + "T00:00:00");
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return `${days[d.getDay()]}, ${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
}

/** Persistierte Status (optional) laden/mergen */
function hydrateFromStorage(list) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    return list.map(item => saved[item.id] ? { ...item, status: saved[item.id] } : item);
  } catch {
    return list;
  }
}
function persistStatus(id, status) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    saved[id] = status;
    localStorage.setItem(STORE_KEY, JSON.stringify(saved));
  } catch {}
}

/** Init & Render */
async function getAndRenderRequestList() {
  // Kein Backend: wir nehmen die Samples
  requestList = hydrateFromStorage(sampleRequests);
  renderRequestList();
}

/** Suche + Render */
function renderRequestList() {
  const tbody = document.getElementById("request_list");
  const q = (document.getElementById("request_search")?.value || "").trim().toLowerCase();

  const filtered = requestList.filter(r => {
    const hay = [
      formatDateNice(r.dateISO),
      r.function || "", r.project || "", r.location || "", r.status || ""
    ].join(" ").toLowerCase();
    return q === "" || hay.includes(q);
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="14" class="font_prime_color text_center">...No requests available...</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(getRequestListEntryTemplate).join("");
}

/** Einzelzeile */
function getRequestListEntryTemplate(r) {
  const date = formatDateNice(r.dateISO);
  const statusDotClass = r.status === "accepted" ? "status-accepted"
                        : r.status === "declined" ? "status-declined"
                        : "status-open";

  return `
  <tr>
    <td>${date}</td>
    <td>${r.function || "-"}</td>
    <td>${r.project || "-"}</td>
    <td>${r.meeting_point || "-"}</td>
    <td>${r.vehicle_out || "-"}</td>
    <td>${r.start || "${DEFAULT_START}"}</td>
    <td>${r.end || "${DEFAULT_END}"}</td>
    <td>${r.vehicle_return || "-"}</td>
    <td>${r.location || "${DEFAULT_LOCATION}"}</td>
    <td>${r.hotel || "-"}</td>
    <td>${r.shuttle || "-"}</td>

    <td>
      <div class="status-cell">
        <span class="status-dot ${statusDotClass}" aria-hidden="true"></span>
        <div class="status-actions" role="group" aria-label="Set status">
          ${renderStatusBtn(r.id, "open", r.status)}
          ${renderStatusBtn(r.id, "accepted", r.status)}
          ${renderStatusBtn(r.id, "declined", r.status)}
        </div>
      </div>
    </td>

    <td>${r.deployment_location || "-"}</td>
    <td>${r.order_number || "-"}</td>
  </tr>`;
}

function renderStatusBtn(id, kind, current) {
  const label = kind.charAt(0).toUpperCase() + kind.slice(1); // Open/Accepted/Declined
  const active = current === kind ? "active" : "";
  const cls = kind === "accepted" ? "btn-accepted"
           : kind === "declined" ? "btn-declined"
           : "btn-open";
  return `<button class="status-btn ${cls} ${active}" onclick="setStatus('${id}','${kind}')">${label}</button>`;
}

/** Status umschalten */
function setStatus(id, newStatus) {
  requestList = requestList.map(r => r.id === id ? { ...r, status: newStatus } : r);
  persistStatus(id, newStatus);
  renderRequestList();
}

// Exporte (optional global, wegen inline onclick):
window.getAndRenderRequestList = getAndRenderRequestList;
window.renderRequestList = renderRequestList;
window.setStatus = setStatus;