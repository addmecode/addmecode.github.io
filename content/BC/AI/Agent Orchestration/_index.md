+++
date = '2026-10-03T00:00:00+02:00'
title = 'Agent Orchestration'
weight = 20
+++

I use one main agent to manage the task and four agents for specific parts of the work.

## Agents

- `orchestrator` — reads the project prompt, assigns work, runs the required checks and reports the result.
- `explore` — finds the relevant files, requirements and existing tests.
- `al-test-designer` — suggests test cases and checks existing coverage.
- `al-implementer` — changes the assigned files, adds tests and checks its own work.
- `al-reviewer` — reviews the changes against the requirements.

Only `al-implementer` writes code. Explore, test design and review are read-only. Compilation, publishing and running tests belong to the orchestrator.

## How it works

Start with the [implementation prompt]({{% relref "/BC/AI/Prompts/Implement the Next Task/_index.md" %}}) or [a specific change]({{% relref "/BC/AI/Prompts/Implement a Specific Change/_index.md" %}}).

1. The orchestrator reads **Docs/agent-instruction.md** and identifies the task.
2. Explore prepares a short brief. The other agents reuse it.
3. The test designer suggests tests when needed, then the implementer makes the changes.
4. The orchestrator compiles and publishes the main app. If a test app exists, it compiles and publishes that app and runs its tests. It then asks the reviewer to review the result.
5. Findings go back to the same implementer. After corrections, only affected checks are repeated.

Task selection, DONE updates and Git rules come from the project prompt.

## Configuration

The agents definitions are in `linked/agents/.opencode/agents/` in [ai-config](https://github.com/addmecode/ai-config). The shared `opencode.jsonc` sets `orchestrator` as the default agent.

Use [Link-OpenCodeProject.ps1]({{% relref "../Shared AI Configuration/_index.md" %}}) to link the bundle into your project. Editing a linked agent changes it for all linked projects.
