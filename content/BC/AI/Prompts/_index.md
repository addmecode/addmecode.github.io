+++
date = '2026-01-15T21:45:00+01:00'
title = 'Prompts'
+++

Prompts for AL:

## Refactor code

```md
Review all files in this repository (AL for Microsoft Dynamics 365 Business Central) and refactor the code according to AL best practices.

Review goals:
- Readability and consistent style: naming, formatting, comments, consistent indentation.
- Code structure: sensible procedure decomposition, avoid duplication, meaningful grouping of sections.
- Correctness and logic: detect suspicious conditions, unused code, redundant variables, dead branches, and potential edge-case issues.
- Minimal disruption: do not change functional behavior unless you are fixing an obvious bug (then explain why).

Required changes (mandatory):
- Constants and “pseudo-constants” naming:
- Rename all variables treated as constants (e.g., variables used only for reading, values initialized once, constant identifiers, “magic values” extracted into variables) to UPPER_SNAKE_CASE (e.g., MY_VARIABLE).
- Exception: do not rename variables of type Label.
- Ensure all references are updated correctly across the entire project.

Execution rules:
- Apply changes consistently across the whole project (same style, same naming rules).
- If you fix logic (a bugfix), add a brief inline comment explaining why it was an issue.
- When finished, provide a summary: list of changed files + main change categories (constant renames, readability refactors, logic fixes).
```

## Object names and project structure
```md
Review all AL objects and files in this project and bring naming and repository structure to a consistent standard aligned with AL best practices.

Required changes (mandatory):

1. AL object names:
- All object names must start with the `AMC` prefix.
- Separate name parts with spaces (e.g., `AMC Sales Document Processor`).
- Keep names clear and domain-descriptive (avoid unclear abbreviations).

2. File naming:
- Rename each `.al` file to the format:
  `<ObjectNameWithoutSpaces>.<ObjectType>.al`
  where:
  - `ObjectNameWithoutSpaces` = the full object name without spaces (e.g., `AMCSalesDocumentProcessor`)
  - `ObjectType` = the AL object type (e.g., `Table`, `Page`, `Codeunit`, `Enum`, `Report`, `Query`, `XmlPort`, etc.)
- Ensure the file name matches the object defined inside (as a rule of thumb: 1 file = 1 primary object, where applicable in this project).

3. Project structure:
- Update folders and file placement if necessary to match AL best practices (e.g., logical folders per functional module).
- Move files so objects are easy to discover and the repository remains maintainable.

Execution rules:
- Apply changes consistently across the entire project (one standard everywhere).
- After changes, ensure all references to objects remain valid and the project still compiles.
- At the end, provide a summary: list of renamed objects + old-to-new mapping, list of moved/renamed files, and the resulting folder structure.
```