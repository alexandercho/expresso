# Code Style Doctrine

## Scope

This file defines how JavaScript code should be written, simplified, and cleaned without changing behavior unless explicitly intended.

---

## Core Philosophy

This repository prioritizes:

* readability over cleverness
* direct expression of intent
* simple functions over abstractions
* predictable control flow over indirection
* minimal syntax noise
* readable left-to-right flow

Not:

* abstraction for its own sake
* over-strict typing
* unnecessary defensive coding
* overly verbose null handling

---

## Preferred Patterns

* Functional composition over classes
* Small, single-purpose functions
* Plain objects for data structures
* Local state preferred over global state
* Lightweight helpers and pure functions are preferred over heavy generic layers

---

## Naming Conventions

* Use descriptive, domain-relevant names
* Avoid abbreviations unless universally understood
* Boolean variables should read naturally, such as `isLoading`, `hasError`, and `canSubmit`

---

## File Structure

* Prefer small files with a single responsibility
* Co-locate related logic when it improves clarity
* Avoid `utils` dumping grounds
* Split files when they exceed cognitive load, not line count
* If a new folder contains files that are accessed broadly throughout the codebase, add that folder to the absolute import path configuration instead of relying on deep relative imports

---

## Abstractions

Allowed:

* lightweight helpers
* pure functions
* simple hooks (frontend only)

Avoid:

* deep inheritance chains
* config-driven architectures
* unnecessary factories
* excessive generic utilities
* multi-layer indirection chains

---

## Error Handling

* Prefer explicit error handling
* Avoid silent failures
* Normalize error shapes at boundaries such as the API layer

---

## Function Style

* Prefer implicit return arrow functions for inline logic
* Prefer direct function references when possible
* Pass functions instead of wrapping them

Example (preferred):

```js
onPress={handleSubmit}
```

Not:

```js
onPress={() => handleSubmit()}
```

---

## Async Style

* Prefer `.then()` when the flow is short and linear
* Prefer `async/await` when branching, sequencing, or error handling becomes more complex
* Avoid hidden concurrency unless necessary
* Keep async flows linear and traceable

Example:

```js
fetchData()
    .then(setData)
    .catch(handleError);
```

---

## Conditionals

* Prefer ternary operators for simple branching
* Prefer concise boolean expressions over explicit branching when safe
* Prefer natural truthy/falsy evaluation over verbose equality checks when intent is clear

Example:

```js
isLoading ? <Loading /> : <Content />
```

Example:

```js
const label = isActive && 'Active';
```

Example (preferred):

```js
if (user) {
    doSomething();
}
```

Avoid unnecessary verbose if/else blocks for simple cases.

---

## Null / Type Handling Philosophy

* Avoid defensive null-checking unless it affects runtime safety
* Prefer assuming valid data flow at boundaries
* Normalize data at API/service layer instead of UI layer

---

## Refactor Goals

* reduce verbosity
* remove duplication
* flatten nesting
* simplify naming
* eliminate unnecessary wrappers

---

## Function Parameters & Destructuring Rules

* Prefer object destructuring in function parameters when it improves readability and avoids repetitive property access
* Avoid deeply nested parameter access inside function bodies when destructuring can flatten it

Example (preferred):

```js
const createUser = ({ name, email }) => saveUser(name, email);
```

---

## Parameter Defaults & Ordering

* Place the most commonly used parameter first or as the primary destructured field
* Provide sensible defaults for frequently used values directly in the function signature
* If usage patterns shift significantly, rename and reorder parameters to reflect new dominant usage patterns

Example:

```js
const fetchUsers = ({ limit = 20, offset = 0 }) => {
    return api.getUsers({ limit, offset });
};
```

---

## Object Construction

* Prefer object property shorthand wherever it improves readability
* Reuse intuitive parameter and local variable names so they can be passed into objects cleanly
* Avoid redundant object construction such as `{ data: data }` when `{ data }` is equally clear
* Do not force shorthand if renaming the variable or reshaping the code would make the result more confusing

Example (preferred):

```js
const savePayload = ({ data, userId }) => api.save({ data, userId });
```

Not:

```js
const savePayload = ({ data, userId }) => api.save({ data: data, userId: userId });
```

---

## Anti-Patterns

* excessive optional chaining everywhere
* defensive coding in UI layers
* deeply nested callbacks
* redundant function wrappers
* over-engineered abstractions
* unnecessary restructuring when data shape is already optimal
* excessive defensive null checks when data contract is stable
* ignoring natural JS truthy/falsy behavior in favor of verbose comparisons
* maintaining outdated parameter ordering after usage patterns shift
* “clever” abstractions that obscure logic

---

## Important Constraint

Code cleanup and style improvements must never:

* change behavior unless explicitly intended
* introduce new architecture without a clear reason
* add unnecessary abstraction layers

Function signatures may be rewritten when it improves call-site clarity, but not at the cost of hidden behavior changes.
