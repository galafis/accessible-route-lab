import test from 'node:test';
import assert from 'node:assert/strict';
import { translate, localizedPlan } from '../src/i18n.js';
test('language formatting preserves measurements and unknown authored text', () => {
  assert.equal(translate('Step 2 of 9', 'pt'), 'Passo 2 de 9');
  assert.equal(translate('Go north for 1.5 m.', 'pt'), 'Siga para norte por 1.5 m.');
  assert.equal(translate('Custom participant wording', 'pt'), 'Custom participant wording');
  assert.equal(translate('Step 2 of 9', 'en'), 'Step 2 of 9');
});
test('nested feedback, punctuation and accessibility labels translate consistently', () => {
  assert.equal(
    translate('Could not import: Plan version must be 1.', 'pt'),
    'Não foi possível importar: A versão do plano deve ser 1.',
  );
  assert.equal(
    translate('Row 2, column 3: start, open floor, on route', 'pt'),
    'Linha 2, coluna 3: início, piso livre, na rota',
  );
  assert.equal(
    translate('Moved to Foyer at standard pace.', 'pt'),
    'Movimento para Saguão em ritmo normal.',
  );
  assert.equal(
    translate(
      'Current position: Foyer. Connected zones: Entry point, Classroom. Use the destination menu for movement.',
      'pt',
    ),
    'Posição atual: Saguão. Zonas conectadas: Ponto de entrada, Sala de aula. Use o menu de destino para mover.',
  );
});
test('localizing a built-in plan preserves source data and domain identifiers', () => {
  const original = {
    title: 'A gentle introduction',
    activities: [
      {
        id: 'step-1',
        title: 'Arrive and settle',
        description: 'Choose a comfortable place. Take as much time as you need.',
        minutes: 3,
        category: 'settle',
      },
    ],
  };
  const snapshot = structuredClone(original),
    output = localizedPlan(original, 'pt');
  assert.deepEqual(original, snapshot);
  assert.equal(output.title, 'Uma introdução tranquila');
  assert.equal(output.activities[0].title, 'Chegar e se acomodar');
  assert.equal(output.activities[0].id, 'step-1');
  assert.equal(output.activities[0].category, 'settle');
});
