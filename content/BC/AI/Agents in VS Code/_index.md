+++
date = '2026-01-13T21:00:00+01:00'
title = 'Agents in VS Code'
+++

## How to use agents in VS Code for AL

### bc-code-intelligence-mcp
All the instruction is here:
[bc-code-intelligence-mcp](https://github.com/JeremyVyska/bc-code-intelligence-mcp?tab=readme-ov-file)

### Vibe Coding Rules for AL using Codex
[Vibe Coding Rules for AL](https://alguidelines.dev/docs/agentic-coding/vibe-coding-rules/)

The rules can be used by Codex in VS code after a proper configuration.
You can pass rules to Codex using AGENTS.md file under:
"$HOME/.codex"
So the only thing you need to do is to create one big markdown file based on all the rules and put it into the AGENTS.md.
\
\
I created a script that join all the markdowns from vibe coding rules and put them into one AGENTS.md under a proper path: `Join-InstructionsCodex.ps1` in [scripts-bc](https://github.com/addmecode/scripts-bc)
\
\
If you want to apply these rules only to AL projects you need to add this information to the AGENTS.md - see the script.

> [!Important]
> The default max size for AGENTS.md is 32KB. If your file is larger you have to add `project_doc_max_bytes` to your codex config file - "$HOME/.codex/config.toml"