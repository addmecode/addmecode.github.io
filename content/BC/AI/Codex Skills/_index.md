+++
date = '2026-02-13T21:00:00+01:00'
title = 'Codex Skills'
+++

Codex skills combine instructions, references, and optional scripts so Codex can run a specific workflow more reliably.

Official documentation: [Codex Skills](https://developers.openai.com/codex/skills)

## How to create a new skill

The recommended way is to use built-in skill creator:
```bash
$skill-creator
```

You can also create a skill manually by adding a folder with `SKILL.md` that includes:
- `name`
- `description`
- instructions for Codex

## My skills

Skills that I use are available here: [addmecode/codex-skills](https://github.com/addmecode/codex-skills)

- al-conventions
\
Baseline AL conventions for naming, structure, extension-safe patterns, and code review quality.
- al-object-builder
\
Builds AL objects with consistent naming, file layout and ID allocation.
- al-solution-architect
\
Supports AL solution design before implementation.
- al-integration
\
Covers AL integrations over HTTP/HTTPS, REST, and OData.
- al-performance
\
Focuses on AL performance tuning.
- al-testing
\
Designs and reviews AL tests.
- al-upgrades
\
Implements and reviews safe AL upgrade codeunits.
