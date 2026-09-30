# Karpathy Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. From [Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls.

**Tradeoff:** Bias toward caution over speed. Trivial tasks → use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State assumptions. Uncertain → ask.
- Multiple interpretations → present them, no silent pick.
- Simpler approach exists → say so. Push back when warranted.
- Unclear → stop. Name the confusion. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" / "configurability" not requested.
- No error handling for impossible scenarios.
- 200 lines could be 50 → rewrite.

Test: "Would a senior engineer call this overcomplicated?" → simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

Editing existing code:

- No "improving" adjacent code, comments, formatting.
- No refactoring unbroken things.
- Match existing style.
- Unrelated dead code → mention it, don't delete.

Orphans your change creates:

- Remove imports/vars/fns YOUR change made unused.
- Don't remove pre-existing dead code unless asked.

Test: every changed line traces to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Verifiable goals:

- "Add validation" → "invalid inputs handled correctly"
- "Fix bug" → "repro case passes"
- "Refactor X" → "lint/build pass before and after"

Multi-step → state plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria = loop independently. Weak ("make it work") = constant clarification.
