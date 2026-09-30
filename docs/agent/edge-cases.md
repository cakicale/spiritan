# Edge-case Discipline

When writing new code, reviewing a PR, or fixing a bug: walk the 7 categories below and run the 7-step workflow. This catches the bugs `function-style` and `karpathy-guidelines` miss.

**Why:** happy path is usually correct; the surrounding terrain is unprotected. Every editor-controlled string is adversarial-by-default.

## The seven categories

### 1. Input

- **Empty / null** — required empty, optional missing, `null` vs `undefined`, empty array vs missing array
- **Boundary** — 0, -1, `Number.MAX_SAFE_INTEGER`, length 1 / max / max+1, date ranges, pagination
- **Invalid formats** — wrong type (`"5"` vs `5`), malformed JSON/URLs/dates, mixed casing
- **Unicode / special chars** — emoji, RTL, combining chars, zero-width, BOM, HTML/SQL injection
- **Large data** — 10,000 items, deeply nested, very long strings

### 2. State

- **Race conditions** — concurrent edits, double-submit
- **Stale data** — changed by another process between read and write (Sanity doc, remote branch, env var)
- **Partial completion** — fails halfway; retry must be idempotent or compensating
- **Concurrent ops** — multiple tabs / sessions
- **Offline / reconnection** — connection drops mid-flow; UI restore state?

### 3. User behaviour

- **Rapid clicks** — submit pressed multiple times before disable
- **Back button** — during in-flight operation
- **Browser refresh** — mid-flow; progress restored or lost?
- **Abandoned flows** — partial state expire / cleanup?
- **Unexpected nav** — direct URL to flow-internal screen

### 4. Error handling

- **Network** — timeouts, 5xx, half-streamed, DNS failure
- **Validation** — how errors display; can user recover without losing data?
- **Permission** — access lost mid-op, token revoked, role changed
- **Resource exhaustion** — 429, storage quota, memory limit
- **Cascading** — downstream down; whole flow fails loud or silent?

### 5. Data

- **First-time use** — no data yet; empty states render, not crash
- **Legacy data** — old records mismatching current schema
- **Migration** — schema changed; what happens to existing rows?
- **Cascade** — deleting referenced doc; what shows the reference now?

### 6. Security

- **Auth expiry** — session timeout mid-op
- **Authz changes** — permissions change while user active
- **Input sanitization** — XSS, SQLi, command injection, path traversal
- **Data leakage** — error messages exposing tokens, internal paths, PII, stack traces

### 7. Performance

- **Cold start** — first request after idle
- **Large payloads** — N×10 input → N×10² processing; algorithm linear?
- **Memory leaks** — long sessions, untracked timers, retained DOM after unmount
- **N+1 queries** — one call per item vs batched

## The seven-step workflow

1. **Define feature scope** — entry point, exit conditions, success criteria.
2. **Walk input validation** — for each input: empty? too long? wrong format? special chars? min/max?
3. **Boundary conditions** — test 0, 1, max, max+1. Pagination, timeouts, rate limits.
4. **Map error states** — network, permission denied, not found, concurrent mod, expired session.
5. **Concurrency** — simultaneous users? double-click? data changes between load and save?
6. **Recovery paths** — message, retry, data preserved?
7. **Prioritise by likelihood × impact** — high × high = robust; rare + low-impact = graceful failure.

## Project-specific lens

Spiritan patterns where categories bite hard:

- **Server vs client components** — keep secrets and server-only fetches in Server Components; use `"use client"` only when needed.
- **API routes / server actions** — validate and bound external input; never leak stack traces or env vars to the client.
- **`useEffect` autofill loops** — guard with `!alreadySet` when an effect writes state it depends on.
- **`setTimeout` in components** — track in ref, clear on unmount.
- **Future CMS (Sanity)** — missing documents, private write tokens, and GROQ null handling (see `.agents/skills/sanity-best-practices/` when CMS is added).

## Trigger checklist (before marking done)

1. **Smallest input that breaks this?** Empty, single char, zero, negative.
2. **Largest input?** Server-side length/count/size bound?
3. **Operation runs twice?** Idempotent, or duplicates / corrupts?
4. **What gets logged?** Could a secret/token/PII end up in stdout or error response?
5. **Hostile caller?** Re-walk category 6 against every external input.
6. **State drift between read/write?** Sanity doc, env var, in-flight request.
7. **Untested error path?** 5xx, 401, 429, malformed body.

"I don't know" / "I'll handle it later" = handle it **now**.

## When this rule fires

- **Before writing code** — walk the 7 categories + 7-step workflow
- **Before opening a PR** — re-walk against the diff
- **During PR review** — `docs/agent/pr-preview.md` lists this first
- **When fixing a bug** — bug IS an edge case; check siblings (same fn, file, pattern)
