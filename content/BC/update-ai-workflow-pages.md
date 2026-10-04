# Plan: Replace the AI section with the current AI-assisted AL workflow

## Objective

Replace the obsolete pages about Codex Skills, generic prompts, and VS Code agents with an English, reproducible description of the current Business Central AL workflow:

- OpenCode starts project work through a dedicated orchestrator.
- Project documentation determines scope and acceptance criteria.
- Specialized agents perform focused exploration, test design, implementation, and review.
- Shared custom skills, scripts, and memory are versioned once and linked into OpenCode, Codex, and Claude Code.
- Compilation, publishing, focused tests, CI, and periodic BCQuality reviews are separate quality gates.
- The developer retains responsibility for product decisions, review of the working tree, and commits.

All website content, including copyable prompt blocks, must be English.

## Public-content safety rules

The implementation must **not** publish any of the following:

- absolute file-system paths;
- machine, tenant, sandbox, container, or environment names;
- credentials, client IDs, tokens, e-mail addresses, or log contents;
- project-specific business data or generated `.app` artifacts;
- volatile model IDs, token limits, or local configuration parameters.

Repository-relative paths such as `Docs/tech.md` and `.opencode/agents/orchestrator.md` are permitted because they explain the layout a reader should recreate. The absolute paths in the reference map below are implementation-only evidence and must never appear in Hugo content.

## Reference map for the implementing agent

Use these files to verify the behavior described on the website before writing it. Do not infer details from the old website pages.

### Hugo site being updated

| Purpose | Path |
| --- | --- |
| AI section landing page | `C:\Users\adrri\Desktop\Projects\githubpage\addmecode\content\BC\AI\_index.md` |
| Obsolete Codex page | `C:\Users\adrri\Desktop\Projects\githubpage\addmecode\content\BC\AI\Codex Skills\_index.md` |
| Obsolete VS Code agents page | `C:\Users\adrri\Desktop\Projects\githubpage\addmecode\content\BC\AI\Agents in VS Code\_index.md` |
| Prompt page to replace | `C:\Users\adrri\Desktop\Projects\githubpage\addmecode\content\BC\AI\Prompts\_index.md` |
| Hugo configuration | `C:\Users\adrri\Desktop\Projects\githubpage\addmecode\hugo.toml` |
| GitHub Pages build and deployment | `C:\Users\adrri\Desktop\Projects\githubpage\addmecode\.github\workflows\hugo.yaml` |

### Reference AL project: OpenCode workflow and project contract

| Purpose | Path |
| --- | --- |
| Project OpenCode defaults | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\.opencode\opencode.jsonc` |
| User-facing instruction that starts an implementation run | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\Docs\agent-instruction.md` |
| Source of technical decisions, acceptance criteria, and Delivery Plan | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\Docs\tech.md` |
| Recorded everyday prompts and BCQuality update reminder | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\Docs\TODO.md` |
| Example dated BCQuality findings report | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\Docs\bcquality-cr-20260924-1555.md` |
| Primary orchestration procedure | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\.opencode\agents\orchestrator.md` |
| Read-only exploration role | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\.opencode\agents\explore.md` |
| Read-only test-design role | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\.opencode\agents\al-test-designer.md` |
| Single writing implementation role | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\.opencode\agents\al-implementer.md` |
| Read-only final review role | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\.opencode\agents\al-reviewer.md` |
| AL-Go settings and enabled analyzers | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\.AL-Go\settings.json` |
| AL-Go CI/CD workflow | `C:\Users\adrri\Desktop\Projects\BC\vendor-collaboration-hub\.github\workflows\CICD.yaml` |

### Shared custom skills, memory, and validation scripts

| Purpose | Path |
| --- | --- |
| Canonical configuration documentation | `C:\Users\adrri\Desktop\Projects\BC\ai-config\README.md` |
| Declarative mapping for OpenCode, Codex, and Claude Code links | `C:\Users\adrri\Desktop\Projects\BC\ai-config\config\links.psd1` |
| Synchronization script that creates and maintains links | `C:\Users\adrri\Desktop\Projects\BC\ai-config\tools\Sync-AiConfig.ps1` |
| Shared memory/global instructions source | `C:\Users\adrri\Desktop\Projects\BC\ai-config\linked\memory\MEMORY.md` |
| Eight custom skill folders | `C:\Users\adrri\Desktop\Projects\BC\ai-config\linked\skills\` |
| AL navigation, diagnostics, build, and publish workflow | `C:\Users\adrri\Desktop\Projects\BC\ai-config\linked\skills\al-language-server\SKILL.md` |
| Build wrapper | `C:\Users\adrri\Desktop\Projects\BC\ai-config\linked\skills\al-language-server\scripts\Build-AlApp.ps1` |
| SaaS publish wrapper | `C:\Users\adrri\Desktop\Projects\BC\ai-config\linked\skills\al-language-server\scripts\Publish-AlApp.ps1` |
| AL test workflow | `C:\Users\adrri\Desktop\Projects\BC\ai-config\linked\skills\al-testing\SKILL.md` |
| Focused SaaS test wrapper | `C:\Users\adrri\Desktop\Projects\BC\ai-config\linked\skills\al-testing\scripts\Invoke-AlSaaSTests.ps1` |

### Public BCQuality plugin used for broad reviews

| Purpose | Path |
| --- | --- |
| Installed standalone plugin root | `C:\Users\adrri\.config\opencode\skills\bcquality\` |
| Exposed review skill | `C:\Users\adrri\.config\opencode\skills\bcquality\skills\al-code-review\SKILL.md` |
| Plugin usage and limits | `C:\Users\adrri\.config\opencode\skills\bcquality\docs\using-bcquality.md` |
| Public repository | `https://github.com/microsoft/BCQuality` |

