const STORAGE_KEY = "farms_jtd_hero_map_v2";

const PADDOCK_NAMES = [
  "NW corner",
  "North 3",
  "Platou 2",
  "Platou 1",
  "Top link",
  "3",
  "2",
  "Thistle hill",
  "Behind hay shed",
  "Ewe/lamb lime",
  "Holding pad 1",
  "Holding pad 2",
  "Holding pad 3",
  "Holding pad 4",
  "Holding pad 5",
  "Willow tree rd",
  "Stud shed 1",
  "Race track pd",
  "Behind house",
  "Pyramid hill",
  "West boundary",
  "West tank pd",
  "North tank pd",
  "Tank pd",
  "Deer 1",
  "Deer 2",
  "Deer 3",
  "Below hay shed",
  "SW corner",
  "Half deer 2",
  "Half deer 1",
  "Behind deer yard",
  "Infront hayshed",
  "NW cell fnce",
  "North cell tower",
  "Dog bend",
  "Lime hill",
  "Water pump pd",
  "Main gate",
  "Cell fnce",
  "East cell fnce",
  "Above terrace",
  "Bottom terrace",
  "Dump pd",
  "Small gate",
  "Tommys creek"
];

const MAP_ZONES = [
  { id: "platou-1", label: "Platou 1", x: 49, y: 7, w: 22, h: 12 },
  { id: "platou-2", label: "Platou 2", x: 34, y: 8, w: 13, h: 10 },
  { id: "nw-corner", label: "NW corner", x: 5, y: 8, w: 15, h: 10 },
  { id: "north-3", label: "North 3", x: 22, y: 7, w: 10, h: 12 },
  { id: "stud-shed-1", label: "Stud shed 1", x: 82, y: 16, w: 13, h: 11 },
  { id: "thistle-hill", label: "Thistle hill", x: 6, y: 25, w: 19, h: 14 },
  { id: "behind-hay-shed", label: "Behind hay shed", x: 25, y: 27, w: 18, h: 13 },
  { id: "race-track-pd", label: "Race track pd", x: 35, y: 34, w: 31, h: 11 },
  { id: "behind-house", label: "Behind house", x: 67, y: 33, w: 18, h: 11 },
  { id: "pyramid-hill", label: "Pyramid hill", x: 83, y: 30, w: 12, h: 13 },
  { id: "west-tank-pd", label: "West tank pd", x: 15, y: 50, w: 17, h: 11 },
  { id: "north-tank-pd", label: "North tank pd", x: 34, y: 49, w: 15, h: 10 },
  { id: "tank-pd", label: "Tank pd", x: 35, y: 59, w: 14, h: 9 },
  { id: "deer-1", label: "Deer 1", x: 49, y: 49, w: 8, h: 13 },
  { id: "deer-2", label: "Deer 2", x: 57, y: 49, w: 8, h: 13 },
  { id: "deer-3", label: "Deer 3", x: 65, y: 49, w: 8, h: 13 },
  { id: "below-hay-shed", label: "Below hay shed", x: 72, y: 48, w: 12, h: 12 },
  { id: "half-deer-2", label: "Half deer 2", x: 17, y: 66, w: 14, h: 9 },
  { id: "half-deer-1", label: "Half deer 1", x: 32, y: 66, w: 14, h: 9 },
  { id: "behind-deer-yard", label: "Behind deer yard", x: 47, y: 66, w: 15, h: 10 },
  { id: "infront-hayshed", label: "Infront hayshed", x: 62, y: 63, w: 15, h: 10 },
  { id: "lime-hill", label: "Lime hill", x: 28, y: 77, w: 16, h: 10 },
  { id: "water-pump-pd", label: "Water pump pd", x: 49, y: 75, w: 16, h: 10 },
  { id: "main-gate", label: "Main gate", x: 66, y: 75, w: 14, h: 10 },
  { id: "cell-fnce", label: "Cell fnce", x: 80, y: 62, w: 12, h: 13 },
  { id: "east-cell-fnce", label: "East cell fnce", x: 86, y: 73, w: 10, h: 12 },
  { id: "above-terrace", label: "Above terrace", x: 35, y: 86, w: 16, h: 9 },
  { id: "bottom-terrace", label: "Bottom terrace", x: 20, y: 91, w: 22, h: 7 },
  { id: "dump-pd", label: "Dump pd", x: 53, y: 87, w: 14, h: 8 },
  { id: "tommys-creek", label: "Tommys creek", x: 79, y: 88, w: 16, h: 9 }
];

