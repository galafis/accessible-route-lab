import { initializeLocalization } from './i18n.js';
import { makeScenario, validateScenario, planRoute, routeInstructions } from './planner.js';
import { downloadJSON, readJSONFile } from './browser.js';

const $ = (id) => document.getElementById(id);
let scenario = makeScenario(),
  tool = 'wall',
  result,
  step = 0,
  timer,
  focusIndex = 0;
const stop = () => {
  clearInterval(timer);
  timer = null;
  $('play').textContent = 'Play route';
};
function draw() {
  const active = result?.path[step];
  const route = new Set(result?.path.map(([x, y]) => y * scenario.width + x));
  const fragment = document.createDocumentFragment();
  for (let y = 0; y < scenario.height; y++) {
    const row = document.createElement('div');
    row.className = 'grid-row';
    row.setAttribute('role', 'row');
    row.style.setProperty('--columns', scenario.width);
    for (let x = 0; x < scenario.width; x++) {
      const i = y * scenario.width + x,
        button = document.createElement('button');
      const isStart = x === scenario.start[0] && y === scenario.start[1],
        isGoal = x === scenario.goal[0] && y === scenario.goal[1],
        robot = active && active[0] === x && active[1] === y;
      const terrain = scenario.cells[i] === 1 ? 'wall' : scenario.cells[i] === 2 ? 'rough' : '';
      button.className = [
        'cell',
        terrain,
        result?.blocked[i] && terrain !== 'wall' ? 'buffer' : '',
        route.has(i) ? 'route' : '',
        isStart ? 'start' : '',
        isGoal ? 'goal' : '',
        robot ? 'robot' : '',
      ]
        .filter(Boolean)
        .join(' ');
      button.textContent = robot ? '●' : isStart ? 'S' : isGoal ? 'G' : '';
      button.dataset.index = i;
      button.tabIndex = i === focusIndex ? 0 : -1;
      button.setAttribute('role', 'gridcell');
      button.setAttribute(
        'aria-label',
        `Row ${y + 1}, column ${x + 1}: ${isStart ? 'start, ' : ''}${isGoal ? 'destination, ' : ''}${terrain === 'wall' ? 'obstacle' : terrain === 'rough' ? 'rough surface' : 'open floor'}${route.has(i) ? ', on route' : ''}${robot ? ', current position' : ''}${result?.blocked[i] && terrain !== 'wall' ? ', within clearance envelope' : ''}`,
      );
      row.append(button);
    }
    fragment.append(row);
  }
  $('map').replaceChildren(fragment);
  $('map').setAttribute('aria-rowcount', scenario.height);
  $('map').setAttribute('aria-colcount', scenario.width);
  $('clearance').options[1].textContent =
    `Small envelope · 1 cell / ${scenario.cellSize.toFixed(1)} m`;
  $('clearance').options[2].textContent =
    `Wide envelope · 2 cells / ${(2 * scenario.cellSize).toFixed(1)} m`;
  $('map-title').textContent = scenario.title;
  $('map-scale').textContent = `${scenario.cellSize} m per cell · north ↑`;
  const unavailable = result.status !== 'ready' || result.path.length <= 1;
  $('play').disabled = unavailable;
  $('step').disabled = unavailable || step >= result.path.length - 1;
  $('progress').textContent =
    result.status === 'ready' ? `Step ${step} of ${result.path.length - 1}` : 'No route to replay';
}
function calculate() {
  stop();
  step = 0;
  result = planRoute(scenario, {
    clearance: Number($('clearance').value),
    roughCost: Number($('rough-cost').value),
  });
  $('status').textContent = result.reason;
  $('distance').textContent = result.status === 'ready' ? `${result.distance.toFixed(1)} m` : '—';
  $('turns').textContent = result.status === 'ready' ? result.turns : '—';
  $('cost').textContent = result.cost ?? '—';
  $('directions').replaceChildren(
    ...routeInstructions(result.path, scenario.cellSize).map((item) => {
      const li = document.createElement('li');
      li.textContent = item.text;
      return li;
    }),
  );
  if (result.path.length === 1)
    $('status').textContent = 'Already at the destination. No movement is needed.';
  draw();
}
function advance() {
  if (step < result.path.length - 1) step++;
  if (step >= result.path.length - 1) {
    stop();
    $('status').textContent = 'Replay complete. The simulated position reached the destination.';
  }
  draw();
}
$('map').addEventListener('click', (event) => {
  const button = event.target.closest('[data-index]');
  if (!button) return;
  const i = Number(button.dataset.index),
    x = i % scenario.width,
    y = Math.floor(i / scenario.width);
  focusIndex = i;
  if (tool === 'start' || tool === 'goal') {
    if (scenario.cells[i] === 1) {
      $('status').textContent = 'Choose an open cell for this endpoint.';
      return;
    }
    scenario[tool] = [x, y];
  } else {
    if ([scenario.start, scenario.goal].some((p) => p[0] === x && p[1] === y) && tool === 'wall') {
      $('status').textContent = 'Move the endpoint before placing an obstacle here.';
      return;
    }
    scenario.cells[i] = tool === 'wall' ? 1 : tool === 'rough' ? 2 : 0;
  }
  calculate();
  $('map').querySelector(`[data-index="${i}"]`).focus();
});
$('map').addEventListener('keydown', (event) => {
  const deltas = {
    ArrowUp: -scenario.width,
    ArrowDown: scenario.width,
    ArrowLeft: -1,
    ArrowRight: 1,
  };
  if (!(event.key in deltas)) return;
  event.preventDefault();
  const current = Number(event.target.dataset.index);
  if (
    (event.key === 'ArrowLeft' && current % scenario.width === 0) ||
    (event.key === 'ArrowRight' && current % scenario.width === scenario.width - 1)
  )
    return;
  const next = current + deltas[event.key];
  if (next < 0 || next >= scenario.cells.length) return;
  event.target.tabIndex = -1;
  focusIndex = next;
  const cell = $('map').querySelector(`[data-index="${next}"]`);
  cell.tabIndex = 0;
  cell.focus();
});
$('tools').addEventListener('click', (event) => {
  const button = event.target.closest('[data-tool]');
  if (!button) return;
  tool = button.dataset.tool;
  for (const item of $('tools').children)
    item.setAttribute('aria-pressed', String(item === button));
});
$('scenario').onchange = () => {
  scenario = makeScenario($('scenario').value);
  $('map-title').removeAttribute('data-verbatim');
  focusIndex = 0;
  calculate();
};
$('reset').onclick = () => {
  scenario = makeScenario($('scenario').value);
  $('map-title').removeAttribute('data-verbatim');
  focusIndex = 0;
  calculate();
};
$('plan').onclick = calculate;
$('clearance').onchange = calculate;
$('rough-cost').onchange = calculate;
$('play').onclick = () => {
  if (timer) {
    stop();
    return;
  }
  if (step >= result.path.length - 1) step = 0;
  $('play').textContent = 'Pause route';
  timer = setInterval(advance, 500);
};
$('step').onclick = () => {
  stop();
  advance();
};
$('rewind').onclick = () => {
  stop();
  step = 0;
  draw();
};
$('export').onclick = () =>
  downloadJSON('route-experiment.json', {
    ...scenario,
    experiment: {
      clearance: Number($('clearance').value),
      roughCost: Number($('rough-cost').value),
      status: result.status,
      path: result.path,
      distance: result.distance,
      cost: result.cost,
    },
  });
$('import').onclick = async () => {
  try {
    const next = validateScenario(await readJSONFile($('import-file').files[0]));
    scenario = next;
    $('map-title').setAttribute('data-verbatim', '');
    focusIndex = 0;
    calculate();
    $('status').textContent = `Loaded ${scenario.title}. ${result.reason}`;
  } catch (error) {
    $('status').textContent = `Could not import: ${error.message}`;
  }
};
calculate();

initializeLocalization();
