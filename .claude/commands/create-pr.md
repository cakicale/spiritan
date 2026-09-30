---
description: Create a pull request from the current branch on GitHub
argument-hint: [--target main] [title]
allowed-tools: Bash(git *), Bash(gh *), Bash(cat *)
---

Follow the instructions in `docs/agent/create-pr.md`.

Default base branch is `main`. Requires `gh auth login`.

Self-review with `/pull-request-review` before pushing.

Return the GitHub PR URL when done.
