import test from 'node:test';
import assert from 'node:assert/strict';
import {
  makeScenario,
  planRoute,
  blockedCells,
  validateScenario,
  routeInstructions,
} from '../src/planner.js';

const empty = () => ({
  version: 1,
  title: 'Test room',
  width: 6,
  height: 6,
  cellSize: 0.5,
  cells: Array(36).fill(0),
  start: [1, 1],
  goal: [4, 4],
});
test('open grid finds a shortest route with known distance', () => {
  const r = planRoute(empty());
  assert.equal(r.status, 'ready');
  assert.equal(r.path.length, 7);
  assert.equal(r.cost, 6);
  assert.equal(r.distance, 3);
});
test('barrier makes the destination unreachable', () => {
  const s = empty();
  for (let y = 0; y < 6; y++) s.cells[y * 6 + 3] = 1;
  assert.equal(planRoute(s).status, 'blocked');
});
test('a single-cell opening works only with a point footprint', () => {
  const s = makeScenario('narrow-passage');
  assert.equal(planRoute(s).status, 'ready');
  assert.equal(planRoute(s, { clearance: 1 }).status, 'blocked');
});
test('clearance excludes boundary cells', () => {
  const s = empty();
  const b = blockedCells(s, 1);
  assert.equal(b[0], true);
  assert.equal(b[7], false);
});
test('clearance includes diagonal neighbors of obstacles', () => {
  const s = empty();
  s.cells[14] = 1;
  assert.equal(blockedCells(s, 1)[7], true);
});
test('rough-surface cost produces a longer smooth detour', () => {
  const s = empty();
  s.start = [0, 2];
  s.goal = [5, 2];
  for (let x = 1; x < 5; x++) s.cells[12 + x] = 2;
  const direct = planRoute(s, { roughCost: 1 });
  const detour = planRoute(s, { roughCost: 8 });
  assert.equal(direct.distance, 2.5);
  assert.equal(detour.distance, 3.5);
  assert.ok(detour.path.every(([x, y]) => s.cells[y * 6 + x] !== 2));
});
test('same endpoints require zero movement', () => {
  const s = empty();
  s.goal = [...s.start];
  const r = planRoute(s);
  assert.equal(r.cost, 0);
  assert.equal(r.distance, 0);
  assert.equal(r.turns, 0);
  assert.deepEqual(r.path, [s.start]);
});
test('planning does not mutate its input', () => {
  const s = makeScenario();
  const before = JSON.stringify(s);
  planRoute(s);
  assert.equal(JSON.stringify(s), before);
});
test('tie-breaking makes repeated routes reproducible', () =>
  assert.deepEqual(planRoute(empty()), planRoute(empty())));
test('segments merge consecutive headings', () =>
  assert.deepEqual(
    routeInstructions(
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
      ],
      0.5,
    ).map((x) => [x.heading, x.distance]),
    [
      ['east', 1],
      ['south', 0.5],
    ],
  ));
test('empty and stationary paths have no directions', () => {
  assert.deepEqual(routeInstructions([], 0.5), []);
  assert.deepEqual(routeInstructions([[1, 1]], 0.5), []);
});
test('validator rejects invalid dimensions and cell types', () => {
  assert.throws(() => validateScenario({ ...empty(), width: 100 }));
  assert.throws(() => validateScenario({ ...empty(), cells: Array(36).fill(7) }));
  assert.throws(() => validateScenario({ ...empty(), cells: [] }));
});
test('validator rejects blocked and out-of-bounds endpoints', () => {
  const s = empty();
  s.cells[7] = 1;
  assert.throws(() => validateScenario(s));
  assert.throws(() => validateScenario({ ...empty(), goal: [6, 1] }));
});
test('validator rejects non-finite geometry and unsupported versions', () => {
  assert.throws(() => validateScenario({ ...empty(), cellSize: Infinity }));
  assert.throws(() => validateScenario({ ...empty(), version: 2 }));
  assert.throws(() => validateScenario(null));
});
test('validated scenarios discard unrecognized metadata and copy cells', () => {
  const s = empty();
  const v = validateScenario({ ...s, secret: 'ignored' });
  v.cells[0] = 1;
  assert.equal(s.cells[0], 0);
  assert.equal(v.secret, undefined);
});
test('planner rejects fractional clearance and negative cost', () => {
  assert.throws(() => planRoute(empty(), { clearance: 0.5 }));
  assert.throws(() => planRoute(empty(), { roughCost: 0 }));
});
test('all sample scenarios have traversable point routes', () => {
  for (const kind of ['learning-centre', 'courtyard', 'narrow-passage'])
    assert.equal(planRoute(makeScenario(kind)).status, 'ready');
});
test('all path steps are adjacent and avoid occupied cells', () => {
  for (const kind of ['learning-centre', 'courtyard']) {
    const s = makeScenario(kind),
      r = planRoute(s, { clearance: 1 });
    assert.equal(r.status, 'ready');
    for (let i = 1; i < r.path.length; i++) {
      const [x, y] = r.path[i],
        p = r.path[i - 1];
      assert.equal(Math.abs(x - p[0]) + Math.abs(y - p[1]), 1);
      assert.equal(r.blocked[y * s.width + x], false);
    }
  }
});
// A separate breadth-first search is an oracle for the uniform-cost planner.
test('A* agrees with breadth-first search over 80 reproducible obstacle maps', () => {
  let seed = 718;
  const random = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  for (let trial = 0; trial < 80; trial++) {
    const s = empty();
    s.cells = s.cells.map(() => (random() < 0.23 ? 1 : 0));
    s.cells[7] = 0;
    s.cells[28] = 0;
    const queue = [[7, 0]],
      seen = new Set([7]);
    let optimum = null;
    for (let q = 0; q < queue.length; q++) {
      const [i, d] = queue[q];
      if (i === 28) {
        optimum = d;
        break;
      }
      const x = i % 6,
        y = Math.floor(i / 6);
      for (const [nx, ny] of [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ])
        if (nx >= 0 && ny >= 0 && nx < 6 && ny < 6) {
          const n = ny * 6 + nx;
          if (s.cells[n] !== 1 && !seen.has(n)) {
            seen.add(n);
            queue.push([n, d + 1]);
          }
        }
    }
    assert.equal(planRoute(s, { roughCost: 1 }).cost, optimum);
  }
});
