# Create pull request

Create a pull request on **GitHub** for the current branch.

Repo: `cakicale/spiritan` (from `origin` remote).

## Authentication

Use the GitHub CLI. Never commit tokens.

```bash
gh auth status
```

If not logged in, run `gh auth login` and retry.

## Context to gather

Run these before creating the PR:

```bash
git branch --show-current
git fetch origin --quiet
git log --oneline "origin/<target>"...HEAD
git diff --name-only "origin/<target>"...HEAD
git diff "origin/<target>"...HEAD
```

Replace `<target>` with the base branch (default: `main`).

Confirm remote:

```bash
git remote get-url origin
```

## Target branch

Default base branch is **`main`**.

Always compare against **`origin/<target>`**, never the local branch. Fetch first.

Optional: if the workflow later adds `develop`, use `--target develop` in Claude's `/create-pr` and re-run the diff commands against `origin/develop`.

## Commit conventions

Prefer [Conventional Commits](https://www.conventionalcommits.org/) (not enforced by hooks yet):

- Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`
- Scope examples: `ui`, `deps`, `agent`
- Example: `feat(ui): add landing hero section`

## 1. Handle uncommitted changes

If there are staged or unstaged changes, split them into multiple logical commits. Do **not** bundle unrelated changes.

- Group by concern (component, styling, docs).
- Stage explicitly by path: `git add <path> ...`
- Keep commits small and reviewable.

Do **not** auto-commit without user approval.

## 2. Handle protected branch

If the current branch is `main`, create a feature branch first:

```
feat/<task-name>
fix/<task-name>
chore/<task-name>
```

## 3. Self-review before pushing

Before pushing, follow `docs/agent/pr-preview.md`. Fix issues with additional commits. Do **not** push until review passes (or remaining items are acknowledged to the user).

## 4. Push and open the PR

```bash
git push -u origin HEAD
```

### Title conventions

`type(scope): subject`, max 70 chars.

Examples: `feat(ui): add hero section`, `chore(agent): add docs/agent workflows`

If the user specifies a title, use it only if it follows conventional commit format.

### Body

Fill in based on the branch diff:

- **What** — one-liner summary
- **Why** — context: what problem or feature
- **Changes** — key changes grouped logically
- **Testing** — only if verification steps are non-obvious; no boilerplate checklists

Create the PR:

```bash
gh pr create --base main --title "feat(ui): add hero section" --body "$(cat <<'EOF'
## What
...

## Why
...

## Changes
...

## Testing
...
EOF
)"
```

If `.github/pull_request_template.md` exists, `gh` may pre-fill sections — align the body with that template.

Return the PR URL from the command output.

## 5. Do not

- Auto-commit without user approval.
- Push to `main` directly — always via PR.
- Bypass git hooks (`--no-verify`) unless the user explicitly asks.
- Skip self-review before creating the PR.
- Commit API tokens or credentials.