The agent should verify that project agents are project-local files. Only the custom skill folders and shared memory are synchronized as symbolic links across the three hosts; the synchronization mechanism does not make project-local OpenCode agents shared configuration.

## Target information architecture

Keep the existing `AI` chapter and replace its children with the following content structure:

```text
content/BC/AI/
  _index.md
  Implementation Workflow/_index.md
  Agent Orchestration/_index.md
  Shared AI Configuration/_index.md
  Verification and Code Review/_index.md
  Prompts/_index.md
```

Use Hugo front matter with these menu weights:

| File | Title | Weight |
| --- | --- | --- |
| `content/BC/AI/_index.md` | `AI` | keep the existing chapter weight |
| `content/BC/AI/Implementation Workflow/_index.md` | `Implementation Workflow` | 10 |
| `content/BC/AI/Agent Orchestration/_index.md` | `Agent Orchestration` | 20 |
| `content/BC/AI/Shared AI Configuration/_index.md` | `Shared AI Configuration` | 30 |
| `content/BC/AI/Verification and Code Review/_index.md` | `Verification and Code Review` | 40 |
| `content/BC/AI/Prompts/_index.md` | `Prompts` | 50 |

Do not change the Hugo theme, layouts, logo, site configuration, or GitHub Pages workflow. Do not edit `public/`: it is generated output.

## Planned file changes

### 1. Update `content/BC/AI/_index.md`

Replace the old generic introduction and external resource list with a concise English overview titled in the body **AI-assisted AL development workflow**.

Include only:

- a one-paragraph statement that this section documents a repeatable personal workflow for Business Central AL development, not generic AI advice;
- a compact text or Mermaid flow: **project documentation → OpenCode orchestrator → scoped implementation → validation and review → developer review and commit**;
- three principles: documentation is the source of truth, one planned task is handled per run, and the developer keeps the final decision/commit responsibility;
- short links to the five child pages.

Do not repeat agent-role details, skill lists, validation commands, or prompt blocks on the landing page.

### 2. Create `content/BC/AI/Implementation Workflow/_index.md`

Write an English page that explains the project contract before an agent edits code.

Cover:

1. `Docs/tech.md` as the living technical design: architecture decisions, acceptance criteria, Delivery Plan, and task status.
2. `Docs/agent-instruction.md` as the execution contract: choose an explicitly requested task or the first unfinished Delivery Plan item, then stop after exactly one task.
3. The implementation sequence: inspect only relevant context and tests; implement the selected scope; add/update tests as required; validate; receive review; update the task status only after success.
4. Failure behavior: a genuine external blocker is reported clearly; an incomplete, failing, or unresolved task is not marked done.
5. Git boundaries: unrelated working-tree changes are preserved and the agent does not commit, amend, reset, or discard work.
6. The final report: business impact first, named validation result, affected files, residual assumptions/risks, and a verified manual test path or an explicit explanation why it is not yet reachable.

