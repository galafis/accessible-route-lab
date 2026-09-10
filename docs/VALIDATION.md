# Validation record

<!-- bilingual-support -->

[English](#english) · [Português](#português)

## English

## Automated checks

The current version-1.1 suite contains 25 tests under `test/`. Domain behavior is tested independently from the interface. Run `npm test` to reproduce the results. The public workflow is the source of truth for the status of each commit.

The suite checks invalid inputs, boundary conditions, state isolation, deterministic behavior, and representative successful and unsuccessful user journeys. Tests exercise the real implementation; examples do not substitute for executable checks.

## Browser review

The release workflow includes a manual browser review of initial rendering, principal controls, status feedback, and responsive layout. This is a practical smoke check, not a formal accessibility certification. No field deployment or participant evaluation is represented by these checks.

## Review still needed

- Assistive-technology testing with screen readers and alternative input devices.
- Participant and practitioner feedback using an agreed review process.
- Broader browser and device coverage, including touch interaction.
- Review of documentation and terminology by people with relevant lived experience.

## Regression expectations

Every behavior change should include a focused test when it affects the domain contract. Interface changes should preserve visible focus, labeled controls, keyboard access, meaningful feedback, and the ability to stop or end an active experience.

## Português

### Verificações automatizadas

A suíte atual contém 25 testes em `test/`, incluindo as verificações de idioma e exemplos descritas abaixo. O domínio é verificado independentemente da interface. Execute `npm test`; o workflow público registra o resultado de cada commit.

Os testes verificam entradas inválidas, limites, isolamento de estado, determinismo e jornadas válidas e inválidas. Eles executam a implementação real; exemplos complementam, sem substituir, verificações automatizadas.

### Revisão de navegador e limites

A revisão manual de versão verifica renderização, controles principais, mensagens, teclado e layout responsivo. Isso não equivale a certificação de acessibilidade, teste com participantes ou implantação em campo.

Continuam necessárias avaliações com leitores de tela e entradas alternativas, participantes e profissionais sob processo acordado, mais navegadores e dispositivos e revisão de termos por pessoas com experiência relevante.

### Regressões

Mudanças no contrato de domínio devem receber teste focado. Alterações na interface devem preservar foco visível, rótulos, teclado, mensagens compreensíveis e a possibilidade de interromper ou encerrar uma experiência ativa.

## 1.1.0 review · Revisão 1.1.0

The current suite contains **25 tests**. / A suíte atual contém **25 testes**.

Added executable checks for every committed example and for translation of measurements, nested errors, accessible labels and built-in templates. Local DOM interaction checks verified route position, mission resource balances, edited invitations and paused session time across language changes. These presentation checks complement domain tests.

Foram acrescentadas verificações executáveis de todos os exemplos versionados e da tradução de medidas, erros, rótulos acessíveis e modelos. Verificações locais de interação no DOM confirmaram a preservação da posição da rota, dos recursos da missão, dos convites editados e do tempo pausado ao trocar o idioma. Essas verificações de apresentação complementam os testes de domínio.

See [worked results](EXPERIMENTS.md), [translation tests](../test/i18n.test.js) and [example tests](../test/examples.test.js). / Consulte [resultados comentados](EXPERIMENTS.md), [testes de tradução](../test/i18n.test.js) e [testes dos exemplos](../test/examples.test.js).
