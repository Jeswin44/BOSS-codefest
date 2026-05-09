const DIRECTIONS = {
  north: { row: -1, col: 0, opposite: "south" },
  east: { row: 0, col: 1, opposite: "west" },
  south: { row: 1, col: 0, opposite: "north" },
  west: { row: 0, col: -1, opposite: "east" }
};

const TILE_DEFS = {
  straight: {
    name: "Straight",
    help: "Connects two opposite sides.",
    rotations: [
      ["east", "west"],
      ["north", "south"]
    ]
  },
  corner: {
    name: "Corner",
    help: "Turns a path ninety degrees.",
    rotations: [
      ["north", "east"],
      ["east", "south"],
      ["south", "west"],
      ["west", "north"]
    ]
  },
  cross: {
    name: "Bridge",
    help: "Connects all four sides.",
    rotations: [
      ["north", "east", "south", "west"]
    ]
  }
};

const LEVELS = [
  {
    id: 1,
    title: "First Link",
    difficulty: "Easy",
    size: 6,
    sources: [{ row: 2, col: 0, label: "R" }],
    targets: [{ row: 2, col: 5, label: "N" }],
    blockers: [
      { row: 0, col: 3 },
      { row: 4, col: 2 }
    ],
    inventory: { straight: 4, corner: 0, cross: 0 },
    optimalMoves: 4,
    themeText: "A simple hallway link: connect one campus resource to one student need.",
    hint: "Pick Straight and fill the row from the resource to the need.",
    impact: "A clear path means support is visible, reachable, and useful."
  },
  {
    id: 2,
    title: "Around the Block",
    difficulty: "Easy",
    size: 6,
    sources: [{ row: 1, col: 0, label: "R" }],
    targets: [{ row: 1, col: 5, label: "N" }],
    blockers: [
      { row: 1, col: 2 },
      { row: 2, col: 2 },
      { row: 3, col: 2 },
      { row: 4, col: 2 }
    ],
    inventory: { straight: 4, corner: 2, cross: 0 },
    optimalMoves: 9,
    themeText: "Barriers change the plan. Route around blockers while using only the kit you have.",
    hint: "Try the open lane above the blockers.",
    impact: "Good design notices barriers early and still finds a workable route."
  },
  {
    id: 3,
    title: "Shared Network",
    difficulty: "Medium",
    size: 6,
    sources: [
      { row: 2, col: 0, label: "R" },
      { row: 5, col: 3, label: "R" }
    ],
    targets: [
      { row: 0, col: 3, label: "N" },
      { row: 2, col: 5, label: "N" }
    ],
    blockers: [
      { row: 1, col: 1 },
      { row: 1, col: 4 },
      { row: 4, col: 1 },
      { row: 4, col: 4 }
    ],
    inventory: { straight: 6, corner: 0, cross: 1 },
    optimalMoves: 10,
    themeText: "The final demo puzzle asks you to build one shared network that reaches every need.",
    hint: "A bridge tile near the center can let one network serve both sides.",
    impact: "The strongest systems reuse connections instead of building isolated fixes."
  },
  {
    id: 4,
    title: "Long Detour",
    difficulty: "Medium",
    size: 6,
    sources: [{ row: 5, col: 0, label: "R" }],
    targets: [{ row: 0, col: 5, label: "N" }],
    blockers: [
      { row: 4, col: 1 },
      { row: 3, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
      { row: 1, col: 4 }
    ],
    inventory: { straight: 6, corner: 3, cross: 0 },
    optimalMoves: 19,
    themeText: "A longer path can still be efficient when each turn has a purpose.",
    hint: "Climb through column 3, then turn toward the need.",
    impact: "Sometimes the best support route is not the shortest-looking one."
  },
  {
    id: 5,
    title: "Two Needs",
    difficulty: "Medium",
    size: 6,
    sources: [{ row: 3, col: 0, label: "R" }],
    targets: [
      { row: 0, col: 3, label: "N" },
      { row: 5, col: 3, label: "N" }
    ],
    blockers: [
      { row: 1, col: 1 },
      { row: 1, col: 5 },
      { row: 4, col: 1 },
      { row: 4, col: 5 }
    ],
    inventory: { straight: 5, corner: 0, cross: 1 },
    optimalMoves: 9,
    themeText: "One strong hub can serve more than one need if the network is planned well.",
    hint: "Place the bridge in the middle of the route.",
    impact: "Shared hubs help limited resources reach more students."
  },
  {
    id: 6,
    title: "Tight Budget",
    difficulty: "Hard",
    size: 6,
    sources: [{ row: 0, col: 0, label: "R" }],
    targets: [{ row: 5, col: 5, label: "N" }],
    blockers: [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 3, col: 0 },
      { row: 3, col: 3 },
      { row: 4, col: 5 }
    ],
    inventory: { straight: 6, corner: 3, cross: 0 },
    optimalMoves: 14,
    themeText: "Every tile matters in this limited-kit route across the campus.",
    hint: "Drop down first, cross the middle, then turn down again.",
    impact: "A tight budget rewards careful planning before building."
  },
  {
    id: 7,
    title: "Three-Way Hub",
    difficulty: "Hard",
    size: 6,
    sources: [{ row: 5, col: 2, label: "R" }],
    targets: [
      { row: 0, col: 2, label: "N" },
      { row: 2, col: 0, label: "N" },
      { row: 2, col: 5, label: "N" }
    ],
    blockers: [
      { row: 0, col: 0 },
      { row: 0, col: 5 },
      { row: 4, col: 0 },
      { row: 4, col: 5 }
    ],
    inventory: { straight: 6, corner: 0, cross: 1 },
    optimalMoves: 10,
    themeText: "Build a hub that reaches three different needs from one resource.",
    hint: "The bridge belongs where the three routes split.",
    impact: "Good systems branch from one clear hub instead of duplicating work."
  },
  {
    id: 8,
    title: "Final Network",
    difficulty: "Expert",
    size: 6,
    sources: [{ row: 5, col: 0, label: "R" }],
    targets: [
      { row: 0, col: 0, label: "N" },
      { row: 2, col: 5, label: "N" },
      { row: 5, col: 5, label: "N" }
    ],
    blockers: [
      { row: 0, col: 1 },
      { row: 0, col: 3 },
      { row: 2, col: 1 },
      { row: 2, col: 3 },
      { row: 4, col: 1 },
      { row: 4, col: 4 }
    ],
    inventory: { straight: 7, corner: 4, cross: 2 },
    optimalMoves: 21,
    themeText: "The finale combines branches, turns, and shared routes into one connected system.",
    hint: "Use one bridge near the bottom and one near the center.",
    impact: "A final network proves one thoughtful design can solve several needs at once."
  }
];

