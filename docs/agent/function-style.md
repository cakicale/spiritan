# Function & Code Style

Conventions for function bodies and signatures. Flatten control flow with guard clauses, prefer destructured options, split by concern.

## Pattern

Sequential `if` w/ early return. One condition, one exit.

**Bad: else if chain**

```js
function getStatus(user) {
  if (!user) {
    return 'anonymous';
  } else if (!user.active) {
    return 'inactive';
  } else if (user.banned) {
    return 'banned';
  } else {
    return 'active';
  }
}
```

**Good: guard clauses**

```js
function getStatus(user) {
  if (!user) return 'anonymous';
  if (!user.active) return 'inactive';
  if (user.banned) return 'banned';
  return 'active';
}
```

**Bad: nested**

```js
function process(data) {
  if (data) {
    if (data.items) {
      if (data.items.length > 0) {
        return data.items.map(transform);
      }
    }
  }
  return [];
}
```

**Good: flat**

```js
function process(data) {
  if (!data) return [];
  if (!data.items) return [];
  if (data.items.length === 0) return [];
  return data.items.map(transform);
}
```

**Bad: nested ternary**

```js
const result = !value ? 'empty' : value > 10 ? 'large' : 'small';
```

**Good: extract fn**

```js
function getSizeLabel(value) {
  if (!value) return 'empty';
  if (value > 10) return 'large';
  return 'small';
}
const result = getSizeLabel(value);
```

**OK: simple one-line ternary**

Trivial conditional value = fine.

```js
const color = isActive ? 'bg-green-500' : 'bg-gray-300';
const label = count === 1 ? 'item' : 'items';
```

**Bad: `let` w/ nested logic**

```js
let status;
if (!user) {
  status = 'anonymous';
} else if (!user.active) {
  status = 'inactive';
} else {
  status = 'active';
}
```

**Good: extract fn, `const`**

```js
function getStatus(user) {
  if (!user) return 'anonymous';
  if (!user.active) return 'inactive';
  return 'active';
}
const status = getStatus(user);
```

**Switch / lookup map for discrete values**

```js
const statusMap = {
  pending: 'yellow',
  success: 'green',
  error: 'red',
};
const color = statusMap[status] || 'gray';
```

**Bad: mixed null-guard styles**

```ts
if (perPage && page) { ... }       // truthy — loses page=0
if (capacity != null) { ... }       // explicit null check
if (availableFrom) { ... }          // truthy — loses ''
```

**Good: one style per scope**

```ts
if (perPage != null && page != null) { ... }
if (capacity != null) { ... }
if (availableFrom != null && availableFrom !== '') { ... }
```

**Bad: positional args (3+)**

```ts
fetchRooms(4, 1, 10, '2026-01-01', '2026-12-31');
```

**Good: options object, destructured**

```ts
fetchRooms({ capacity: 4, page: 1, perPage: 10, availableFrom: '2026-01-01' })

const fetchRooms = ({ capacity, page, perPage, availableFrom }: RoomFilters) => { ... }
```

**Bad: many ifs mutating shared state**

```ts
let url = base;
const parts: string[] = [];
if (page) parts.push(`page=${page}`);
if (limit) parts.push(`limit=${limit}`);
if (sort) parts.push(`sort=${sort}`);
if (parts.length) url += '?' + parts.join('&');
```

**Good: declarative builder**

```ts
const params = new URLSearchParams();
if (page != null) params.set('page', String(page));
if (limit != null) params.set('limit', String(limit));
if (sort != null) params.set('sort', sort);
const query = params.toString();
const url = query ? `${base}?${query}` : base;
```

**Bad: inline compound conditions**

```ts
if (
  field._type === "formFieldProductProposition" &&
  "allowMultiple" in field &&
  field.allowMultiple
) { ... }
```

**Good: named `const` for each condition**

```ts
const isProductProposition = field._type === "formFieldProductProposition";
const isMultiChoice =
  isProductProposition && "allowMultiple" in field && field.allowMultiple;

if (isMultiChoice) { ... }
if (isProductProposition) { ... }
```

## Rules

1. **Return early** — edge cases / invalid first.
2. **No nesting** — never `if` in `if`. Sequential early returns.
3. **One condition per if** — no `else if`.
4. **Extract complex** — wrap in fn w/ early returns.
5. **Final return = happy path**.
6. **`const` only** — never `let`. Extract fn, assign to const.
7. **Small functions** — one responsibility per fn. Long fn → split by concern, not line count. Name reveals intent.
8. **Consistent null guards** — pick one style per scope: `!= null` for nullables (handles `null` + `undefined`, preserves `0` / `''` / `false`), or truthy-check (only when falsy-as-missing is intentional). Don't mix in the same fn.
9. **Options-object for 2+ params** — single options object, destructured at the param: `fn({ a, b }: Options)`. Exceptions: callbacks (`map`, `sort`, `reduce`) and curried / point-free fns where positional is the contract.
10. **Many ifs → split or switch** — discriminating on one variable → `switch` or lookup map. Independent concerns → extract per-concern fns or a declarative builder.
11. **Extract compound conditions to named `const`** — any `if` with 2+ subexpressions goes into a named `const`. Guard reads as `if (isX)`, not as a multi-line boolean.

## React / JSX

Prefer early returns in components for loading/error/empty states before the main render.

**Bad: nested ternary in JSX**

```tsx
{
  isLoading ? <Spinner /> : error ? <Error /> : <Content data={data} />;
}
```

**Good: guard clauses or extracted helper**

```tsx
if (isLoading) return <Spinner />;
if (error) return <Error message={error} />;
return <Content data={data} />;
```

Simple one-line ternaries for class names or trivial labels are fine.

## When to Apply

- Multi-branch fn logic
- Conditional variable assignment
- Loop filter / validation
- Any control flow w/ 2+ conditions
