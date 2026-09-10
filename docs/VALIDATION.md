# Validation record

## Automated checks

The version-1 suite contains 19 tests under `test/`. Domain behavior is tested independently from the interface. Run `npm test` to reproduce the results. The public workflow is the source of truth for the status of each commit.

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
