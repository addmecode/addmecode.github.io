+++
date = '2026-10-03T00:00:00+02:00'
title = 'Verification and Code Review'
weight = 40
+++

I check changes during implementation and with a separate BCQuality review.

## During implementation

1. `al-implementer` checks its own changes.
2. `orchestrator` runs the checks required by `Docs/agent-instruction.md` and compiles and publishes the main app. If a test app exists, it compiles and publishes that app, then runs its tests.
3. `al-reviewer` reviews the changed files and tests against the requirements.
4. The implementer fixes findings, then affected checks are run again.

In my project, a task is marked `DONE` only after all required checks pass and review findings are resolved. If something fails or cannot run, the report explains what is left to do.

## BCQuality review

I use [BCQuality](https://github.com/microsoft/BCQuality) for a broader review from time to time.

1. Update the plugin and start a new session.
2. Use the [BCQuality report prompt]({{% relref "/BC/AI/Prompts/Create a BCQuality Report/_index.md" %}}) to review uncommitted changes without editing code.
3. Save the findings in `Docs/bcquality-cr-YYYYMMDD-HHmm.md`.
4. In a new session, use the [fix findings prompt]({{% relref "/BC/AI/Prompts/Fix Review Findings/_index.md" %}}) to compare the findings with `Docs/project-doc.md` and fix the applicable ones.

Use the [change summary prompt]({{% relref "/BC/AI/Prompts/Summarize Changes for a User/_index.md" %}}) to get a short explanation and manual test steps before checking the result yourself.
