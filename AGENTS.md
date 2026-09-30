<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Spiritan — Agent Instructions

This repo follows the `AGENTS.md` convention (Cursor, Codex CLI, and other AI tools). Claude Code has its own config at `CLAUDE.md` — if you are running Claude Code, prefer that.

## Project overview

Single Next.js application (App Router) for Spiritan.

- **App routes:** `app/`
- **Package manager:** `pnpm`
- **Remote:** `github.com/cakicale/spiritan`

## Commands

Run from the repository root:

- `pnpm dev` — development server
- `pnpm build` — production build
- `pnpm start` — start production server
- `pnpm lint` — ESLint

## Project context

Read these before writing code:

- `CLAUDE.md` — Claude Code entry point (imports this file + `docs/agent/`)
- `CONTRIBUTING.md` — git/GitHub workflow, branch naming, PR process
- `docs/agent/` — function style, edge cases, PR workflows (see Agent workflows below)

## Git workflow (summary)

1. Branch from `main` as `feat/`, `fix/`, or `chore/<task-name>`
2. Commit using conventional commits (`feat(scope): ...`, `fix(scope): ...`)
3. Self-review against `docs/agent/pr-preview.md`
4. Create PR against `main` on GitHub using `docs/agent/create-pr.md` (`gh pr create`)

See `CONTRIBUTING.md` for details.

## Workflow commands

Claude Code users run slash commands. Other tools: read the markdown files directly.

- `docs/agent/create-pr.md` — structured PR + push + `gh pr create`
- `docs/agent/pr-preview.md` — self-review against project conventions

Claude command wrappers: `.claude/commands/create-pr.md`, `.claude/commands/pull-request-review.md`

Codex wrappers: `.agents/skills/source-command-create-pr/`, `.agents/skills/source-command-pull-request-review/`

## General rules

- Keep changes small and scoped.
- Follow the existing project structure before creating new folders or files.
- Do not add new dependencies unless clearly needed.
- Do not change project tooling, package manager, ESLint, or workspace setup unless explicitly requested.
- Use TypeScript.
- Avoid `any`. If unavoidable, keep it local and explain why with a short comment.
- Prefer named exports for shared components and utilities.
- Keep files focused. Split large components into smaller components, helpers, or hooks.
- Do not commit secrets or `.env.local` files.

## App structure

- `app/` — Next.js routes, layouts, and global styles (`app/globals.css`)
- `public/` — static assets

When adding shared UI, prefer `components/` at the repo root if the tree grows beyond a single page.

## Styling

- Use Tailwind CSS v4.
- Prefer theme tokens in `app/globals.css` over hardcoded hex in components. See `docs/agent/design-tokens.md`.
- Use flex + `gap` for spacing between siblings when building new layouts.

## Agent workflows

Detailed agent instructions live in `docs/agent/`:

- `docs/agent/function-style.md` — function style and code structure
- `docs/agent/design-tokens.md` — colour tokens: one token per value, no hardcoded hex
- `docs/agent/edge-cases.md` — edge cases to handle in this project
- `docs/agent/karpathy-guidelines.md` — LLM behavioral guardrails
- `docs/agent/create-pr.md` — pull request creation workflow
- `docs/agent/pr-preview.md` — PR preview and review workflow

Read the relevant file before writing code, handling edge cases, or creating/reviewing PRs.

## Do not

- Do not create random folders.
- Do not introduce another package manager.
- Do not change tooling unless explicitly requested.
- Do not commit secrets.