const state = loadState();

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const shortcutCards = document.querySelectorAll(".shortcut-card");

const todayDate = document.getElementById("todayDate");

const mobForm = document.getElementById("mobForm");
const jobForm = document.getElementById("jobForm");
const moveForm = document.getElementById("moveForm");

const jobType = document.getElementById("jobType");
const jobLink = document.getElementById("jobLink");
const mapPaddockSelect = document.getElementById("mapPaddockSelect");

const demoBtn = document.getElementById("demoBtn");
const printBtn = document.getElementById("printBtn");
const clearDoneBtn = document.getElementById("clearDoneBtn");
const resetBtn = document.getElementById("resetBtn");

todayDate.textContent = new Date().toLocaleDateString("en-NZ", {
  weekday: "short",
  day: "numeric",
  month: "short"
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    openTab(tab.dataset.tab);
  });
});

shortcutCards.forEach((card) => {
  card.addEventListener("click", () => {
    openTab(card.dataset.openTab);
  });
});

mapPaddockSelect.addEventListener("change", () => {
  state.selectedPaddockId = mapPaddockSelect.value;
  saveState();
  render();
});

mobForm.addEventListener("submit", (event) => {
  event.preventDefault();

  state.mobs.push({
    id: makeId(),
    name: clean("mobName"),
    type: value("mobType"),
    number: Number(value("mobNumber")),
    currentPaddock: value("mobCurrentPaddock"),
    lastPaddock: value("mobLastPaddock") || "Not recorded",
    nextPaddock: value("mobNextPaddock") || "Not set",
    hardFed: value("mobHardFed"),
    feedType: value("mobFeedType"),
    note: clean("mobNote")
  });

  saveState();
  mobForm.reset();
  render();
});

jobForm.addEventListener("submit", (event) => {
  event.preventDefault();

  state.jobs.unshift({
    id: makeId(),
    title: clean("jobTitle"),
    type: value("jobType"),
    link: value("jobLink") || "Whole farm",
    priority: value("jobPriority"),
    status: value("jobStatus"),
    category: value("jobCategory")
  });

  saveState();
  jobForm.reset();
  render();
});

moveForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const mob = state.mobs.find((item) => item.id === value("moveMob"));
  const newPaddock = value("movePaddock");

  if (!mob || !newPaddock) {
    return;
  }

  const oldPaddock = mob.currentPaddock || "Not recorded";

  mob.lastPaddock = oldPaddock;
  mob.currentPaddock = newPaddock;
  mob.nextPaddock = "Not set";

  state.moves.unshift({
    id: makeId(),
    mobName: mob.name,
    from: oldPaddock,
    to: newPaddock,
    reason: value("moveReason"),
    date: new Date().toLocaleDateString("en-NZ")
  });

  saveState();
  moveForm.reset();
  render();
});

jobType.addEventListener("change", renderJobLinks);

demoBtn.addEventListener("click", () => {
  loadDemoData();
  saveState();
  render();
});

printBtn.addEventListener("click", () => {
  window.print();
});

clearDoneBtn.addEventListener("click", () => {
  state.jobs = state.jobs.filter((job) => job.status !== "Done");
  saveState();
  render();
});

resetBtn.addEventListener("click", () => {
  const confirmed = window.confirm("Reset Farms JTD and remove all saved local data?");

  if (!confirmed) {
    return;
  }

  state.paddocks = [];
  state.mobs = [];
  state.jobs = [];
  state.moves = [];
  state.selectedPaddockId = "";

  saveState();
  render();
});

