# Design tokens

**Spiritan today:** colours and theme tokens live in [`app/globals.css`](../../app/globals.css) (Tailwind v4 `@theme` / CSS variables). When you introduce a dedicated `tokens.css`, point this doc at that file instead.

This file exists so a colour can be changed in one place. Every duplicate token breaks that guarantee, so the rules below are about keeping the mapping from value to token one-to-one.

## Why this file has rules

Tokens used to be added per Figma spec and named after the first component that needed them. Nobody checked whether the value already existed. Three failure modes resulted:

- one value under several names — `#0c2340` was `--h1-foreground`, `--h3-foreground` **and** `--h5-foreground`
- a token existed but the hex was pasted anyway — `--border-subtle` existed while `border-[#e3e8ee]` sat in four files
- a repeated colour with no token at all — `#f5222d` was copied into six files

Changing the "deep blue" then meant editing three tokens and grepping for two spellings of the same hex.

## The structure

`tokens.css` has three parts, in this order.

**1. Palette** — one token per unique colour value. This is the only place a hex literal may appear.

```css
:root {
  --deep-blue: #0c2340;
  --gray-7: #8c8c8c;
  --required: #f5222d;
}
```

**2. Semantic aliases** — names that describe a role. They always point at a palette token with `var()` and never repeat a hex. They exist for `@layer base` and `@utility` blocks, and are deliberately _not_ re-exposed as Tailwind colours, because that would give one value two utilities.

```css
:root {
  --h1-foreground: var(--deep-blue);
  --h3-foreground: var(--deep-blue);
}
```

**3. `@theme inline`** — exposes palette tokens as Tailwind utilities. Exactly one `--color-*` per value.

## Rules

1. **Grep before you add.** Search `tokens.css` for the hex from the Figma spec. If it is there, reuse the existing token. Do not add a second name for it.
2. **One token per value.** Semantic aliases use `var()`; they never repeat a hex literal.
3. **One utility per value.** `@theme inline` must not expose two `--color-*` entries that resolve to the same colour.
4. **Name by colour or design-system role, not by the component that needed it first.** `--surface-support-request`, `--add-button-border` and `--upload-hint-foreground` are what this looks like when it goes wrong — each was one component's colour that turned out to be a general one. Prefer `--surface-tint`, `--control-border-muted`, `--gray-7`.
5. **Grey numbering mirrors Figma.** Gray-7 is `#8c8c8c`, Gray-8 is `#595959`. Do not renumber to fit a new colour.
6. **Pure white and black use Tailwind's `white` / `black`.** Those utilities cannot be removed, so a `--gray-1` / `--gray-10` would guarantee two ways to write the same colour. `--white` and `--black` exist in the palette only so aliases can reference them.
7. **A near-identical hex reuses the existing token.** Figma exports drift by a digit or two between frames — `#f4f7fb` and `#f4f8fc` are the same colour to a user. Reuse rather than adding a near-duplicate. If a difference is genuinely intentional, say so in a comment next to the token.
8. **Never hardcode a colour in a component.** No `text-[#hex]`, `bg-[#hex]`, `border-[#hex]`, or `text-[color:var(--token)]`. If a token has no utility, add the `@theme inline` mapping instead of reaching around it.
9. **Delete a token when its last usage goes.** `--error-foreground` and `--muted-foreground` sat unused for months and still looked like real options.
10. **Verify before you finish.**

```bash
rg -n "\[#[0-9a-fA-F]{3,8}\]|\[color:var\(--" app
```

This must return nothing. Arbitrary values are still fine for one-off layout maths (`pl-[calc(...)]`) and for effects that are not part of the colour system (e.g. `rgba()` overlays).

## Adding a colour from a Figma spec

1. Grep `tokens.css` for the hex. Found it, or something within a digit or two? Use that token; stop here.
2. Otherwise add one palette token, named for the colour or its design-system role.
3. Add exactly one `--color-*` mapping in `@theme inline`.
4. Use the generated utility in the component. Never the raw hex.

## Related

- [`AGENTS.md`](../../AGENTS.md) → styling and structure
- [`CLAUDE.md`](../../CLAUDE.md) → Tailwind v4 line-height gotcha when styling components
