---
name: source-command-create-pr
description: Create a pull request on GitHub using the Spiritan create-pr workflow.
---

# source-command-create-pr

Use when the user asks to create a PR or follow the repo PR workflow.

Read `docs/agent/create-pr.md` and follow it manually in Codex.

- Remote: GitHub `cakicale/spiritan`
- Default base branch: `main`
- Auth: `gh auth login` / `gh auth status`
- Always fetch and compare against `origin/<target>`
- Run `source-command-pull-request-review` before pushing
- Create PR via `gh pr create`
- Return the PR URL when complete