function openTab(target) {
  tabs.forEach((item) => item.classList.remove("active"));
  panels.forEach((panel) => panel.classList.remove("active"));

  const targetTab = document.querySelector(`.tab[data-tab="${target}"]`);
  const targetPanel = document.getElementById(target);

  if (!targetTab || !targetPanel) {
    return;
  }

  targetTab.classList.add("active");
  targetPanel.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function render() {
  ensurePaddocks();
  ensureSelectedPaddock();
  renderSelects();
  renderMapHotspots();
  renderToday();
  renderPaddockCard();
  renderPaddocks();
  renderMobs();
  renderJobs();
  renderMoves();
}

function ensurePaddocks() {
  if (state.paddocks.length > 0) {
    return;
  }

  state.paddocks = PADDOCK_NAMES.map((name) => ({
    id: makeSlug(name),
    name,
    feedStatus: "Good",
    grazeLevel: "Light",
    suitability: "General",
    waterStatus: "Good",
    accessStatus: "Good",
    healthUse: "Normal",
    expectedDays: "",
    actualDays: "",
    note: ""
  }));
}

function ensureSelectedPaddock() {
  if (state.selectedPaddockId && state.paddocks.some((paddock) => paddock.id === state.selectedPaddockId)) {
    return;
  }

  state.selectedPaddockId = state.paddocks.length ? state.paddocks[0].id : "";
}

function renderMapHotspots() {
  const target = document.getElementById("mapHotspots");

  if (!target) {
    return;
  }

  target.innerHTML = MAP_ZONES.map((zone) => {
    const isSelected = zone.id === state.selectedPaddockId ? "selected" : "";

    return `
      <button
        class="map-zone ${isSelected}"
        type="button"
        title="${escapeAttribute(zone.label)}"
        aria-label="Open ${escapeAttribute(zone.label)} paddock card"
        style="left:${zone.x}%; top:${zone.y}%; width:${zone.w}%; height:${zone.h}%;"
        onclick="selectPaddockFromMap('${escapeAttribute(zone.id)}')"
      >
        ${escapeHtml(zone.label)}
      </button>
    `;
  }).join("");
}

function selectPaddockFromMap(id) {
  state.selectedPaddockId = id;
  saveState();
  render();

  document.getElementById("paddockCardPanel").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function buildTodayMobItems() {
  return state.mobs.map((mob) => {
    const attention = [];

    if (mob.hardFed === "Yes") {
      attention.push(`Hard fed: ${mob.feedType || "Feed"}`);
    }

    if (mob.nextPaddock && mob.nextPaddock !== "Not set") {
      attention.push(`Next: ${mob.nextPaddock}`);
    }

    if (attention.length === 0) {
      attention.push("On board");
    }

    return {
      title: mob.name,
      detail: `${mob.number} ${mob.type} · Now: ${mob.currentPaddock || "Not set"}`,
      note: `Last: ${mob.lastPaddock || "Not recorded"} · ${attention.join(" · ")}`,
      pill: mob.hardFed === "Yes" ? "Feed" : "Mob",
      pillClass: mob.hardFed === "Yes" ? "feed" : ""
    };
  });
}

function buildTodayPaddockItems() {
  return state.paddocks
    .filter((paddock) => {
      const flag = getForecastFlag(paddock.expectedDays, paddock.actualDays);
      return paddock.feedStatus === "Low" || paddock.feedStatus === "Bare" || paddock.grazeLevel === "Hard" || flag.level === "red" || flag.level === "amber";
    })
    .map((paddock) => {
      const flag = getForecastFlag(paddock.expectedDays, paddock.actualDays);
      let note = paddock.note || "No note";

      if (flag.level !== "none") {
        note = `${flag.shortText} · ${note}`;
      }

      return {
        title: paddock.name,
        detail: `${paddock.feedStatus} feed · ${paddock.grazeLevel} graze · ${paddock.suitability || "General"}`,
        note,
        pill: flag.level === "red" ? "Red flag" : paddock.grazeLevel,
        pillClass: flag.level === "red" ? "red" : grazeClass(paddock.grazeLevel)
      };
    });
}

function buildTodayMoveItems() {
  return state.moves.map((move) => ({
    title: move.mobName,
    detail: `${move.from} → ${move.to}`,
    note: move.date,
    pill: move.reason,
    pillClass: ""
  }));
}

function getOpenJobs() {
  return state.jobs
    .filter((job) => job.status !== "Done")
    .sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));
}

function renderToday() {
  const mobItems = buildTodayMobItems();
  const paddockItems = buildTodayPaddockItems();
  const moveItems = buildTodayMoveItems();
  const jobItems = getOpenJobs();

  text("statMobsJtd", mobItems.length);
  text("statPaddocksJtd", paddockItems.length);
  text("statMoveJtd", moveItems.length);
  text("statJobsJtd", jobItems.length);

  renderSimpleItems("todayMobs", mobItems, "No mobs added yet.");
  renderSimpleItems("todayPaddocks", paddockItems, "No paddock pressure points showing.");
  renderSimpleItems("todayMoves", moveItems, "No moves recorded yet.");
  renderJobItems("todayJobs", jobItems, true);
}

