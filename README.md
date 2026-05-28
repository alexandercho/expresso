# Expresso ☕

Expresso is a full-stack starter brewed for quick iteration: an Expo Router frontend, an Express backend, and an agent rule system that keeps both sides aligned. ☕️

The choices in this repo are intentionally optimized for simple, easy-to-read, quick-to-develop full-stack work. The project direction started from wanting React Native Expo development across multiple platforms to feel good, lightweight, and sustainable day to day. ☕

## What You Get

* `frontend/` - Expo app for iOS, Android, and web
* `backend/` - Express API with lightweight starter routes
* `agents/` - subagent rules for frontend, backend, UI, repo conventions, and refactors
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

## Agent Setup 🤖☕

The repo uses markdown-based subagents in `agents/` to keep implementation decisions consistent.

Core agent files:

* `agents/AGENTS.md` - routing and priority rules for the full agent system
* `agents/frontend.md` - Expo, cross-platform, routing, loading, and component rules
* `agents/backend.md` - Express, API, compatibility, and import rules
* `agents/ui.md` - theming, tokens, and color-library rules
* `agents/repos.md` - shared frontend/backend contract rules
* `agents/shared/javascript-styles.md` - repo-wide JavaScript style rules
* `agents/shared/refactor.md` - refactor doctrine and override rules

The intended flow is:

* use `repos.md` for cross-boundary decisions
* use `frontend.md` and `backend.md` for platform-specific implementation
* use `ui.md` for visual system choices
* use `shared/refactor.md` when cleanup decisions conflict with lower-priority local style rules

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