const els = {
  startScreen: document.querySelector("#startScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  levelList: document.querySelector("#levelList"),
  startButton: document.querySelector("#startButton"),
  homeButton: document.querySelector("#homeButton"),
  resetButton: document.querySelector("#resetButton"),
  levelKicker: document.querySelector("#levelKicker"),
  levelTitle: document.querySelector("#levelTitle"),
  themeLine: document.querySelector("#themeLine"),
  moveCount: document.querySelector("#moveCount"),
  timer: document.querySelector("#timer"),
  goalCount: document.querySelector("#goalCount"),
  board: document.querySelector("#board"),
  inventory: document.querySelector("#inventory"),
  hintText: document.querySelector("#hintText"),
  winModal: document.querySelector("#winModal"),
  stars: document.querySelector("#stars"),
  scoreLine: document.querySelector("#scoreLine"),
  impactLine: document.querySelector("#impactLine"),
  replayButton: document.querySelector("#replayButton"),
  nextButton: document.querySelector("#nextButton")
};

let selectedLevelIndex = 0;
let currentLevelIndex = 0;
let selectedTileType = "straight";
let removeMode = false;
let placedTiles = new Map();
let inventory = {};
let connectedTargets = new Set();
let moves = 0;
let seconds = 0;
let timerId = null;
let gameWon = false;

function positionKey(row, col) {
  return `${row},${col}`;
}

function getPosition(item) {
  return positionKey(item.row, item.col);
}

function cloneInventory(level) {
  return Object.fromEntries(Object.entries(level.inventory).map(([type, count]) => [type, count]));
}

function getCellRole(level, row, col) {
  const key = positionKey(row, col);
  if (level.sources.some((item) => getPosition(item) === key)) return "source";
  if (level.targets.some((item) => getPosition(item) === key)) return "target";
  if (level.blockers.some((item) => getPosition(item) === key)) return "blocker";
  return "empty";
}

function getNodeAt(level, row, col) {
  const key = positionKey(row, col);
  return [...level.sources, ...level.targets].find((item) => getPosition(item) === key);
}

function getConnections(level, row, col) {
  const role = getCellRole(level, row, col);
  if (role === "source" || role === "target") {
    return ["north", "east", "south", "west"];
  }

  const tile = placedTiles.get(positionKey(row, col));
  if (!tile) return [];
  return TILE_DEFS[tile.type].rotations[tile.rotation];
}

function hasMatchingConnection(level, row, col, direction) {
  const nextRow = row + DIRECTIONS[direction].row;
  const nextCol = col + DIRECTIONS[direction].col;
  if (nextRow < 0 || nextCol < 0 || nextRow >= level.size || nextCol >= level.size) return false;
  const nextConnections = getConnections(level, nextRow, nextCol);
  return nextConnections.includes(DIRECTIONS[direction].opposite);
}

function calculateConnections(level) {
  const queue = [];
  const seen = new Set();

  level.sources.forEach((source) => {
    const key = getPosition(source);
    seen.add(key);
    queue.push(source);
  });

  while (queue.length > 0) {
    const current = queue.shift();
    const currentConnections = getConnections(level, current.row, current.col);

    currentConnections.forEach((direction) => {
      if (!hasMatchingConnection(level, current.row, current.col, direction)) return;
      const nextRow = current.row + DIRECTIONS[direction].row;
      const nextCol = current.col + DIRECTIONS[direction].col;
      const nextKey = positionKey(nextRow, nextCol);
      if (seen.has(nextKey)) return;
      seen.add(nextKey);
      queue.push({ row: nextRow, col: nextCol });
    });
  }

  connectedTargets = new Set(
    level.targets
      .filter((target) => seen.has(getPosition(target)))
      .map((target) => getPosition(target))
  );

  return seen;
}

function renderLevelCards() {
  els.levelList.innerHTML = "";
  LEVELS.forEach((level, index) => {
    const button = document.createElement("button");
    button.className = `level-card${index === selectedLevelIndex ? " is-selected" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="level-card-top">
        <strong>Level ${level.id}: ${level.title}</strong>
        <span class="difficulty-pill difficulty-${level.difficulty.toLowerCase()}">${level.difficulty}</span>
      </span>
      <span class="level-summary">${level.themeText}</span>
      <span class="level-hint">Hint: ${level.hint}</span>
    `;
    button.addEventListener("click", () => {
      selectedLevelIndex = index;
      els.startButton.textContent = `Start Level ${level.id}`;
      renderLevelCards();
    });
    els.levelList.appendChild(button);
  });
}

function renderInventory() {
  els.inventory.innerHTML = "";

  if (!removeMode && (inventory[selectedTileType] || 0) <= 0) {
    const availableType = Object.keys(TILE_DEFS).find((type) => (inventory[type] || 0) > 0);
    if (availableType) selectedTileType = availableType;
  }

  Object.keys(TILE_DEFS).forEach((type) => {
    const tile = TILE_DEFS[type];
    const count = inventory[type] || 0;
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "tile-button",
      !removeMode && selectedTileType === type ? "is-selected" : "",
      count <= 0 ? "is-empty" : ""
    ].filter(Boolean).join(" ");
    button.disabled = count <= 0;
    button.innerHTML = `
      <span class="tile-preview preview-${type}" aria-hidden="true"></span>
      <span>
        <span class="tile-name">${tile.name}</span>
        <span class="tile-help">${tile.help}</span>
      </span>
      <span class="tile-count">${count}</span>
    `;
    button.addEventListener("click", () => {
      removeMode = false;
      selectedTileType = type;
      renderInventory();
      renderBoard();
    });
    els.inventory.appendChild(button);
  });

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = `tile-button remove-button${removeMode ? " is-selected" : ""}`;
  removeButton.innerHTML = `
    <span class="tile-preview preview-remove" aria-hidden="true">×</span>
    <span>
      <span class="tile-name">Remove</span>
      <span class="tile-help">Return a placed tile to your kit.</span>
    </span>
    <span class="tile-count">${placedTiles.size}</span>
  `;
  removeButton.addEventListener("click", () => {
    removeMode = true;
    renderInventory();
    renderBoard();
  });
  els.inventory.appendChild(removeButton);
}