function renderPaddockCard() {
  const target = document.getElementById("paddockCardPanel");
  const paddock = getPaddock(state.selectedPaddockId);

  if (!paddock) {
    target.innerHTML = empty("Choose a paddock from the map.");
    return;
  }

  hydratePaddockDefaults(paddock);

  const currentMob = getCurrentMobForPaddock(paddock.name) || "No mob in paddock";
  const relatedMoves = state.moves.filter((move) => move.to === paddock.name || move.from === paddock.name).slice(0, 5);
  const forecastFlag = getForecastFlag(paddock.expectedDays, paddock.actualDays);
  const suitabilityWarning = getSuitabilityWarning(paddock);

  target.innerHTML = `
    <div class="detail-grid">
      <div class="flag-box ${forecastFlag.level === "none" ? "" : forecastFlag.level}">
        <div class="flag-title">Forecast vs actual</div>
        <div class="small">${forecastFlag.longText}</div>
      </div>

      ${suitabilityWarning ? `
        <div class="flag-box red">
          <div class="flag-title">Suitability warning</div>
          <div class="small">${escapeHtml(suitabilityWarning)}</div>
        </div>
      ` : ""}

      <div class="item">
        <div class="item-head">
          <div>
            <div class="item-title">${escapeHtml(paddock.name)}</div>
            <div class="meta">Current mob: ${escapeHtml(currentMob)}</div>
          </div>
          <span class="pill ${grazeClass(paddock.grazeLevel)}">${escapeHtml(paddock.grazeLevel)}</span>
        </div>
      </div>

      <form id="paddockCardForm" class="form two">
        <label>
          Paddock name
          <input id="cardPaddockName" value="${escapeAttribute(paddock.name)}" required />
        </label>

        <label>
          Feed status
          <select id="cardFeedStatus">
            ${renderOptions(["Good", "Okay", "Low", "Bare", "Resting"], paddock.feedStatus)}
          </select>
        </label>

        <label>
          Grazing level
          <select id="cardGrazeLevel">
            ${renderOptions(["Light", "Medium", "Hard", "Resting"], paddock.grazeLevel)}
          </select>
        </label>

        <label>
          Suitability
          <select id="cardSuitability">
            ${renderOptions(["General", "Light graze", "Medium graze", "Hard graze", "Not for hard grazing", "Short stay only", "Young stock", "Shade", "Shelter", "Recovery / rest"], paddock.suitability)}
          </select>
        </label>

        <label>
          Water
          <select id="cardWaterStatus">
            ${renderOptions(["Good", "Check", "Problem", "No water"], paddock.waterStatus)}
          </select>
        </label>

        <label>
          Access
          <select id="cardAccessStatus">
            ${renderOptions(["Good", "Wet", "Steep", "Gate issue", "Vehicle issue"], paddock.accessStatus)}
          </select>
        </label>

        <label>
          Health use
          <select id="cardHealthUse">
            ${renderOptions(["Normal", "Shade", "Shelter", "Sick mob", "Lambing / calving", "Observation"], paddock.healthUse)}
          </select>
        </label>

        <label>
          Expected days
          <input id="cardExpectedDays" type="number" min="0" value="${escapeAttribute(paddock.expectedDays || "")}" placeholder="7" />
        </label>

        <label>
          Actual days
          <input id="cardActualDays" type="number" min="0" value="${escapeAttribute(paddock.actualDays || "")}" placeholder="2" />
        </label>

        <label class="full">
          Notes
          <textarea id="cardPaddockNote" placeholder="Shade, water, health, wet corner, keep off">${escapeHtml(paddock.note || "")}</textarea>
        </label>

        <button class="btn full" type="submit">Save paddock card</button>
      </form>

      <div class="item">
        <div class="item-title">Recent movement history</div>
        ${
          relatedMoves.length
            ? `<div class="list" style="margin-top:10px;">
                ${relatedMoves.map((move) => `
                  <div class="item">
                    <div class="item-head">
                      <div>
                        <div class="item-title">${escapeHtml(move.mobName)}</div>
                        <div class="meta">${escapeHtml(move.from)} → ${escapeHtml(move.to)}</div>
                      </div>
                      <span class="pill">${escapeHtml(move.reason)}</span>
                    </div>
                    <div class="meta">${escapeHtml(move.date)}</div>
                  </div>
                `).join("")}
              </div>`
            : `<div class="meta">No movement history recorded yet.</div>`
        }

        <div class="hint">Map stays clean. This card carries the live truth.</div>
      </div>
    </div>
  `;

  document.getElementById("paddockCardForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const oldName = paddock.name;
    const newName = document.getElementById("cardPaddockName").value.trim();

    paddock.name = newName;
    paddock.feedStatus = document.getElementById("cardFeedStatus").value;
    paddock.grazeLevel = document.getElementById("cardGrazeLevel").value;
    paddock.suitability = document.getElementById("cardSuitability").value;
    paddock.waterStatus = document.getElementById("cardWaterStatus").value;
    paddock.accessStatus = document.getElementById("cardAccessStatus").value;
    paddock.healthUse = document.getElementById("cardHealthUse").value;
    paddock.expectedDays = document.getElementById("cardExpectedDays").value.trim();
    paddock.actualDays = document.getElementById("cardActualDays").value.trim();
    paddock.note = document.getElementById("cardPaddockNote").value.trim();

    updateReferencesAfterPaddockRename(oldName, newName);

    saveState();
    render();
  });
}

