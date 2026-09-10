# Research and evaluation plan

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