Use a numbered lifecycle, not a long prose narrative. This page must describe the policy; the exact copyable command belongs only on the Prompts page.

### 3. Create `content/BC/AI/Agent Orchestration/_index.md`

Write an English page describing how one orchestrator coordinates narrow specialist roles.

Use a small table:

| Role | Responsibility | Boundary |
| --- | --- | --- |
| `orchestrator` | selects scope, coordinates work, owns validation and final outcome | does not delegate outside the current repository or run multiple writing agents |
| `explore` | creates a compact brief with exact source/test locations and risks | read-only; no broad unrelated exploration |
| `al-test-designer` | provides focused Given/When/Then scenarios and target test locations | read-only; no implementation or publishing |
| `al-implementer` | makes the minimal assigned AL and test change, then self-reviews | the sole writing subagent; cannot expand scope autonomously |
| `al-reviewer` | performs the final narrow review against changed files and acceptance criteria | read-only; no tests, publishing, or edits |

Then describe the actual sequence:

1. Explore the selected task and produce a reusable brief.
2. Design only material tests for that brief.
3. Make a concise file-level implementation plan when the task is broad.
4. Delegate writing to one implementer.
5. Compile, publish, and test only the affected components in the parent orchestration stage.
6. Request a final scoped review; correct in-scope findings and repeat only affected validation if necessary.

Explain why this division matters: each agent sees only the needed context, only one actor writes at a time, and a reviewer who did not write the change checks it afterwards. Do not publish model names, token limits, permissions syntax, or configuration internals.

### 4. Create `content/BC/AI/Shared AI Configuration/_index.md`

Write an English page explaining the portable configuration architecture.

Cover:

- A version-controlled configuration repository is the single source of truth for model-agnostic AL skills, their references/scripts, and shared memory/global instructions.
- The synchronization script creates symbolic links so the same skill and memory source is available in OpenCode, Codex, and Claude Code. Per-tool settings stay local and are not overwritten by the synchronization mechanism.
- The intentional tooling split: LSP/MCP is used for code intelligence and diagnostics, while helper scripts perform deterministic build, publish, and test operations.
- The wrappers find current AL tooling and derive app/test context from the project instead of relying on hard-coded paths. They support focused SaaS test execution and retain actionable operation logs locally.
- Selective validation: application changes require App followed by dependent Test validation; a Test-only change validates Test only unless its cached App artifact is missing or stale.

Add a dedicated **Custom AL skills** section after the configuration overview. Do not reduce it to a one-line catalogue. Give each skill an `###` heading followed by three concise bullets: **Responsibility**, **How it works**, and **Key boundaries or outcome**. Keep the details below; they are the minimum information required to understand how the workflow is reproduced.

#### `al-conventions`

- **Responsibility:** baseline skill for every AL task; it defines naming, file layout, extension-safe customization, code structure, and review conventions.
- **How it works:** identifies AL project context, uses feature folders and `<ObjectName>.<ObjectType>.al` naming, keeps triggers thin, uses labels for user-facing text, and pairs the baseline with a specialized skill for object creation, testing, integrations, performance, or upgrades.
- **Key boundaries or outcome:** extends standard objects rather than editing them, favors purpose-named events and interfaces over broad `IsHandled` overrides, and preserves existing behavior during cleanup/refactoring unless a change is explicitly required.

#### `al-language-server`

- **Responsibility:** mandatory starting point for navigating, editing, diagnosing, compiling, and reviewing AL changes.
- **How it works:** uses AL language-server or MCP capabilities for definitions, references, symbols, and diagnostics; then resolves the current AL tooling through wrappers for build and SaaS publication; finishes with a short post-change code review.
- **Key boundaries or outcome:** MCP is used for code intelligence, not compilation, publication, or tests. The wrappers use the project configuration and installed tooling rather than fixed machine paths, and report actionable diagnostics/log locations on failure.

#### `al-solution-architect`

- **Responsibility:** designs or reviews a solution before implementation when requirements affect architecture, extensibility, integrations, upgrades, or multiple AL objects.
- **How it works:** captures business flows and constraints, decomposes work into feature modules and responsible objects, defines table/status/process ownership, selects interfaces and positive events, and creates object, dependency, event, risk, and fallback plans.
- **Key boundaries or outcome:** it identifies testing, performance, integration, and upgrade implications early, delegates detailed work to the relevant specialized skills, and records assumptions/open questions instead of inventing architecture decisions.

