# Claude Instructions

@AGENTS.md
@docs/agent/function-style.md
@docs/agent/design-tokens.md
@docs/agent/edge-cases.md
@docs/agent/karpathy-guidelines.md
@docs/agent/create-pr.md
@docs/agent/pr-preview.md

## Commands

Invoke with `/project:command-name` or `/create-pr`, `/pull-request-review`:

- `/create-pr` — create PR from current branch (see `docs/agent/create-pr.md`)
- `/pull-request-review` — review branch diff against conventions (see `docs/agent/pr-preview.md`)

## Skills (on-demand)

- `.claude/skills/edge-cases.md` — 7-category edge-case taxonomy (see `docs/agent/edge-cases.md`)

## Project structure

- Next.js app: `app/`
- Static assets: `public/`

## Working rules

Before making changes:

1. Read the relevant existing files.
2. Follow the current project structure.
3. Prefer small, focused changes.
4. Reuse existing components and utilities.
5. Do not duplicate code.
6. Do not change tooling or workspace setup unless explicitly requested.

## Coding rules

- Use TypeScript.
- Use Tailwind CSS.
- Follow `docs/agent/design-tokens.md` for colours and tokens.
- Keep components small and focused.
- Use named exports for shared code.
- Avoid `any`.
- Do not add new dependencies unless clearly needed.

## Important

- Do not commit `.env.local`.
- Do not create duplicate layout or utility files without checking existing patterns.
