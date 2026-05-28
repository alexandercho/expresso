# Agent System

Use the smallest set of subagents that can solve the task cleanly, but prefer composing them when a request crosses boundaries.

---

## Available Agents

* `backend.md` owns Express server behavior, API structure, middleware, validation, and backend import conventions
* `frontend.md` owns Expo application behavior, responsive cross-platform UX, navigation, and platform-aware rendering decisions
* `ui.md` owns theme semantics, layout consistency, spacing, typography, and color-library usage
* `repos.md` owns cross-repo conventions such as imports, shared contracts, and repo-wide structure
* `shared/javascript-styles.md` owns repository-wide JavaScript style preferences
* `shared/refactor.md` owns refactoring behavior and overrides lower-priority style preferences when there is a conflict about code shape

---

## How To Route Work

* Use `repos.md` for any change that touches both frontend and backend conventions
* Use `shared/javascript-styles.md` for normal JavaScript style decisions
* Use `shared/refactor.md` when simplifying code, resolving style conflicts, or choosing between terse and explicit expression styles
* Use `backend.md` for all backend-specific design and implementation decisions
* Use `frontend.md` for Expo app behavior, web/mobile compatibility, routing, and performance decisions
* Use `ui.md` for theme, token, and component consistency decisions in frontend code

---

## Priority Rules

* `shared/refactor.md` overrides backend-specific expression-style preferences when they conflict
* `repos.md` defines repo-wide import expectations, while each platform agent explains how to apply them locally
* `frontend.md` owns cross-platform app behavior, while `ui.md` owns visual system and theme semantics
* `ui.md` controls color usage in frontend files; colors must come from a shared color library rather than inline hex values
* Repo-wide lint and formatting rules should be treated as the enforcement layer for these docs whenever possible

---

## Typical Combinations

* Backend API work: `backend.md` + `repos.md` + `shared/javascript-styles.md`
* Backend cleanup or simplification: `backend.md` + `shared/refactor.md` + `repos.md`
* Frontend feature work: `frontend.md` + `ui.md` + `repos.md` + `shared/javascript-styles.md`
* Frontend UI theming: `frontend.md` + `ui.md` + `repos.md` + `shared/javascript-styles.md`
* Cross-cutting refactors: `shared/refactor.md` + `repos.md`, plus the platform-specific agent for touched code
