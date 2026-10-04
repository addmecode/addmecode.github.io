+++
date = '2026-10-04T00:00:00+02:00'
title = 'project-doc.md'
weight = 10
+++

Copy this starting point to `Docs/project-doc.md`. Replace the placeholders, remove sections you do not need and add details where the project requires them.

## Template

```markdown
# [Project name]

## How it works
[What the solution does, who uses it and how the main process works.]

## Requirements
- [What is included and what is outside the scope.]
- [Business rules, validations and expected behavior.]

## Technical design
- [Platform assumptions and dependencies.]
- [Data model, objects and their responsibilities.]
- [Pages, actions, integrations and permissions, where needed.]

## Testing
- [Scenario, steps and expected result.]
- [Behavior that needs automated tests.]

## Delivery plan
| Task | Expected result | Depends on | Status |
| --- | --- | --- | --- |
| 1. [Task] | [What should work when finished] | — | [Status] |

## Decisions and open questions
- [Technical choice and the reason for it.]
- [Question that needs an answer before implementation.]
```

For a larger project, expand this with object maps, process diagrams, API contracts or a more detailed task plan. The structure is up to you.

Task selection, Git rules and instructions for the agents belong in [agent-instruction.md]({{% relref "../Agent Instructions/_index.md" %}}).