#### `al-object-builder`

- **Responsibility:** creates AL tables, pages, codeunits, enums, interfaces, extensions, API objects, and upgrade-object scaffolding in a consistent project shape.
- **How it works:** reads `app.json` and available ID ranges, determines the business feature and target folder, chooses safe object/file names and IDs, starts from object templates, and keeps codeunits/pages focused with thin workflow triggers.
- **Key boundaries or outcome:** it uses extensions instead of direct standard-object changes, does not create Test objects unless test work is requested, validates IDs and maintainability conventions, and hands primary migration work to `al-upgrades`.

#### `al-testing`

- **Responsibility:** designs maintainable automated AL tests and validates changed behavior in the correct App/Test-project arrangement.
- **How it works:** turns behavior into focused Given/When/Then scenarios, uses standard Business Central library codeunits and explicit assertions, keeps fixtures deterministic, and places tests in the separate Test project mirroring the application feature structure.
- **Key boundaries or outcome:** it compiles, publishes, and runs only the affected projects/tests where possible; named test results are reported. It does not require a new test for every edit, but it requires an explicit assessment of relevant success, failure, and regression coverage.

#### `al-integration`

- **Responsibility:** designs, implements, and reviews inbound/outbound HTTP, REST, OData, webhook, and Business Central API-page integrations.
- **How it works:** defines ownership and contracts before code, separates mapping, transport, and business processing, uses secure HTTP and explicit JSON/status/error handling, and addresses filters, pagination, retries, idempotency, versioned API routes, and observability.
- **Key boundaries or outcome:** secrets and tokens are never logged; standard objects remain extension-based; transport replacement uses interfaces rather than generic handled events; unresolved contract/authentication decisions are documented for validation.

#### `al-performance`

- **Responsibility:** improves runtime efficiency and scalability without silently changing business behavior.
- **How it works:** finds the actual hotspot, filters and selects keys before reads, minimizes loaded fields with `SetLoadFields`, prefers `CalcSums`/`ModifyAll` and other set-based operations, and uses temporary records, dictionaries, or lists when they reduce repeated database work.
- **Key boundaries or outcome:** behavior changes must be explicit, trigger-bypassing side effects are checked, and high-volume migrations are directed to safe `DataTransfer`/upgrade patterns with targeted verification steps.

#### `al-upgrades`

- **Responsibility:** implements and reviews safe AL data upgrades and migration code.
- **How it works:** creates a dispatch-only `Subtype = Upgrade` codeunit, guards each routine with a dedicated per-company or per-database upgrade tag, protects database reads, and uses `DataTransfer` for large backfills when trigger behavior is not required.
- **Key boundaries or outcome:** it avoids version-based branching except justified first-install cases, external calls, and complex trigger logic; it reports migration side effects, tag registration, residual risks, and missing upgrade-validation scenarios.

State immediately before the skills that `al-language-server` and `al-testing` are loaded before inspecting or editing AL code in this workflow. State that `al-conventions` is the baseline companion and the remaining skills are selected only when the task requires their specialization.

Add links only to public sources:

- `https://github.com/addmecode/ai-config`
- `https://opencode.ai/`
- `https://github.com/microsoft/BCQuality`

Do not put local installation commands or host directory locations on this page.

### 5. Create `content/BC/AI/Verification and Code Review/_index.md`

Write an English page that separates the quality gates rather than presenting AI output as self-validating.

#### Task-level verification

Describe this order:

1. Implementer self-review: task boundary, object IDs, captions/data classification, permissions, test coverage, and local AL style.
2. Orchestrator validation: use the language-service skill for diagnostics and wrappers for compilation, SaaS publication, and focused automated tests; do not substitute MCP for these operations.
3. Independent `al-reviewer` inspection of the exact final scope and acceptance criteria.
4. A correction changes only the affected scope and reruns only the validation made stale by that correction.

State that failures are investigated from the most specific diagnostic, then corrected and revalidated. Identical failed publish/test commands are not retried blindly. A successful tool run does not replace developer review.

#### CI gate

Explain that AL-Go in GitHub Actions separately builds the app and Test project, runs standard analyzers plus the project ruleset/custom analyzer, and runs tests. This provides an independent CI gate on repository changes; it complements, rather than replaces, the agent's scoped local validation.

#### Periodic broad BCQuality review

