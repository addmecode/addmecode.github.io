+++
date = '2026-01-09T21:18:48+01:00'
title = 'AI'
weight = 30
mermaidInitialize = '{ "htmlLabels": false, "flowchart": { "htmlLabels": false } }'
+++

I use OpenCode, describe the project, [give the agents a task]({{% relref "/BC/AI/Prompts/Implement the Next Task/_index.md" %}}), then check the changes before committing.

1. Project documentation is described in [project-doc.md]({{% relref "/BC/AI/Implementation Workflow/Project Documentation/_index.md" %}})
2. Prompt is saved in [agent-instruction.md]({{% relref "/BC/AI/Implementation Workflow/Agent Instructions/_index.md" %}})
3. Agents describe the workflow
4. Skills explain how to do the technical work

## What you need

- [OpenCode](https://opencode.ai/) — the tool to run the agents.
- [ai-config](https://github.com/addmecode/ai-config) — shared agents, AL skills, scripts and common instructions.
- [project-doc.md]({{% relref "/BC/AI/Implementation Workflow/Project Documentation/_index.md" %}}) — the project description, requirements and task plan.
- [agent-instruction.md]({{% relref "/BC/AI/Implementation Workflow/Agent Instructions/_index.md" %}}) — the project prompt: task selection, checks, Git rules and final report.
- [AL Language extension](https://marketplace.visualstudio.com/items?itemName=ms-dynamics-smb.al) — AL tooling used by the scripts.
- [BCQuality](https://github.com/microsoft/BCQuality) — the Microsoft's al-code-review skill for broader reviews.



## Files

`->` means a symbolic link. `App/` is an example folder name.

```text
BC project/
├── Docs/
│   ├── project-doc.md
│   ├── agent-instruction.md
│   └── bcquality-cr-YYYYMMDD-HHmm.md
├── .opencode/ -> ai-config/linked/agents/.opencode/
├── App/                   # app.json, launch.json and AL code
├── Test/                  # Test app and launch.json
└── .AL-Go/settings.json

ai-config/
├── linked/
│   ├── agents/.opencode/  # Agent definitions and opencode.jsonc
│   ├── skills/            # AL instructions and scripts
│   └── memory/MEMORY.md   # Common instructions
└── tools/
    ├── Sync-AiConfig.ps1
    └── Link-OpenCodeProject.ps1
```



## Workflow

### Implement a task

Use the [implementation prompt]({{% relref "/BC/AI/Prompts/Implement the Next Task/_index.md" %}}), or [describe a specific change]({{% relref "/BC/AI/Prompts/Implement a Specific Change/_index.md" %}}).

For AL changes, the workflow compiles and publishes the main app. If a test app exists, it also compiles and publishes that app, then runs the relevant tests.

```mermaid
flowchart TB
    start["You:<br/>Paste implementation prompt to OpenCode"]
    select["Orchestrator:<br/>Read agent-instruction.md and select the task"]
    explore["Explore:<br/>Find relevant files and tests"]
    design["Al-test-designer:<br/>Suggest tests when needed"]
    implement["Al-implementer:<br/>Make changes and self-review"]
    check["Orchestrator:<br/>Compile and publish the main app"]
    testapp{"Orchestrator:<br/>Is there a test app?"}
    tests["Orchestrator:<br/>Compile and publish the test app,<br/>then run its tests"]
    review["Al-reviewer:<br/>Review the changes"]
    report["Orchestrator:<br/>Update task status if required<br/>and report"]
    commit["You:<br/>Check the result and commit"]

    start --> select --> explore
    explore --> design --> implement
    explore -->|Test design not needed| implement
    implement --> check
    check -->|Checks pass| testapp
    testapp -->|Yes| tests
    testapp -->|No| review
    tests -->|Tests pass| review
    review -->|No unresolved findings| report
    report --> commit
    check -.->|Failed check| implement
    tests -.->|Failed check or test| implement
    review -.->|Fix findings and rerun checks| implement
```

In my project, each run handles one task and marks it `DONE` after successful checks and review. These rules are set in the project prompt. Other projects can use different rules.

### Review with BCQuality

Use [Create a BCQuality report]({{% relref "/BC/AI/Prompts/Create a BCQuality Report/_index.md" %}}), then [Fix review findings]({{% relref "/BC/AI/Prompts/Fix Review Findings/_index.md" %}}).

```mermaid
flowchart TB
    update["You:<br/>Update BCQuality and start a new session"]
    review["Al-code-review:<br/>Review changes and save findings"]
    request["You:<br/>Request fixes in a new session"]
    compare["Orchestrator:<br/>Compare findings with project-doc.md"]
    fix["Al-implementer, orchestrator, al-reviewer:<br/>Fix, check and review<br/>as in the above workflow"]

    update --> review --> request --> compare --> fix
```

## More details

- [Implementation Workflow]({{% relref "Implementation Workflow/_index.md" %}}) — project documents and daily use.
- [Agent Orchestration]({{% relref "Agent Orchestration/_index.md" %}}) — who does what.
- [Shared AI Configuration]({{% relref "Shared AI Configuration/_index.md" %}}) — setup, skills and scripts.
- [Verification and Code Review]({{% relref "Verification and Code Review/_index.md" %}}) — tests, CI and BCQuality.
- [Prompts]({{% relref "Prompts/_index.md" %}}) — ready-to-use commands.
