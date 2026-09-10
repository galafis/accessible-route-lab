import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import assert from 'node:assert/strict';
import * as domain from '../src/planner.js';
const root = new URL('../', import.meta.url);
export const examples = JSON.parse(await readFile(new URL('examples/index.json', root), 'utf8'));
export async function verifyExample(entry) {
  const input = JSON.parse(await readFile(new URL('examples/' + entry.file, root), 'utf8'));
  const expected = JSON.parse(await readFile(new URL('examples/' + entry.expected, root), 'utf8'));
  let actual;
  actual = [0, 1].map((clearance) => {
    const r = domain.planRoute(input, { clearance, roughCost: 4 });
    return {
      clearance,
      roughCost: 4,
      status: r.status,
      distance: r.distance,
      cost: r.cost,
      turns: r.turns,
      path: r.path,
    };
  });
  assert.deepEqual(actual, expected, entry.id);
  return actual;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  for (const entry of examples) await verifyExample(entry);
  console.log(examples.length + ' verified examples / exemplos verificados.');
}
