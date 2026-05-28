# Backend ☕ Express

The backend is a lightweight Express 5 service that supports the Expo frontend with predictable JSON responses, version-aware compatibility rules, and internal alias-based imports. ☕

## Runtime

* `pnpm`
* `Node.js 26.x`

## Install And Run

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm start
pnpm dev
pnpm lint
pnpm lint:fix
```

`pnpm dev` runs the backend in watch mode so server changes restart automatically during development.

## Environment

Development config lives in `backend/.env.development`.

Current safe config:

```env
PORT=3001
```

`src/server.js` loads that file before starting the app.

## Routes

Current starter routes:

* `GET /health`
* `GET /`
* `POST /`
* `PUT /`
* `DELETE /`

The CRUD handlers are still stubbed against an in-memory store, so this is scaffolding rather than finished domain logic.

## Backend Rules Snapshot ☕️

This app is guided by `agents/backend.md`, `agents/repos.md`, and `agents/shared/refactor.md`.

Important expectations:

* keep routes thin and move domain logic out of HTTP handlers
* support older app versions until deprecation is explicitly approved
* isolate older-version-exclusive logic into clear sections or dedicated files
* expose lightweight, purpose-built endpoints when UI placement requires faster or smaller payloads
* keep frontend/backend field names aligned in camelCase for easier destructuring
* preserve backward compatibility when the frontend contract evolves

## Imports

The backend uses package import aliases from `package.json`, including:

* `#app`
* `#routes`
* `#controllers/*`
* `#middleware/*`
* `#data/*`
* `#utils/*`

Use those aliases wherever they keep module intent clearer than relative paths.

## Where To Look Next

* `src/server.js` for bootstrapping
* `src/app.js` for middleware and route wiring
* `src/routes/` for endpoint registration
* `src/controllers/` for request handlers
* `agents/backend.md` for the detailed backend rules
