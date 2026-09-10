# Contributing to Accessible Route Lab

<!-- bilingual-support -->

[English](#english) · [Português](#português)

## English

Small, well-explained changes are welcome. Open an issue describing the problem, the people affected, and a reproducible example before proposing a substantial feature.

## Development

Use Node.js 22 or newer. There are no packages to install.

```sh
npm test
npm start
```

Keep domain logic independent of the browser. Add meaningful regression tests for changed behavior, check the demo with a keyboard, and include a narrow-screen check for interface changes. Imports must be validated before changing application state. Use synthetic examples; never attach personal records.

## Pull requests

Explain the behavior before and after the change, the relevant tests, and any limitation. Avoid unrelated formatting changes. Public documentation and interface text use both English and Portuguese. Contributions are distributed under the repository's MIT license.

## Collaboration

Listen to participants and practitioners. Describe access needs without stereotyping people. Respect requests to pause or withdraw from a discussion. Disagreement should address the work, without harassment or personal attacks.

## Português

### Desenvolvimento e contribuições

Mudanças pequenas e bem explicadas são bem-vindas. Antes de propor uma funcionalidade ampla, abra uma issue com o problema, as pessoas afetadas e um exemplo reproduzível.

Use Node.js 22 ou superior, sem instalar dependências. Execute `npm test` e `npm start`. Mantenha o domínio independente da interface, acrescente regressões relevantes e confira teclado e tela estreita quando alterar a apresentação. Valide importações antes de substituir o estado. Utilize dados sintéticos, sem registros pessoais.

Explique comportamento anterior e novo, testes e limitações na proposta. Evite reformatações sem relação com o problema. Documentação pública e interface devem oferecer inglês e português. As contribuições seguem a licença MIT do repositório.

Ouça participantes e profissionais, descreva necessidades sem estereótipos e respeite pausas ou retirada de discussões. Discordâncias devem tratar do trabalho, sem assédio ou ataques pessoais.