function renderBoard() {
  const level = LEVELS[currentLevelIndex];
  const connectedCells = calculateConnections(level);
  els.board.innerHTML = "";
  els.board.style.setProperty("--board-size", level.size);

  for (let row = 0; row < level.size; row += 1) {
    for (let col = 0; col < level.size; col += 1) {
      const key = positionKey(row, col);
      const role = getCellRole(level, row, col);
      const tile = placedTiles.get(key);
      const connections = getConnections(level, row, col);
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = [
        "cell",
        role,
        tile ? "has-tile" : "",
        connectedCells.has(key) && role !== "empty" ? "is-connected" : "",
        connectedCells.has(key) && role === "empty" ? "is-connected" : "",
        ...connections.map((direction) => `has-${direction}`)
      ].filter(Boolean).join(" ");
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      cell.setAttribute("aria-label", buildCellLabel(level, row, col, role, tile));

      if (role === "source" || role === "target") {
        const node = getNodeAt(level, row, col);
        cell.innerHTML = `<span class="cell-label">${node.label}</span>`;
      } else if (role === "blocker") {
        cell.setAttribute("aria-disabled", "true");
      } else if (tile) {
        cell.innerHTML = '<span class="tile-dot" aria-hidden="true"></span>';
      }

      cell.addEventListener("click", () => handleCellClick(row, col));
      els.board.appendChild(cell);
    }
  }

  updateStats();
}

