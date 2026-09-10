<div align="center">

![Accessible Route Lab](assets/banner.svg)

# Accessible Route Lab

**Explore accessible routes before a robot moves.**

[Open the live demo](https://galafis.github.io/accessible-route-lab/) · [Technical design](docs/ARCHITECTURE.md) · [Project guide](docs/RESEARCH.md) · [Contribute](CONTRIBUTING.md)

[![Checks](https://github.com/galafis/accessible-route-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/galafis/accessible-route-lab/actions/workflows/ci.yml)
![License: MIT](https://img.shields.io/badge/license-MIT-52665e)
![Runtime dependencies: 0](https://img.shields.io/badge/runtime_dependencies-0-52665e)

</div>

An interactive workbench for studying how obstacles, surface cost, and platform clearance affect a route. Edit a synthetic map, compare constraints, inspect written directions, and replay the result in the browser.

## Why this exists

Accessible mobility research begins with questions about people and space. This project makes a small, inspectable part of that work available now: comparing routes and understanding when a passage cannot accommodate a chosen footprint. The intended longer-term application includes supervised robotics research with blind and low-vision people.

## What works today

| Capability | Implementation |
|---|---|
| Deterministic route planning | Four-connected A* with Manhattan distance, stable tie-breaking, and configurable rough-surface cost. |
| Clearance experiments | Obstacle inflation using a conservative square envelope, including map-edge clearance. |
| Editable maps | Place obstacles, rough surfaces, start points, and destinations using a pointer or keyboard. |
| Inspectable results | Distance, direction changes, weighted cost, written compass directions, and step-by-step replay. |
| Portable experiments | Versioned JSON import/export, strict input validation, and three built-in scenarios. |

## Try it in two minutes

1. Open **Narrow passage**. With the point footprint, the route passes through the opening.
2. Set clearance to **Small envelope**. The route becomes unavailable.
3. Select **Open floor** and widen the passage, or compare the other spaces.
4. Use **Next step** to inspect movement, then export the experiment.

## Run locally

Use **Node.js 22 or newer**. No dependency installation, keys, or account is required.

```sh
git clone https://github.com/galafis/accessible-route-lab.git
cd accessible-route-lab
npm test
npm start
```

Open **http://127.0.0.1:4173**. The included development server listens only on your machine. Set the `PORT` environment variable if that port is already in use. The demo is a static application; it can also be hosted by any ordinary static web server. Open it over HTTP, rather than directly from a file, so browser modules load correctly.

## Project structure

```text
src/planner.js       Pure domain logic and validation
src/app.js             Browser interaction and rendering
src/browser.js         Import, export, and text escaping
test/                  Behavioral regression tests
examples/              Synthetic, versioned JSON examples
docs/                  Architecture, evaluation, and facilitator material
scripts/serve.mjs       Local static development server
.github/workflows/     Linux and Windows checks on Node 22 and 24
```

## Verification

The initial release includes **19 automated tests**. Run `npm test` for the behavioral suite or `npm run test:coverage` for a local coverage report. The workflow runs the same suite on Linux and Windows with Node 22 and 24. See [validation notes](docs/VALIDATION.md) for the tested properties and remaining review work.

## Status and boundaries

This release is a working software simulation. It has no robot connection, live localization, obstacle sensor input, or validated guidance capability. Coordinates, surfaces, and route costs are synthetic. It is not suitable for directing a person through a physical environment.

This is an independent project by **Gabriel Demetrios Lafis**. It does not claim endorsement by a hardware vendor, university, emergency service, or clinical organization. Institutional contact: **gabrieldemetrioslafis@usp.br**.

## Related open projects

[Rescue Scenario Lab](https://github.com/galafis/rescue-scenario-lab) · [Inclusive Session Studio](https://github.com/galafis/inclusive-session-studio)

The projects form a small portfolio for accessible mobility research, rescue education, and inclusive activity planning. They share a commitment to inspectable software and clear limits on demonstrated capability.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). The source and documentation are available under the [MIT license](LICENSE). Suggestions from people with lived experience and relevant practitioners are especially welcome.
