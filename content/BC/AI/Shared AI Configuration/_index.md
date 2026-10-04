+++
date = '2026-10-03T00:00:00+02:00'
title = 'Shared AI Configuration'
weight = 30
+++

I keep skills, agents and common instructions in [ai-config](https://github.com/addmecode/ai-config). Symbolic links let OpenCode, Codex and Claude Code use the same files.

## How to start

1. Clone [ai-config](https://github.com/addmecode/ai-config) and adjust `linked/memory/MEMORY.md` to your needs.
2. Check `config/links.psd1` and run `tools/Sync-AiConfig.ps1` to link skills and memory into your AI tools.
3. From the `ai-config` folder, link the OpenCode agents into your BC project:

```powershell
.\tools\Link-OpenCodeProject.ps1 -ProjectPath "..\my-bc-project"
```

4. Start a new OpenCode session in the BC project.

The script links the project's `.opencode` folder to `linked/agents/.opencode`. If another folder or link exists, it asks before replacing it. An already-correct link stays as it is.

Keep project documentation in the BC project.

## Skills

- `al-conventions` — naming, layout and general AL rules.
- `al-language-server` — finding AL code, diagnostics, compilation and publishing.
- `al-solution-architect` — planning objects and their responsibilities.
- `al-object-builder` — creating AL objects.
- `al-testing` — designing, writing and running tests.
- `al-integration` — HTTP, REST, OData and API integrations.
- `al-performance` — improving database access and processing.
- `al-upgrades` — upgrade codeunits and data migrations.

Agents use the parts of a skill needed for their role. For example, the test designer plans tests; the orchestrator runs them.

## Build, publish and test

For AL changes, the workflow runs these operations through the orchestrator: compile and publish the main app, then compile, publish and run tests for the test app if one exists.

- `Build-AlApp.ps1` — compiles the app.
- `Publish-AlApp.ps1` — publishes the built package using local launch settings.
- `Invoke-AlSaaSTests.ps1` — runs selected SaaS tests.

LSP/MCP helps find code and read diagnostics. Scripts handle compilation, publishing and test execution. The details are in `al-language-server` and `al-testing/references/run-tests.md`.

## Tips

- Use `-Quiet` for short output. Publish and SaaS test logs are saved in `.altool-logs`.
- The build script needs explicit analyzer and ruleset arguments through `-AdditionalArgs`.
- Global skill/memory links and project-agent links are set up separately.
- Install [BCQuality](https://github.com/microsoft/BCQuality) separately, then use the [review prompt]({{% relref "/BC/AI/Prompts/Create a BCQuality Report/_index.md" %}}) with its `al-code-review` skill.