function hydratePaddockDefaults(paddock) {
  if (!paddock.feedStatus) paddock.feedStatus = "Good";
  if (!paddock.grazeLevel) paddock.grazeLevel = "Light";
  if (!paddock.suitability) paddock.suitability = "General";
  if (!paddock.waterStatus) paddock.waterStatus = "Good";
  if (!paddock.accessStatus) paddock.accessStatus = "Good";
  if (!paddock.healthUse) paddock.healthUse = "Normal";
}

function updateReferencesAfterPaddockRename(oldName, newName) {
  if (!oldName || !newName || oldName === newName) {
    return;
  }

  state.mobs.forEach((mob) => {
    if (mob.currentPaddock === oldName) mob.currentPaddock = newName;
    if (mob.lastPaddock === oldName) mob.lastPaddock = newName;
    if (mob.nextPaddock === oldName) mob.nextPaddock = newName;
  });

  state.moves.forEach((move) => {
    if (move.from === oldName) move.from = newName;
    if (move.to === oldName) move.to = newName;
  });

  state.jobs.forEach((job) => {
    if (job.link === oldName) job.link = newName;
  });
}

function renderPaddocks() {
  const target = document.getElementById("paddockList");

  if (state.paddocks.length === 0) {
    target.innerHTML = empty("No paddocks loaded yet.");
    return;
  }

  target.innerHTML = state.paddocks.map((paddock) => {
    hydratePaddockDefaults(paddock);

    const currentMob = getCurrentMobForPaddock(paddock.name);
    const forecastFlag = getForecastFlag(paddock.expectedDays, paddock.actualDays);

    return `
      <div class="item">
        <div class="item-head">
          <div>
            <div class="item-title">${escapeHtml(paddock.name)}</div>
            <div class="meta">
              ${escapeHtml(paddock.feedStatus)} feed · ${escapeHtml(paddock.grazeLevel)} graze · ${escapeHtml(paddock.suitability)}<br />
              Current mob: ${escapeHtml(currentMob || "No mob in paddock")}
            </div>
          </div>
          <span class="pill ${grazeClass(paddock.grazeLevel)}">${escapeHtml(paddock.grazeLevel)}</span>
        </div>
        <div class="meta">
          Expected / actual: ${escapeHtml(String(paddock.expectedDays || "–"))} / ${escapeHtml(String(paddock.actualDays || "–"))} days
          ${forecastFlag.level !== "none" ? `<br />${escapeHtml(forecastFlag.shortText)}` : ""}
        </div>
      </div>
    `;
  }).join("");
}

function renderMobs() {
  const target = document.getElementById("mobList");

  if (state.mobs.length === 0) {
    target.innerHTML = empty("No mobs added yet.");
    return;
  }

  target.innerHTML = state.mobs.map((mob) => `
    <div class="item">
      <div class="item-head">
        <div>
          <div class="item-title">${escapeHtml(mob.name)} · ${escapeHtml(String(mob.number))} ${escapeHtml(mob.type)}</div>
          <div class="meta">
            Now: ${escapeHtml(mob.currentPaddock || "Not set")}<br />
            Last: ${escapeHtml(mob.lastPaddock || "Not recorded")} · Next: ${escapeHtml(mob.nextPaddock || "Not set")}<br />
            Hard fed: ${escapeHtml(mob.hardFed)} · Feed: ${escapeHtml(mob.feedType || "None")}
          </div>
        </div>
        <span class="pill ${mob.hardFed === "Yes" ? "feed" : ""}">${escapeHtml(mob.hardFed === "Yes" ? "Feed" : "Mob")}</span>
      </div>
      ${mob.note ? `<div class="meta">${escapeHtml(mob.note)}</div>` : ""}
    </div>
  `).join("");
}

