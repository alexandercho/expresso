# Agent System

Use the smallest set of subagents that can solve the task cleanly, but prefer composing them when a request crosses boundaries.

---

## Available Agents

* `backend.md` owns Express server behavior, API structure, middleware, validation, and backend import conventions
* `frontend.md` owns Expo application behavior, responsive cross-platform UX, navigation, and platform-aware rendering decisions
* `repos.md` owns cross-repo conventions such as imports, shared contracts, and repo-wide structure
* `shared/api-testing.md` owns shared frontend/backend API compatibility test coverage, category breakdown, and runnable API test workflows
* `shared/code-style.md` owns shared JavaScript style, refactor preferences, and code-shape decisions

---

## How To Route Work

* Use `repos.md` for any change that touches both frontend and backend conventions
* Use `shared/api-testing.md` when backend API behavior changes or when frontend changes add, remove, or alter API calls
* Use `shared/code-style.md` for shared JavaScript style decisions, cleanup work, and code-shape tradeoffs
* Use `backend.md` for all backend-specific design and implementation decisions
* Use `frontend.md` for Expo app behavior, web/mobile compatibility, routing, and performance decisions

---

## Priority Rules

* `repos.md` defines repo-wide import expectations, while each platform agent explains how to apply them locally
* `shared/api-testing.md` defines the required latest, legacy, deprecated, and current-frontend-contract API test workflows
* `backend.md` owns backend version bumps, legacy transitions, and deprecation behavior, while `shared/api-testing.md` owns the shared test move/copy workflow that enforces those transitions
* `shared/code-style.md` owns shared JavaScript style and refactor preferences across frontend and backend
* `frontend.md` owns both cross-platform app behavior and frontend visual-system decisions
* Repo-wide lint and formatting rules should be treated as the enforcement layer for these docs whenever possible

---

## Typical Combinations

* Backend API work: `backend.md` + `repos.md` + `shared/code-style.md`
* Backend API testing work: `backend.md` + `shared/api-testing.md` + `repos.md`
* Frontend changes that affect API usage: `frontend.md` + `shared/api-testing.md` + `repos.md`
* Backend cleanup or simplification: `backend.md` + `shared/code-style.md` + `repos.md`
* Frontend feature work: `frontend.md` + `repos.md` + `shared/code-style.md`
* Frontend UI theming: `frontend.md` + `repos.md` + `shared/code-style.md`
* Cross-cutting refactors: `shared/code-style.md` + `repos.md`, plus the platform-specific agent for touched code
