# Refactor Doctrine

## Scope

This file defines how code should be simplified and cleaned without changing behavior.

---

## Core Philosophy

“Clean code” means:

* minimal syntax noise
* direct expression of intent
* fewer moving parts
* readable left-to-right flow

Not:

* abstraction for its own sake
* over-strict typing
* unnecessary defensive coding
* overly verbose null handling

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

Example:

```js
fetchData()
    .then(setData)
    .catch(handleError);
```

---

## Conditionals

* Prefer ternary operators for simple branching

Example:

```js
isLoading ? <Loading /> : <Content />
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

## Anti-Patterns

* excessive optional chaining everywhere
* defensive coding in UI layers
* deeply nested callbacks
* redundant function wrappers
* over-engineered abstractions

---

## Code Shape Preference

Prefer:

* linear flow
* minimal indentation
* direct expression

Avoid:

* multi-layer indirection chains
* “clever” abstractions that obscure logic

---

## Important Constraint

Refactoring must never:

* change behavior
* introduce new architecture
* add unnecessary abstraction layers

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

## Truthy / Falsy Usage Preference

* Prefer natural truthy/falsy evaluation over explicit comparisons when intent is clear
* Avoid verbose equality checks when JS coercion already expresses intent clearly

Example (preferred):

```js
if (user) {
    doSomething();
}
```

---

## Logical Expression Preference

* Prefer concise boolean expressions over explicit branching when safe

Example:

```js
const label = isActive && 'Active';
```

---

## Anti-Pattern Additions

* unnecessary restructuring when data shape is already optimal
* excessive defensive null checks when data contract is stable
* ignoring natural JS truthy/falsy behavior in favor of verbose comparisons
* maintaining outdated parameter ordering after usage patterns shift

---

## Important Constraint (Extension)

* Refactoring must preserve behavior
* Function signatures may be rewritten when it improves call-site clarity
* Do not introduce new abstractions while applying parameter or destructuring improvements
