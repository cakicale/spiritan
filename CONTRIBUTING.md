# Contributing

Git and GitHub workflow for Spiritan.

## TL;DR — agent-accelerated workflow

**Claude Code** — workflow commands at `.claude/commands/`:

- `/create-pr` — structured PR body + push + create PR on GitHub via `gh`
- `/pull-request-review` — checks branch diff against project conventions

**Cursor / Codex / other AI tools** — read the same instructions from `docs/agent/`:

- `docs/agent/create-pr.md`
- `docs/agent/pr-preview.md`

Codex wrappers: `.agents/skills/source-command-*`

**Recommended flow:**

```
git checkout -b feat/<task-name>
# work + commit (conventional commits)
# self-review against docs/agent/pr-preview.md
# fix + commit
# agent creates PR on GitHub (docs/agent/create-pr.md)
```

### GitHub auth for agent PR creation

Use the GitHub CLI:

```bash
gh auth login
gh auth status
```

The agent runs `gh pr create` per `docs/agent/create-pr.md`. No API tokens in the repository.

## Branches

- **`main`** — default branch. Feature PRs target `main`.

### Branch naming

```
feat/<task-name>
fix/<task-name>
chore/<task-name>
```

Examples:

```
feat/landing-hero
fix/mobile-nav
chore/agent-docs
```

## Commits

Prefer [Conventional Commits](https://www.conventionalcommits.org/) (not enforced by commitlint yet):

```
feat(ui): add hero section
fix(deps): align react types
chore(agent): add docs/agent workflows
```

Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`

## Workflow

1. Branch from `main`
2. Make changes in small, focused commits
3. Self-review with `docs/agent/pr-preview.md` (mandatory before PR)
4. Push and create PR against `main` with `docs/agent/create-pr.md`

## What NOT to do

- Don't auto-commit without user approval
- Don't push to `main` directly
- Don't bypass git hooks (`--no-verify`) unless explicitly asked
- Don't commit `.env.local`, API tokens, or secrets

## Agent documentation

See `docs/agent/README.md` for the full index.

For code rules and project structure, read `AGENTS.md`. Claude Code users should also read `CLAUDE.md`.
