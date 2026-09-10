import test from 'node:test';
import { examples, verifyExample } from '../scripts/check-examples.mjs';
for (const entry of examples) test('committed example: ' + entry.id, () => verifyExample(entry));