function buildCellLabel(level, row, col, role, tile) {
  const readable = `row ${row + 1}, column ${col + 1}`;
  if (role === "source") return `Resource at ${readable}`;
  if (role === "target") return `Need at ${readable}`;
  if (role === "blocker") return `Blocker at ${readable}`;
  if (tile && removeMode) return `${TILE_DEFS[tile.type].name} tile at ${readable}. Activate to remove.`;
  if (tile) return `${TILE_DEFS[tile.type].name} tile at ${readable}. Activate to rotate.`;
  if (removeMode) return `Empty square at ${readable}. No placed tile to remove.`;
  return `Empty square at ${readable}. Activate to place ${TILE_DEFS[selectedTileType].name}.`;
}

function handleCellClick(row, col) {
  if (gameWon) return;
  const level = LEVELS[currentLevelIndex];
  const role = getCellRole(level, row, col);
  if (role !== "empty") {
    flashHint(removeMode ? "Only placed tiles can be removed." : "That square is fixed. Use open spaces for your route.");
    return;
  }

  const key = positionKey(row, col);
  const tile = placedTiles.get(key);

  if (removeMode) {
    if (!tile) {
      flashHint("No placed tile there. Click a path tile to return it to your kit.");
      return;
    }

    placedTiles.delete(key);
    inventory[tile.type] += 1;
    moves += 1;
    renderInventory();
    renderBoard();
    return;
  }

  if (tile) {
    const rotationCount = TILE_DEFS[tile.type].rotations.length;
    tile.rotation = (tile.rotation + 1) % rotationCount;
    moves += 1;
    renderBoard();
    checkWin();
    return;
  }

  if ((inventory[selectedTileType] || 0) <= 0) {
    flashHint("That tile is out. Pick another tile from the kit.");
    renderInventory();
    return;
  }

  placedTiles.set(key, { type: selectedTileType, rotation: 0 });
  inventory[selectedTileType] -= 1;
  moves += 1;
  renderInventory();
  renderBoard();
  checkWin();
}

