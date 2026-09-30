---
name: source-command-pull-request-review
description: Review a branch or GitHub PR against Spiritan project conventions.
---

# source-command-pull-request-review

Use when the user asks for a PR review, self-review, or convention check before merge.

Read `docs/agent/pr-preview.md` and follow it manually in Codex.

- Compare against `origin/main` after `git fetch`
- Draft review in chat first; never post to GitHub without user approval
- GitHub comments must be in English
- Optional post: `gh pr comment <number> --body "..."` after approval
