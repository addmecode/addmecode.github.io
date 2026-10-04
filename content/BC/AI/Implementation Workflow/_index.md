+++
date = '2026-10-03T00:00:00+02:00'
title = 'Implementation Workflow'
weight = 10
+++

I keep the project description and the prompt for the AI in two separate files.

## Project files

- **Docs/project-doc.md** — what to build: requirements, design, tests and task plan.
- **Docs/agent-instruction.md** — what the orchestrator should do: task selection, required checks, Git rules and final report.

Agents describe the workflow. Skills explain how to do the technical work. Keep each instruction in one place and link to it from the other files.

## Starter project documents

- [project-doc.md]({{% relref "Project Documentation/_index.md" %}})
- [agent-instruction.md]({{% relref "Agent Instructions/_index.md" %}})

Copy the examples into your files in `Docs/` and adapt them to your project. Add or remove sections as needed. Set up the [shared agents and skills]({{% relref "../Shared AI Configuration/_index.md" %}}) before using them.

## How I use it

1. Describe the project and split the work into tasks in **project-doc.md**.
2. Set the rules in **agent-instruction.md**. In my case: one task per run, mark it DONE after successful checks, and do not commit changes.
3. Open the project in OpenCode and send the [implementation prompt]({{% relref "/BC/AI/Prompts/Implement the Next Task/_index.md" %}}).
4. Let the agents implement and review the task. The workflow compiles and publishes the main app. If a test app exists, it also compiles and publishes that app, then runs its tests.
5. Check the diff and the [suggested manual tests]({{% relref "/BC/AI/Prompts/Summarize Changes for a User/_index.md" %}}), then create the commit.

## Tips

- Task selection and status updates are project rules. Other projects can use a different task plan or no plan.
- Point to `app.json`, AL-Go settings and `launch.json` instead of copying their values into the prompt.
- Use the [change summary prompt]({{% relref "/BC/AI/Prompts/Summarize Changes for a User/_index.md" %}}) for a short summary and manual test steps.
