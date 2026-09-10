/** Deterministic, four-connected A* planning over a synthetic occupancy grid. */
export function validateScenario(value) {
  if (!value || value.version !== 1) throw new Error('Scenario version must be 1.');
  const { width, height, cells, start, goal, cellSize } = value;
  if (![width, height].every((n) => Number.isInteger(n) && n >= 4 && n <= 40))
    throw new Error('Grid dimensions must be integers from 4 to 40.');
  if (
    !Array.isArray(cells) ||
    cells.length !== width * height ||
    !cells.every((n) => [0, 1, 2].includes(n))
  )
    throw new Error('Cells must contain exactly width × height values: 0, 1, or 2.');
  const point = (p) =>
    Array.isArray(p) &&
    p.length === 2 &&
    p.every(Number.isInteger) &&
    p[0] >= 0 &&
    p[1] >= 0 &&
    p[0] < width &&
    p[1] < height;
  if (!point(start) || !point(goal))
    throw new Error('Start and destination must be inside the grid.');
  if (cells[start[1] * width + start[0]] === 1 || cells[goal[1] * width + goal[0]] === 1)
    throw new Error('Start and destination must be on open cells.');
  if (!Number.isFinite(cellSize) || cellSize < 0.1 || cellSize > 2)
    throw new Error('Cell size must be between 0.1 and 2 metres.');
  const title = typeof value.title === 'string' ? value.title.trim().slice(0, 80) : 'Custom space';
  return {
    version: 1,
    title: title || 'Custom space',
    width,
    height,
    cellSize,
    cells: [...cells],
    start: [...start],
    goal: [...goal],
  };
}

/** A conservative square envelope also excludes cells too close to the map edge. */
export function blockedCells(scenario, radius = 0) {
  if (!Number.isInteger(radius) || radius < 0 || radius > 4)
    throw new Error('Clearance must be a whole number from 0 to 4 cells.');
  const { width, height, cells } = scenario;
  return cells.map((_, index) => {
    const x = index % width,
      y = Math.floor(index / width);
    for (let dy = -radius; dy <= radius; dy++)
      for (let dx = -radius; dx <= radius; dx++) {
        const nx = x + dx,
          ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height || cells[ny * width + nx] === 1)
          return true;
      }
    return false;
  });
}

export function planRoute(input, { clearance = 0, roughCost = 4 } = {}) {
  const scenario = validateScenario(input);
  if (!Number.isFinite(roughCost) || roughCost < 1 || roughCost > 20)
    throw new Error('Rough-surface cost must be between 1 and 20.');
  const blocked = blockedCells(scenario, clearance);
  const { width, height, cells, start, goal } = scenario;
  const origin = start[1] * width + start[0],
    target = goal[1] * width + goal[0];
  const unavailable = (reason) => ({
    status: 'blocked',
    reason,
    path: [],
    visited: [],
    cost: null,
    distance: 0,
    turns: 0,
    blocked,
  });
  if (blocked[origin] || blocked[target])
    return unavailable(
      'The clearance envelope covers the start or destination. Move an endpoint or reduce clearance.',
    );
  const heuristic = (i) =>
    Math.abs((i % width) - goal[0]) + Math.abs(Math.floor(i / width) - goal[1]);
  const distance = new Float64Array(cells.length).fill(Infinity);
  const previous = new Int32Array(cells.length).fill(-1);
  const open = new Set([origin]),
    closed = new Set(),
    visited = [];
  distance[origin] = 0;
  while (open.size) {
    let current = -1,
      best = Infinity;
    for (const index of open) {
      const score = distance[index] + heuristic(index);
      if (score < best || (score === best && index < current)) {
        current = index;
        best = score;
      }
    }
    open.delete(current);
    closed.add(current);
    visited.push(current);
    if (current === target) {
      const path = [];
      for (let i = target; i !== -1; i = previous[i]) path.push([i % width, Math.floor(i / width)]);
      path.reverse();
      const instructions = routeInstructions(path, scenario.cellSize);
      return {
        status: 'ready',
        reason: 'Route calculated.',
        path,
        visited,
        cost: distance[target],
        distance: (path.length - 1) * scenario.cellSize,
        turns: Math.max(0, instructions.length - 1),
        blocked,
      };
    }
    const x = current % width,
      y = Math.floor(current / width);
    for (const [nx, ny] of [
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
    ]) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const next = ny * width + nx;
      if (blocked[next] || closed.has(next)) continue;
      const candidate = distance[current] + (cells[next] === 2 ? roughCost : 1);
      if (candidate < distance[next]) {
        distance[next] = candidate;
        previous[next] = current;
        open.add(next);
      }
    }
  }
  const result = unavailable(
    'No route fits the current map and clearance. Try opening a wider passage.',
  );
  result.visited = visited;
  return result;
}

export function routeInstructions(path, cellSize) {
  const segments = [];
  for (let i = 1; i < path.length; i++) {
    const dx = path[i][0] - path[i - 1][0],
      dy = path[i][1] - path[i - 1][1];
    const heading = dx > 0 ? 'east' : dx < 0 ? 'west' : dy > 0 ? 'south' : 'north';
    const last = segments.at(-1);
    if (last?.heading === heading) last.steps++;
    else segments.push({ heading, steps: 1 });
  }
  return segments.map((segment) => ({
    ...segment,
    distance: segment.steps * cellSize,
    text: `Go ${segment.heading} for ${(segment.steps * cellSize).toFixed(1)} m.`,
  }));
}

export function makeScenario(kind = 'learning-centre') {
  const width = 20,
    height = 14,
    cells = Array(width * height).fill(0);
  const wall = (x, y) => {
    cells[y * width + x] = 1;
  };
  let title = 'Learning centre';
  if (kind === 'courtyard') {
    title = 'Shared courtyard';
    for (let y = 4; y <= 9; y++) for (let x = 7; x <= 11; x++) wall(x, y);
    for (let y = 2; y <= 3; y++) for (let x = 4; x <= 15; x++) cells[y * width + x] = 2;
  } else if (kind === 'narrow-passage') {
    title = 'Narrow passage';
    for (let y = 0; y < height; y++) if (y !== 7) wall(10, y);
  } else {
    for (let y = 0; y <= 9; y++) if (y < 4 || y > 6) wall(7, y);
    for (let y = 4; y < height; y++) if (y < 9 || y > 11) wall(13, y);
    for (let y = 2; y <= 4; y++) for (let x = 9; x <= 11; x++) cells[y * width + x] = 2;
  }
  return validateScenario({
    version: 1,
    title,
    width,
    height,
    cells,
    start: [2, 7],
    goal: [17, 7],
    cellSize: 0.5,
  });
}
