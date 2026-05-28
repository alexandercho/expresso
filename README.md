# Expresso ☕

Expresso is a full-stack starter brewed for quick iteration: an Expo Router frontend, an Express backend, and an agent rule system that keeps both sides aligned. Now enjoy some JavaScript Expresso ☕️

The choices in this repo are intentionally optimized for simple, easy-to-read, quick-to-develop full-stack work. The project direction started from wanting React Native Expo development across multiple platforms to feel good, lightweight, and sustainable day to day. ☕

## What You Get

* `frontend/` - Expo app for iOS, Android, and web
* `backend/` - Express API with lightweight starter routes
* `agents/` - subagent rules for frontend, backend, repo conventions, API testing, and shared code style
* `scripts/` - root helper scripts for running the project

## Runtime

* `pnpm` is the package manager for the repo
* `Node.js 26.x` is required for the root, frontend, and backend

## Quick Start ☕

```bash
pnpm install:all
pnpm dev
```

If you prefer to install manually, you can still run:

```bash
pnpm install
pnpm --dir backend install
pnpm --dir frontend install
```

This starts:

* the backend in watch mode on the port defined in `backend/.env.development`
* the Expo dev server for the frontend with Fast Refresh

You can also run each side on its own:

```bash
pnpm install:all
pnpm dev
pnpm start
pnpm start:backend
pnpm start:frontend
```

`pnpm dev` is the preferred development command. It gives you backend watch-mode restarts plus Expo Fast Refresh for frontend work. `pnpm start` remains available as an equivalent root convenience command.

## Project Layout

```text
.
├── agents/    # Agent rules and conventions
├── backend/   # Express API
├── frontend/  # Expo Router app
└── scripts/   # Root helper scripts
```

## Frontend ☕️

The frontend is an Expo Router app built to support mobile and web from one codebase. It reads its API base URL from `frontend/.env.development` via `EXPO_PUBLIC_API_BASE_URL`.

More detail lives in [frontend/README.md](/Users/alex/Code/expresso/frontend/README.md:1).

## Backend ☕

The backend is an Express 5 service with a health route, placeholder CRUD endpoints, dev env loading from `backend/.env.development`, and internal absolute import aliases.

More detail lives in [backend/README.md](/Users/alex/Code/expresso/backend/README.md:1).

API compatibility tests can be run from the root with:

```bash
pnpm test:api
pnpm test:api:frontend
pnpm test:api:latest
pnpm test:api:legacy
pnpm test:api:deprecated
```

## Agent Setup 🤖☕

The repo uses markdown-based subagents in `agents/` to keep implementation decisions consistent.

Core agent files:

* `agents/AGENTS.md` - routing and priority rules for the full agent system
* `agents/frontend.md` - Expo, cross-platform, routing, loading, and component rules
* `agents/backend.md` - Express, API, compatibility, and import rules
* `agents/repos.md` - shared frontend/backend contract rules
* `agents/shared/api-testing.md` - shared frontend/backend API compatibility test workflow rules
* `agents/shared/code-style.md` - shared JavaScript style, cleanup, and refactor doctrine

The intended flow is:

* use `repos.md` for cross-boundary decisions
* use `frontend.md` and `backend.md` for platform-specific implementation
* use `frontend.md` for visual system choices in frontend work
* use `shared/code-style.md` for shared style and refactor decisions across the repo

Example Codex CLI prompt for up to 6 parallel subagents:

```text
Use parallel subagents for independent workstreams and then merge the results into one implementation plan.

1. Frontend routing and screen requirements
   Follow agents/AGENTS.md, agents/frontend.md, agents/repos.md.

2. Frontend UI and styling system review
   Follow agents/AGENTS.md, agents/frontend.md, agents/repos.md.

3. Backend API design
   Follow agents/AGENTS.md, agents/backend.md, agents/repos.md.

4. Shared frontend/backend contract review
   Follow agents/AGENTS.md, agents/repos.md.

5. API compatibility testing review
   Follow agents/AGENTS.md, agents/shared/api-testing.md, agents/backend.md, agents/repos.md.

6. JavaScript style, maintainability, and risk review
   Follow agents/AGENTS.md, agents/shared/code-style.md, agents/backend.md, agents/frontend.md, and agents/repos.md.

Keep each subagent read-only until the merged plan is approved.
```

In practice, Codex may spawn fewer than 6 subagents if some workstreams are not truly independent, but this is the shape of a prompt that can support up to six parallel lanes. ☕

## Branch Flow ☕

This repo is designed around two protected branches:

* `develop` is the default branch and the staging branch
* `main` is the production branch

### Pull Requests Into `develop`

When you open a pull request into `develop`, GitHub Actions runs:

* `frontend` lint
* `backend` lint
* frontend contract API tests
* latest API tests
* legacy API tests
* deprecated API tests

If any of those checks fail, the PR should not be merged. If you push more commits to the PR branch, the checks rerun automatically.

### Merges Into `develop`

When a PR is merged into `develop`, the same lint and API test pipeline runs again on the resulting push. If everything passes:

* the backend gets a staging deploy only when files under `backend/` changed
* the frontend gets a staging deploy only when files under `frontend/` changed

That keeps staging deploys focused on real app changes and avoids wasting deploys on things like README-only updates.

### Pull Requests From `develop` Into `main`

Pull requests from `develop` into `main` still run the lint and API test pipeline, and they also run a production release version check:

* only the `develop` branch is allowed to merge into `main`
* `backend/package.json` must be incremented to count as a backend production release
* `frontend/package.json` and `frontend/app.json` must both be incremented to count as a frontend production release
* if neither target is incremented, the PR fails
* if only one target is incremented, the PR can still pass and only that target is eligible for production deploy

### Merges Into `main`

When `develop` is merged into `main`, the pipeline compares the merged versions against the previous `main` commit:

* if the backend version was incremented, the backend gets a production deploy
* if both the frontend package version and Expo app version were incremented, the frontend gets a production deploy
* if both were incremented, both deploy
* if neither was incremented, the release-target job fails

For now, all deploy steps are echo commands, but the branch and gating logic is set up for real staging and production deployment hooks later.

## Project Philosophy ☕️

This setup favors:

* simple conventions over heavy abstraction
* easy-to-read code over clever indirection
* quick full-stack iteration between Expo and Express
* shared frontend/backend naming and contracts for smoother development
* cross-platform React Native Expo development that stays pleasant as the project grows
* hot-refresh-friendly development so feedback stays quick while building

## Development Env Files

Safe development config is stored locally in:

* `frontend/.env.development`
* `backend/.env.development`

These currently cover the frontend API base URL and backend port.

## Notes

* use your machine's local network IP in `frontend/.env.development` when testing on a physical device
* older app-version support should remain in backend code until explicitly deprecated
* top-to-bottom data delivery is preferred so the UI can render progressively and predictably

## License

This project is licensed under the terms of the [MIT License](LICENSE).
