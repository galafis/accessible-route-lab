# Research and evaluation plan

<!-- bilingual-support -->

[English](#english) · [Português](#português)

## English

## Question

How do footprint clearance, surface penalties, and route descriptions affect the inspectability of a simulated accessible route? This release supports software experiments addressing that question. It does not establish that a robot can guide a person safely.

## Reproducible experiments

| Experiment      | Change                   | Observe                                         |
| --------------- | ------------------------ | ----------------------------------------------- |
| Narrow passage  | Clearance 0 → 1          | Reachable route becomes blocked                 |
| Courtyard       | Rough cost 1 → 8         | Compare smooth detours with direct rough routes |
| Learning centre | Move destination         | Compare distance, turns, and directions         |
| Closed corridor | Place a complete barrier | No path; replay disabled                        |

Record the scenario JSON, selected clearance and rough cost, result, and a short interpretation. Distance and weighted cost answer different questions. A low-cost path is only optimal within the stated grid model.

## Development stages

1. **Software baseline — implemented:** bounded input contract, route engine, editable interface, textual directions, examples, tests, and export.
2. **Participatory review — proposed:** invite blind and low-vision contributors and orientation-and-mobility professionals to critique controls and route language. Agree on compensation, accessible materials, consent, and withdrawal arrangements before recruitment. No review sessions have been conducted by this project.
3. **Controlled hardware work — proposed:** confirm vendor-supported development access, define an adapter contract, characterize stopping behavior, and validate localization on a closed course with qualified supervision. Introduce hardware only after an explicit review of the intended operating conditions.

## Evidence and limitations

The test suite checks path continuity, obstacle avoidance, conservative clearance, input rejection, deterministic behavior, and agreement with an independent breadth-first oracle on 80 seeded uniform-cost maps. Those checks establish software properties; they do not measure human mobility outcomes. Dynamic obstacles, sensor uncertainty, turning radius, traction, slopes, moving people, and emergency braking are outside version 1.

The keyboard grid draws on the interaction pattern in the [W3C ARIA Authoring Practices grid guidance](https://www.w3.org/WAI/ARIA/apg/patterns/grid/). The [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) is an evaluation reference, not a conformance claim. A screen-reader and participant usability review remains open work.

## Português

### Pergunta e experimentos reproduzíveis

Como folga, penalidades do piso e descrições de rota afetam a possibilidade de inspecionar um percurso acessível simulado? Este software permite estudar essa pergunta, sem demonstrar orientação física segura.

| Experimento        | Alteração               | Observação                                        |
| ------------------ | ----------------------- | ------------------------------------------------- |
| Passagem estreita  | Folga 0 → 1             | Rota antes disponível fica bloqueada              |
| Pátio              | Custo irregular 1 → 8   | Comparar desvio liso com caminho irregular direto |
| Centro educacional | Mover destino           | Comparar distância, curvas e instruções           |
| Corredor fechado   | Criar barreira completa | Sem caminho; reprodução desabilitada              |

Guarde o JSON, os controles selecionados, o resultado e a interpretação. Distância e custo respondem a perguntas diferentes. O menor custo é ótimo apenas no modelo de grade declarado.

### Etapas de desenvolvimento

1. **Implementada:** validação limitada, planejador, edição, instruções textuais, exemplos, testes e exportação.
2. **Proposta:** revisão com pessoas cegas ou com baixa visão e profissionais de orientação e mobilidade. Antes do recrutamento, combinar remuneração, materiais acessíveis, consentimento e possibilidade de retirada. O projeto ainda não realizou essas sessões.
3. **Proposta:** confirmar acesso de desenvolvimento suportado pelo fabricante, definir contratos de observação, medir frenagem e validar localização em percurso fechado, com supervisão qualificada e condições de operação revisadas.

### Evidências e limites

A suíte verifica continuidade, obstáculos, folga conservadora, rejeição de entradas, determinismo e concordância com uma busca em largura independente em 80 mapas com semente fixa. São propriedades de software, sem medir resultados de mobilidade humana. Obstáculos dinâmicos, incerteza de sensores, raio de giro, aderência, inclinações, pessoas em movimento e frenagem de emergência ficam fora da versão 1.

O padrão de teclado considera o [guia de grades da W3C](https://www.w3.org/WAI/ARIA/apg/patterns/grid/). A [referência WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) orienta avaliação futura, sem declarar conformidade. Revisões com leitores de tela e participantes continuam pendentes.
