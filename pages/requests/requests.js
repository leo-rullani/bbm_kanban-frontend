/**
 * @file requests_demo.js
 * @summary Demo: static requests without a backend (UI-only).
 * @description
 * Provides a small in-memory/LocalStorage–backed request list to demonstrate
 * rendering, filtering and inline status updates for assignments.
 * Defaults:
 *  - Start: 15:00
 *  - End:   20:00
 *  - Location: "ROC Sissach"
 * Status is optionally persisted under {@link STORE_KEY} in LocalStorage.
 */

/**
 * Default start time (HH:mm).
 * @type {string}
 */
const DEFAULT_START = "15:00";

/**
 * Default end time (HH:mm).
 * @type {string}
 */
const DEFAULT_END   = "20:00";

/**
 * Default location label.
 * @type {string}
 */
const DEFAULT_LOCATION = "ROC Sissach";

/**
 * LocalStorage key for persisting request status values.
 * @type {string}
 */
const STORE_KEY = "bbm-requests-demo-status";

/**
 * Allowed request statuses.
 * @typedef {'open'|'accepted'|'declined'} RequestStatus
 */

/**
 * Shape of a single demo request entry.
 * @typedef {Object} Request
 * @property {string} id
 * @property {string} dateISO - Date in ISO format (YYYY-MM-DD).
 * @property {string} function - Task function/role (e.g., "Camera 2").
 * @property {string} project  - Project label.
 * @property {string} start    - Start time (HH:mm).
 * @property {string} end      - End time (HH:mm).
 * @property {string} location - Location label (short).
 * @property {RequestStatus} status
 * @property {string} meeting_point
 * @property {string} vehicle_out
 * @property {string} vehicle_return
 * @property {string} hotel
 * @property {string} shuttle
 * @property {string} deployment_location
 * @property {string} order_number
 */

/** Four example requests. */
const sampleRequests =
/** @type {Request[]} */ ([
  {
    id: "r1",
    dateISO: "2025-09-05",                    // Friday
    function: "Graphics Operator",
    project: "SFL Matchday 6",
    start: DEFAULT_START,
    end: DEFAULT_END,
    location: DEFAULT_LOCATION,
    status: "accepted",                       // preselected (green)
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
    status: "open",                           // (yellow)
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
    status: "accepted",                       // preselected (green)
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
    status: "open",                           // (yellow)
    meeting_point: "-",
    vehicle_out: "-",
    vehicle_return: "-",
    hotel: "-",
    shuttle: "-",
    deployment_location: "ROC Sissach",
    order_number: "ORD-2404"
  }
]);

/**
 * Current list in the UI (after hydration/filtering).
 * @type {Request[]}
 */
let requestList = [];

/**
 * Formats an ISO date string into a human-friendly label like "Friday, 5.9.2025".
 *
 * @param {string} iso - ISO date string (YYYY-MM-DD).
 * @returns {string} Human-readable date.
 */
function formatDateNice(iso) {
  const d = new Date(iso + "T00:00:00");
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return `${days[d.getDay()]}, ${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
}

/**
 * Merges persisted status values from LocalStorage (if any) into the given list.
 *
 * @param {Request[]} list - Source list to hydrate.
 * @returns {Request[]} New list with status possibly overridden from storage.
 */
function hydrateFromStorage(list) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    return list.map(item => saved[item.id] ? { ...item, status: saved[item.id] } : item);
  } catch {
    return list;
  }
}

/**
 * Persists the status for a single request into LocalStorage.
 *
 * @param {string} id - Request id.
 * @param {RequestStatus} status - New status to persist.
 * @returns {void}
 */
function persistStatus(id, status) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    saved[id] = status;
    localStorage.setItem(STORE_KEY, JSON.stringify(saved));
  } catch {}
}

/**
 * Initializes (fetches demo data) and renders the request list.
 * No backend is called; uses {@link sampleRequests}.
 *
 * @returns {Promise<void>}
 */
async function getAndRenderRequestList() {
  // No backend: use samples
  requestList = hydrateFromStorage(sampleRequests);
  renderRequestList();
}

/**
 * Filters by a free-text query (matches date label, function, project, location, status)
 * and renders the table body with the result set.
 *
 * Uses input value from `#request_search` and writes rows to `#request_list`.
 *
 * @returns {void}
 */
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

/**
 * Renders a single table row for a request.
 *
 * @param {Request} r - Request entry.
 * @returns {string} HTML string for the `<tr>`.
 *
 * @see renderStatusBtn
 */
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

/**
 * Builds a status toggle button (Open/Accepted/Declined) for a given request id.
 *
 * @param {string} id - Request id to update when clicked.
 * @param {RequestStatus} kind - Target status represented by the button.
 * @param {RequestStatus} current - Current status, used to mark the active button.
 * @returns {string} HTML string for the `<button>`.
 */
function renderStatusBtn(id, kind, current) {
  const label = kind.charAt(0).toUpperCase() + kind.slice(1); // Open/Accepted/Declined
  const active = current === kind ? "active" : "";
  const cls = kind === "accepted" ? "btn-accepted"
           : kind === "declined" ? "btn-declined"
           : "btn-open";
  return `<button class="status-btn ${cls} ${active}" onclick="setStatus('${id}','${kind}')">${label}</button>`;
}

/**
 * Updates a request's status in the in-memory list, persists it, and re-renders.
 *
 * @param {string} id - Request id.
 * @param {RequestStatus} newStatus - New status value.
 * @returns {void}
 */
function setStatus(id, newStatus) {
  requestList = requestList.map(r => r.id === id ? { ...r, status: newStatus } : r);
  persistStatus(id, newStatus);
  renderRequestList();
}

/**
 * Optional globals (used by inline `onclick` handlers).
 * @type {(typeof getAndRenderRequestList)}
 */
window.getAndRenderRequestList = getAndRenderRequestList;
/** @type {(typeof renderRequestList)} */
window.renderRequestList = renderRequestList;
/** @type {(id:string, status:RequestStatus) => void} */
window.setStatus = setStatus;