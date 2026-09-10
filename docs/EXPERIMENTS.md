# Worked examples · Exemplos comentados

[English](#english) · [Português](#português)

## English

These are complete synthetic inputs and committed expected results. Run `npm run examples` from the repository root; every case is also part of `npm test`. A mismatch exits unsuccessfully instead of silently updating the expected answer. Inspect and justify changed outputs before replacing fixtures.

Import an input through the browser, select rough-surface penalty 4 and compare clearance 0 with 1. Physical distance and weighted cost are separate measurements of the grid model. A blocked path has zero distance and null cost.

## Português

As entradas sintéticas são completas e acompanham resultados esperados versionados. Execute `npm run examples` na raiz; cada caso também faz parte de `npm test`. Uma divergência encerra a verificação com falha, sem atualizar silenciosamente a resposta esperada. Inspecione e justifique mudanças antes de substituir os resultados.

Importe um cenário, selecione penalidade de piso 4 e compare folga 0 com 1. Distância e custo ponderado medem propriedades diferentes do modelo. Um caminho bloqueado tem distância zero e custo null.

## Inputs and results · Entradas e resultados

| Scenario · Cenário                                                            | Input · Entrada                                          | Result · Resultado                                               | Expected evidence · Evidência esperada                                    |
| ----------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Learning-centre route<br>Rota no centro educacional                           | [learning-centre.json](../examples/learning-centre.json) | [Expected / Esperado](../examples/learning-centre.expected.json) | clearance=0: ready; 10.5 m; cost=21 / clearance=1: ready; 11.5 m; cost=23 |
| Courtyard with surface penalties<br>Pátio com penalidades de superfície       | [courtyard.json](../examples/courtyard.json)             | [Expected / Esperado](../examples/courtyard.expected.json)       | clearance=0: ready; 10.5 m; cost=21 / clearance=1: ready; 11.5 m; cost=23 |
| Passage blocked by a wider envelope<br>Passagem bloqueada pelo envelope maior | [narrow-passage.json](../examples/narrow-passage.json)   | [Expected / Esperado](../examples/narrow-passage.expected.json)  | clearance=0: ready; 7.5 m; cost=15 / clearance=1: blocked; 0 m; cost=null |

JSON field names and state codes remain stable across display languages. / Nomes de campos e códigos de estado JSON permanecem iguais nos dois idiomas.

No result is a hardware measurement or a participant outcome. / Nenhum resultado representa medição de hardware ou resultado com participantes.