function renderJobs() {
  renderJobItems("jobList", state.jobs, false);
}

function renderMoves() {
  const target = document.getElementById("moveList");

  if (state.moves.length === 0) {
    target.innerHTML = empty("No moves recorded yet.");
    return;
  }

  target.innerHTML = state.moves.map((move) => `
    <div class="item">
      <div class="item-head">
        <div>
          <div class="item-title">${escapeHtml(move.mobName)}</div>
          <div class="meta">${escapeHtml(move.from)} → ${escapeHtml(move.to)}</div>
        </div>
        <span class="pill">${escapeHtml(move.reason)}</span>
      </div>
      <div class="meta">${escapeHtml(move.date)}</div>
    </div>
  `).join("");
}

function renderSimpleItems(targetId, items, emptyMessage) {
  const target = document.getElementById(targetId);

  if (items.length === 0) {
    target.innerHTML = empty(emptyMessage);
    return;
  }

  target.innerHTML = items.map((item) => `
    <div class="item">
      <div class="item-head">
        <div>
          <div class="item-title">${escapeHtml(item.title)}</div>
          <div class="meta">${escapeHtml(item.detail)}</div>
        </div>
        <span class="pill ${escapeHtml(item.pillClass || "")}">${escapeHtml(item.pill)}</span>
      </div>
      ${item.note ? `<div class="meta">${escapeHtml(item.note)}</div>` : ""}
    </div>
  `).join("");
}

function renderJobItems(targetId, jobs, compact) {
  const target = document.getElementById(targetId);

  if (jobs.length === 0) {
    target.innerHTML = empty(compact ? "No open jobs showing." : "No jobs added yet.");
    return;
  }

  target.innerHTML = jobs.map((job) => `
    <div class="item">
      <div class="item-head">
        <div>
          <div class="item-title">${escapeHtml(job.title)}</div>
          <div class="meta">
            ${escapeHtml(job.type)} · ${escapeHtml(job.link)} · ${escapeHtml(job.category)}
          </div>
        </div>
        <span class="pill ${job.status === "Done" ? "done" : priorityClass(job.priority)}">${escapeHtml(job.status === "Done" ? "Done" : job.priority)}</span>
      </div>
      ${job.status !== "Done" ? `
        <div class="actions">
          <button class="btn secondary small-btn" type="button" onclick="markJobDone('${job.id}')">Mark done</button>
          <button class="btn danger small-btn" type="button" onclick="deleteJob('${job.id}')">Delete</button>
        </div>
      ` : `
        <div class="actions">
          <button class="btn danger small-btn" type="button" onclick="deleteJob('${job.id}')">Delete</button>
        </div>
      `}
    </div>
  `).join("");
}

function renderSelects() {
  fillPaddockSelect("mapPaddockSelect", true, state.selectedPaddockId);
  fillPaddockSelect("mobCurrentPaddock", true);
  fillPaddockSelect("mobLastPaddock", false);
  fillPaddockSelect("mobNextPaddock", false);
  fillPaddockSelect("movePaddock", true);
  fillMobSelect("moveMob", true);
  renderJobLinks();
}

function renderJobLinks() {
  const selectedType = value("jobType");
  let options = "";

  if (selectedType === "Whole farm") {
    options = `<option>Whole farm</option>`;
  }

  if (selectedType === "Paddock") {
    options = state.paddocks.length
      ? state.paddocks.map((paddock) => `<option>${escapeHtml(paddock.name)}</option>`).join("")
      : `<option>No paddocks yet</option>`;
  }

  if (selectedType === "Mob") {
    options = state.mobs.length
      ? state.mobs.map((mob) => `<option>${escapeHtml(mob.name)}</option>`).join("")
      : `<option>No mobs yet</option>`;
  }

  jobLink.innerHTML = options;
}

