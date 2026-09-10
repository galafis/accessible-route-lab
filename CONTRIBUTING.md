# Contributing to Accessible Route Lab

Small, well-explained changes are welcome. Open an issue describing the problem, the people affected, and a reproducible example before proposing a substantial feature.

## Development

Use Node.js 22 or newer. There are no packages to install.

```sh
npm test
npm start
```

Keep domain logic independent of the browser. Add meaningful regression tests for changed behavior, check the demo with a keyboard, and include a narrow-screen check for interface changes. Imports must be validated before changing application state. Use synthetic examples; never attach personal records.

## Pull requests

Explain the behavior before and after the change, the relevant tests, and any limitation. Avoid unrelated formatting changes. Public documentation and interface text use English. Contributions are distributed under the repository's MIT license.

## Collaboration

Listen to participants and practitioners. Describe access needs without stereotyping people. Respect requests to pause or withdraw from a discussion. Disagreement should address the work, without harassment or personal attacks.