Describe the real review loop:

1. Update the public standalone BCQuality plugin by the applicable host mechanism and start a new session so skill discovery is fresh.
2. Invoke public `al-code-review` for tracked, uncommitted changes without allowing source edits.
3. Save its findings to `Docs/bcquality-cr-YYYYMMDD-HHmm.md`.
4. In a new session, compare every finding with `Docs/tech.md`. Do not apply an item that is deliberately scheduled for a later task or conflicts with an established design decision.
5. Send applicable corrections through the usual orchestrated implementation, validation, and review workflow.

State the BCQuality boundary accurately: it is curated, knowledge-backed AL review and does not replace compiler diagnostics, analyzers, automated tests, environment validation, or human review.

### 6. Replace `content/BC/AI/Prompts/_index.md`

Replace the obsolete broad refactoring prompts with the English introductory heading **Copyable commands for the workflow**. For each command, write an English **When to use it** and **Expected outcome** line. Keep the code blocks themselves in English as shown below.

#### Start the next implementation task

```text
Implement the changes according to the instructions in `agent-instruction.md`. Use the orchestrator.
```

Expected outcome: one Delivery Plan task is implemented or an explicit blocker is reported; it is marked done only after the required checks succeed.

#### Create a BCQuality report for uncommitted changes

```text
Use the `al-code-review` skill to analyze changes that have not yet been committed to Git. Save the findings in a new Markdown file named `bcquality-cr-YYYYMMDD-HHmm.md` in the `Docs` folder.
```

Expected outcome: a dated, review-only findings report in `Docs/`; no implementation changes from the review session.

#### Apply relevant findings from a review report

```text
`bcquality-cr-YYYYMMDD-HHmm.md` contains code-review findings. Check `tech.md` to determine whether they are planned for a later stage or conflict with the project assumptions. If neither applies, fix the code accordingly. Use the orchestrator.
```

Expected outcome: the report is triaged against the technical design before relevant findings are fixed through the normal workflow. Add a short note that the timestamped filename must be replaced with the actual report to process.

#### Produce a business-facing change summary

```text
Summarize the changes that have not yet been committed from the perspective of a system user. Provide tests that the user can perform to verify those changes.
```

Expected outcome: a user-facing description of the current working-tree changes and an executable manual test checklist, or an explicit statement that the user path is not available yet.

Do not include absolute paths in the prompts. Use `Docs/` in explanatory prose, matching the actual reference repository folder name, even though the user may type lowercase `docs` on a case-insensitive file system.

### 7. Remove obsolete pages

Delete these old source files:

- `content/BC/AI/Codex Skills/_index.md`
- `content/BC/AI/Agents in VS Code/_index.md`

Do not create redirects: both pages describe a retired process. Keep `content/BC/AI/Prompts/_index.md` because it is replaced in place with current content.

## Editorial requirements

- Keep descriptions concise, factual, and first-person only where it improves clarity; avoid generic AI promotional language.
- Use short paragraphs, ordered lists for the process, and tables only for role/quality-gate comparisons.
- Format roles, skills, filenames, statuses, and relative paths in backticks.
- Do not copy long agent instructions, raw logs, full skill contents, or CI configuration into the website. Explain their responsibility and link to a public source only where appropriate.
- Make the responsibility boundary consistent across all pages: documentation defines intent; orchestration coordinates execution; scripts provide repeatable validation; BCQuality supplies independent findings; the developer makes the final commit decision.
- Do not mention the reference project name on public pages unless the user explicitly asks to make that project public as an example.

## Validation after implementation

1. Run Hugo with cleanup and minification from the site repository to validate front matter, Markdown, and generated navigation.
2. Verify the AI menu contains the landing page plus exactly these five children: Implementation Workflow, Agent Orchestration, Shared AI Configuration, Verification and Code Review, and Prompts.
3. Confirm that Codex Skills and Agents in VS Code no longer appear in generated navigation or output from a clean Hugo build.
4. Open each generated page and check that all explanatory prose and all four operational prompt blocks are English.
5. Verify the public text contains no absolute path, account, environment, tenant, token, credential, or local machine reference.
6. Check that links to `ai-config`, OpenCode, and BCQuality resolve to their public sites.
7. Inspect the final Git diff: only `content/BC/AI/` Markdown files should change; do not add generated `public/` content or alter Hugo/Pages configuration.
