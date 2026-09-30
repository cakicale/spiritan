# PR preview and review

Review the current branch (or a GitHub PR) against project conventions before pushing or publishing feedback.

## Context to gather

```bash
git branch --show-current
git fetch origin --quiet
git diff origin/main...HEAD
git diff --name-only origin/main...HEAD
```

Read `AGENTS.md`, `CLAUDE.md`, and relevant `docs/agent/*.md` files.

## Review order

1. **Edge cases** — walk all 7 categories in `docs/agent/edge-cases.md` against the diff.
2. **Karpathy guidelines** — flag over-abstraction, scope creep, orphan code (`docs/agent/karpathy-guidelines.md`).
3. **Project conventions** — see checklist below.

## Checklist

### Function & code style (`docs/agent/function-style.md`)

Flag: nested `if/else`, `else if` chains, ternaries that should be extracted, `let` that should be `const`, inconsistent null guards, 2+ positional args that should be an options object, long functions doing multiple things.

### TypeScript & structure

- No `any` unless unavoidable with a short comment
- Named exports for shared code
- Small, focused files and components
- No duplicate components or helpers

### Next.js app (`app/`)

- Routes and layouts under `app/`
- Use Tailwind in components; follow `docs/agent/design-tokens.md` when adding colours
- Server Components for data fetching; Client Components only when needed (`"use client"`)
- API routes / server actions: validate input, auth as needed, no secrets in client bundles

### Future: Sanity CMS

When the project adds Sanity, also check `.agents/skills/sanity-best-practices/` and ensure GROQ lives in dedicated modules, not large inline queries in components, and private tokens stay server-side.

### Security

- No secrets in commits, logs, or client bundles
- Do not expose private API keys to the browser

### Dependencies

- No new packages unless clearly needed for the task

## Output format

Only report actual bugs, security vulnerabilities, and meaningful convention violations. Be concise. Skip style nits.

For each issue:

1. Severity (`critical` / `warning` / `info`)
2. File and location
3. What's wrong and why (reference the convention)
4. Suggested fix

## Publishing review feedback

**Never post comments without user approval.**

Default workflow: print the full draft review in chat. For each item show file, line, severity, and suggested fix. Stop and ask the user to approve, edit, or drop items.

### Language (GitHub)

**All text posted on GitHub must be in English** — PR review comments, issue comments, and follow-up replies.

- Chat drafts may use the user's language for discussion.
- Before posting to GitHub, translate the approved review to English (or write the GitHub draft in English from the start).

### Optional: post to GitHub PR

If the user approves and a PR already exists:

```bash
gh pr comment <PR_NUMBER> --body "$(cat <<'EOF'
## Review summary
...
EOF
)"
```

For inline review comments, use `gh api` review endpoints or the GitHub UI — prefer chat draft unless the user explicitly asks for inline comments.

## Self-review before PR

Self-review is **mandatory** before creating a PR. Follow this doc, fix issues, then use `docs/agent/create-pr.md`.
