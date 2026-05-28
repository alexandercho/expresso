# JavaScript Style Doctrine

## Core Philosophy

This repository prioritizes:

* readability over cleverness
* explicit logic over implicit behavior
* simple functions over abstractions
* predictable control flow over indirection

---

## Preferred Patterns

* Functional composition over classes
* Small, single-purpose functions
* Plain objects for data structures
* Explicit async/await instead of hidden flows
* Local state preferred over global state

---

## Naming Conventions

* Use descriptive, domain-relevant names
* Avoid abbreviations unless universally understood
* Boolean variables should read naturally:

  * `isLoading`, `hasError`, `canSubmit`

---

## File Structure

* Prefer small files with a single responsibility
* Co-locate related logic when it improves clarity
* Avoid “utils” dumping grounds
* Split files when they exceed cognitive load, not line count

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

---

## Error Handling

* Prefer explicit error handling
* Avoid silent failures
* Normalize error shapes at boundaries (API layer)

---

## Async Behavior

* Prefer `.then()` for short, linear async flows
* Prefer `async/await` once branching, sequencing, or error handling becomes more complex
* Avoid hidden concurrency unless necessary
* Keep async flows linear and traceable