function flashHint(message) {
  els.hintText.textContent = message;
  window.clearTimeout(els.hintText.dataset.timeoutId);
  const timeoutId = window.setTimeout(() => {
    els.hintText.textContent = LEVELS[currentLevelIndex].hint;
  }, 1700);
  els.hintText.dataset.timeoutId = String(timeoutId);
}

function updateStats() {
  const level = LEVELS[currentLevelIndex];
  els.moveCount.textContent = String(moves);
  els.goalCount.textContent = `${connectedTargets.size}/${level.targets.length}`;
}

function updateTimer() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  els.timer.textContent = `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function startTimer() {
  stopTimer();
  timerId = window.setInterval(() => {
    seconds += 1;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function loadLevel(index) {
  currentLevelIndex = index;
  selectedLevelIndex = index;
  const level = LEVELS[currentLevelIndex];
  placedTiles = new Map();
  inventory = cloneInventory(level);
  selectedTileType = Object.keys(TILE_DEFS).find((type) => inventory[type] > 0) || "straight";
  removeMode = false;
  connectedTargets = new Set();
  moves = 0;
  seconds = 0;
  gameWon = false;
  els.levelKicker.textContent = `Level ${level.id} / ${level.difficulty}`;
  els.levelTitle.textContent = level.title;
  els.themeLine.textContent = level.themeText;
  els.hintText.textContent = level.hint;
  els.winModal.classList.remove("is-open");
  els.winModal.setAttribute("aria-hidden", "true");
  updateTimer();
  renderInventory();
  renderBoard();
  showGame();
  startTimer();
}

function showGame() {
  els.startScreen.classList.remove("is-active");
  els.gameScreen.classList.add("is-active");
}

function showStart() {
  stopTimer();
  els.gameScreen.classList.remove("is-active");
  els.startScreen.classList.add("is-active");
  renderLevelCards();
}

function checkWin() {
  const level = LEVELS[currentLevelIndex];
  if (connectedTargets.size !== level.targets.length) return;
  gameWon = true;
  stopTimer();
  window.setTimeout(showWin, 250);
}

function calculateStars(level) {
  if (moves <= level.optimalMoves && seconds <= 90) return 3;
  if (moves <= level.optimalMoves + 3 && seconds <= 150) return 2;
  return 1;
}

function showWin() {
  const level = LEVELS[currentLevelIndex];
  const stars = calculateStars(level);
  els.stars.textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
  els.scoreLine.textContent = `${moves} moves in ${els.timer.textContent}. Optimal route: ${level.optimalMoves} moves.`;
  els.impactLine.textContent = level.impact;
  els.nextButton.textContent = currentLevelIndex === LEVELS.length - 1 ? "Back to Levels" : "Next Level";
  els.winModal.classList.add("is-open");
  els.winModal.setAttribute("aria-hidden", "false");
}

function goNext() {
  if (currentLevelIndex === LEVELS.length - 1) {
    showStart();
    return;
  }
  loadLevel(currentLevelIndex + 1);
}

els.startButton.addEventListener("click", () => loadLevel(selectedLevelIndex));
els.homeButton.addEventListener("click", showStart);
els.resetButton.addEventListener("click", () => loadLevel(currentLevelIndex));
els.replayButton.addEventListener("click", () => loadLevel(currentLevelIndex));
els.nextButton.addEventListener("click", goNext);

renderLevelCards();
