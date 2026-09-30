# Agent documentation

Shared instructions for AI coding agents (Cursor, Claude Code, Codex, and others).

These files are the **single source of truth**. Tool-specific config references them instead of duplicating content:

| File                     | Purpose                                                  |
| ------------------------ | -------------------------------------------------------- |
| `function-style.md`      | How to write functions and structure code                |
| `design-tokens.md`       | Colour tokens — one token per value, no hardcoded hex    |
| `edge-cases.md`          | Edge cases to watch for in this project                  |
| `karpathy-guidelines.md` | LLM behavioral guardrails (simplicity, surgical changes) |
| `create-pr.md`           | Pull request creation workflow                           |
| `pr-preview.md`          | PR preview and review workflow                           |

## Where this is loaded

- **All agents**: referenced from `AGENTS.md` at the repo root
- **Claude Code**: imported via `@` syntax in `CLAUDE.md`
- **Cursor**: `.cursor/rules/*.mdc` mirrors key rules
- **Claude Code skills**: `.claude/skills/` and `.claude/commands/` point here
- **Codex**: `.agents/skills/source-command-*` wrappers point here

## GitHub PR auth

PR creation uses the [GitHub CLI](https://cli.github.com/) (`gh`). Authenticate once:

```bash
gh auth login
```

Ensure `gh auth status` shows a logged-in account with access to `cakicale/spiritan`. Agents run `gh pr create` per `create-pr.md` — no API tokens in the repo.