function fillPaddockSelect(id, required, selectedId = "") {
  const select = document.getElementById(id);
  const first = required ? `<option value="">Choose paddock</option>` : `<option value="">Not set</option>`;

  select.innerHTML = first + state.paddocks.map((paddock) => {
    const value = id === "mapPaddockSelect" ? paddock.id : paddock.name;
    const selected = selectedId === paddock.id ? "selected" : "";
    return `<option value="${escapeHtml(value)}" ${selected}>${escapeHtml(paddock.name)}</option>`;
  }).join("");
}

function fillMobSelect(id, required) {
  const select = document.getElementById(id);
  const first = required ? `<option value="">Choose mob</option>` : `<option value="">Not set</option>`;

  select.innerHTML = first + state.mobs.map((mob) => {
    return `<option value="${escapeHtml(mob.id)}">${escapeHtml(mob.name)}</option>`;
  }).join("");
}

function getPaddock(id) {
  return state.paddocks.find((paddock) => paddock.id === id);
}

function getCurrentMobForPaddock(paddockName) {
  const mob = state.mobs.find((item) => item.currentPaddock === paddockName);
  return mob ? mob.name : "";
}

function markJobDone(id) {
  const job = state.jobs.find((item) => item.id === id);

  if (!job) {
    return;
  }

  job.status = "Done";
  saveState();
  render();
}

function deleteJob(id) {
  state.jobs = state.jobs.filter((job) => job.id !== id);
  saveState();
  render();
}

function loadDemoData() {
  state.paddocks = PADDOCK_NAMES.map((name) => ({
    id: makeSlug(name),
    name,
    feedStatus: "Good",
    grazeLevel: "Light",
    suitability: "General",
    waterStatus: "Good",
    accessStatus: "Good",
    healthUse: "Normal",
    expectedDays: "",
    actualDays: "",
    note: ""
  }));

  applyPaddockDemo("platou-1", {
    feedStatus: "Low",
    grazeLevel: "Hard",
    suitability: "Not for hard grazing",
    waterStatus: "Good",
    accessStatus: "Good",
    healthUse: "Normal",
    expectedDays: "7",
    actualDays: "2",
    note: "Ran out well before plan. Watch for hard grazing."
  });

  applyPaddockDemo("behind-hay-shed", {
    feedStatus: "Okay",
    grazeLevel: "Medium",
    suitability: "General",
    waterStatus: "Good",
    accessStatus: "Good",
    healthUse: "Normal",
    expectedDays: "5",
    actualDays: "4",
    note: "Reliable block near working area."
  });

  applyPaddockDemo("stud-shed-1", {
    feedStatus: "Okay",
    grazeLevel: "Medium",
    suitability: "Shade",
    waterStatus: "Check",
    accessStatus: "Good",
    healthUse: "Shade",
    expectedDays: "3",
    actualDays: "3",
    note: "Useful for shelter and quick health shifts."
  });

  applyPaddockDemo("west-tank-pd", {
    feedStatus: "Bare",
    grazeLevel: "Hard",
    suitability: "Short stay only",
    waterStatus: "Good",
    accessStatus: "Wet",
    healthUse: "Normal",
    expectedDays: "5",
    actualDays: "3",
    note: "Needs recovery."
  });

  state.mobs = [
    {
      id: makeId(),
      name: "MA Ewes",
      type: "Ewes",
      number: 620,
      currentPaddock: "Platou 1",
      lastPaddock: "Platou 2",
      nextPaddock: "Race track pd",
      hardFed: "Yes",
      feedType: "Baleage",
      note: "2 bales today."
    },
    {
      id: makeId(),
      name: "Hoggets",
      type: "Hoggets",
      number: 410,
      currentPaddock: "Behind hay shed",
      lastPaddock: "Thistle hill",
      nextPaddock: "Not set",
      hardFed: "No",
      feedType: "None",
      note: "Holding well."
    },
    {
      id: makeId(),
      name: "R2 Heifers",
      type: "Heifers",
      number: 86,
      currentPaddock: "Behind house",
      lastPaddock: "Race track pd",
      nextPaddock: "Stud shed 1",
      hardFed: "No",
      feedType: "None",
      note: "Move for shade if needed."
    }
  ];

  state.jobs = [
    {
      id: makeId(),
      title: "Check main water line",
      type: "Whole farm",
      link: "Whole farm",
      priority: "Urgent",
      status: "Open",
      category: "Water"
    },
    {
      id: makeId(),
      title: "Fix trough",
      type: "Paddock",
      link: "North tank pd",
      priority: "High",
      status: "Open",
      category: "Water"
    },
    {
      id: makeId(),
      title: "Hard feed MA Ewes",
      type: "Mob",
      link: "MA Ewes",
      priority: "High",
      status: "Open",
      category: "Feed"
    },
    {
      id: makeId(),
      title: "Walk Platou 1",
      type: "Paddock",
      link: "Platou 1",
      priority: "Urgent",
      status: "Open",
      category: "Stock"
    }
  ];

  state.moves = [
    {
      id: makeId(),
      mobName: "MA Ewes",
      from: "Platou 2",
      to: "Platou 1",
      reason: "Feed",
      date: new Date().toLocaleDateString("en-NZ")
    }
  ];

  state.selectedPaddockId = "platou-1";
}

