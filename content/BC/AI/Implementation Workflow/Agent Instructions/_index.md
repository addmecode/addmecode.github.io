+++
date = '2026-10-04T00:00:00+02:00'
title = 'agent-instruction.md'
weight = 20
+++

Copy this example to `Docs/agent-instruction.md` and adjust the rules to your project. Then use the [implementation prompt]({{% relref "/BC/AI/Prompts/Implement the Next Task/_index.md" %}}).

```markdown
# [PROJECT_NAME] — Orchestrator Prompt

Save this template as `Docs/agent-instruction.md`. Adapt it and remove this
introduction before use. It is an example prompt for a one-task Delivery Plan
workflow; task selection, status updates, gates, and reporting are project choices.
Replace these sections if your project uses a different workflow or no task plan.
Link the shared `.opencode` agent bundle with `tools/Link-OpenCodeProject.ps1` and
configure global skills separately.

## Objective and sources

Implement the assigned project scope described in `Docs/project-doc.md`, using
the shared execution workflow in `.opencode/agents/orchestrator.md`.

Use the existing configuration as the source of truth for execution settings:

- `.AL-Go/settings.json`: actual application/test folders and CI analyzers;
- [PROJECT_RULESET_PATH] and applicable `.vscode/settings.json`: analyzer rules;
- configured projects' `app.json`: identity, versions, dependencies, and ID ranges;
- [APP_PROJECT]/.vscode/launch.json: local application publication context;
- [TEST_PROJECT]/.vscode/launch.json: local test publication/execution context;
- [CI_WORKFLOW_PATHS]: independent repository checks.

Replace these paths with your project's sources. Do not copy private deployment
identifiers or credentials into this prompt. Read only relevant design sections
and configuration. Ask the developer about material ambiguities or discrepancies
before changing affected behavior; do not invent product or architecture decisions.

## Task selection and run scope — example project policy

1. Read the Delivery Plan in `Docs/project-doc.md`.
2. Select the explicitly requested task; otherwise select the first task in plan
   order whose status is not `DONE`.
3. Skip completed tasks. If the explicitly requested task is `DONE`, report that
   fact and ask whether a correction is intended. If every task is `DONE`, report
   that the plan is complete and make no implementation changes.
4. Verify required dependencies are complete. If not, report the blocker and ask
   for direction rather than selecting another task or implementing the dependency.
5. Read the selected task's design references and acceptance criteria. Implement
   only that task and strictly necessary supporting changes; stop after one task.
   Do not implement behavior deliberately assigned to later tasks.

## Required completion gates — adapt to the project

- Acceptance: selected task deliverables and the project requirements it references.
- Diagnostics/compilation: [REQUIRED_PROJECTS_ANALYZERS_AND_SUCCESS_CRITERIA].
- Publication: [WHEN_REQUIRED_AND_APPLICABLE_LOCAL_LAUNCH_CONFIGURATION].
- Automated tests: [REQUIRED_BEHAVIORS_CODEUNITS_METHODS_AND_SUCCESS_CRITERIA].
- Independent review: exact final scope; no unresolved in-scope findings.
- Manual-route evidence: [REQUIRED_REACHABLE_ENTRY_POINTS_OR_ACCEPTABLE_FUTURE_TASK_LIMITATIONS].
- Documentation/configuration-only checks: [REFERENCE_SYNTAX_AND_CONSISTENCY_CHECKS].
- Other deliverables: [NON_AL_OR_UPGRADE_CHECKS_WHEN_APPLICABLE].

Resolve every applicable placeholder before implementation. Specify which gates
are required or not applicable; the presence of a launch configuration alone is
not a publication requirement. Technical validation procedures belong to the
shared skills and execution ownership belongs to the agents.

CI is a separate repository gate. Report it as pending unless an actual applicable
run confirms success; this prompt does not authorize commits or pushes to obtain it.

## Completion action — example project policy

Set only the selected task's status in `Docs/project-doc.md` to `DONE` after
acceptance criteria and all required gates pass and review findings are resolved.
Leave the status unchanged for incomplete, failing, blocked, or unresolved work.
Report any outstanding checks and external blockers. Remove this action if the
project does not require the agent to maintain task statuses.

## Final report — example project requirements

1. **Business impact:** what users can now do, changed business behavior, and limitations.
2. **Task and files:** selected task ID, main changed files, and completion action.
3. **Validation:** actual check results, named codeunit/test-method outcomes, and
   scoped review outcome. Identify pending or blocked checks and why.
4. **Assumptions and risks:** unresolved decisions, residual risks, and coverage gaps.
5. **Manual verification:** actual entry point, permissions, prerequisites, steps,
   and expected results. If no route is reachable, identify the missing entry point,
   whether it belongs to later work or is an in-scope gap, and the available
   automated-test alternative by codeunit/method, or state that none exists.

## Git policy — example project policy

Do not commit, push, amend, reset, discard, or overwrite the developer's existing
work. Preserve unrelated changes and existing staging. The developer reviews the
working tree and creates the commit. Add project branch/PR/commit conventions here
when needed; they do not independently authorize Git operations during this run.
```