function applyPaddockDemo(id, values) {
  const paddock = state.paddocks.find((item) => item.id === id);

  if (!paddock) {
    return;
  }

  Object.assign(paddock, values);
}

function getForecastFlag(expectedDays, actualDays) {
  const expected = Number(expectedDays);
  const actual = Number(actualDays);

  if (!expected || !actual) {
    return {
      level: "none",
      shortText: "No forecast check yet.",
      longText: "Set expected days and actual days to compare plan against reality."
    };
  }

  if (actual <= expected * 0.4) {
    return {
      level: "red",
      shortText: `Red flag: expected ${expected} days, got ${actual}.`,
      longText: `Red flag: expected ${expected} days in paddock, got ${actual}. This paddock ran out well before plan.`
    };
  }

  if (actual <= expected * 0.75) {
    return {
      level: "amber",
      shortText: `Amber watch: expected ${expected} days, got ${actual}.`,
      longText: `Amber watch: expected ${expected} days in paddock, got ${actual}. This paddock under-ran plan.`
    };
  }

  return {
    level: "green",
    shortText: `Close to plan: expected ${expected} days, got ${actual}.`,
    longText: `Close to plan: expected ${expected} days in paddock, got ${actual}.`
  };
}

function getSuitabilityWarning(paddock) {
  const expected = Number(paddock.expectedDays);
  const actual = Number(paddock.actualDays);

  if (!expected || !actual) {
    return "";
  }

  if (paddock.grazeLevel === "Hard" && actual <= expected * 0.4) {
    return `${paddock.name} may not suit hard grazing as planned. Consider lighter graze, shorter stay, or different mob pressure.`;
  }

  return "";
}

function grazeClass(level) {
  if (level === "Hard") return "hard";
  if (level === "Medium") return "medium";
  if (level === "Resting") return "resting";
  return "light";
}

function priorityClass(priority) {
  if (priority === "Urgent") return "urgent";
  if (priority === "High") return "high";
  return "";
}

function priorityRank(priority) {
  if (priority === "Urgent") return 3;
  if (priority === "High") return 2;
  return 1;
}

function renderOptions(options, selected) {
  return options.map((option) => {
    return `<option ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`;
  }).join("");
}

function loadState() {
  const fallback = {
    paddocks: [],
    mobs: [],
    jobs: [],
    moves: [],
    selectedPaddockId: ""
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return fallback;
    }

    const parsed = JSON.parse(saved);

    return {
      paddocks: Array.isArray(parsed.paddocks) ? parsed.paddocks : [],
      mobs: Array.isArray(parsed.mobs) ? parsed.mobs : [],
      jobs: Array.isArray(parsed.jobs) ? parsed.jobs : [],
      moves: Array.isArray(parsed.moves) ? parsed.moves : [],
      selectedPaddockId: typeof parsed.selectedPaddockId === "string" ? parsed.selectedPaddockId : ""
    };
  } catch (error) {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function value(id) {
  return document.getElementById(id).value;
}

function clean(id) {
  return value(id).trim();
}

function text(id, content) {
  document.getElementById(id).textContent = content;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function makeSlug(valueToSlug) {
  return String(valueToSlug)
    .toLowerCase()
    .replaceAll("/", "-")
    .replaceAll(" ", "-")
    .replaceAll(".", "")
    .replace(/[^a-z0-9-]/g, "");
}

function empty(message) {
  return `<div class="empty">${escapeHtml(message)}</div>`;
}

function escapeHtml(valueToEscape) {
  return String(valueToEscape)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(valueToEscape) {
  return escapeHtml(valueToEscape ?? "");
}

window.selectPaddockFromMap = selectPaddockFromMap;
window.markJobDone = markJobDone;
window.deleteJob = deleteJob;

render();
