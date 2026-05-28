# Backend Agent (Express)

## Scope

Owns all Express server behavior.

---

## Responsibilities

* API routes
* Middleware
* Authentication logic (if applicable)
* Request validation
* Service layer logic
* Database access patterns

---

## Architecture Rules

* Routes must stay thin
* Business logic must live in services
* Middleware must be reusable and composable
* Avoid mixing HTTP logic with domain logic

---

## Folder Expectations (if applicable)

* routes/
* services/
* middleware/
* utils/

---

## API Design Rules

* Keep endpoints predictable and resource-oriented
* Avoid excessive nesting in routes
* Follow the shared refactor rules for code shape and expression style
* Design endpoints to support the repo contract optimization rules for top-to-bottom rendering priority
* Expose lightweight, purpose-built requests when specific UI regions need faster delivery than broader shared payloads
* Keep request and response naming aligned with frontend camelCase usage so payload destructuring stays simple across the contract

---

## Validation

* All inputs must be validated at boundary
* Never trust client input
* Validation errors must be structured and consistent
* Move safe environment-specific backend config, such as port numbers, into development env files instead of hardcoding them

---

## Error Handling

* Centralized error handler required
* No unhandled promise rejections
* Standardize error response format

---

## Imports

* Prefer absolute imports from backend package aliases whenever possible
* Keep alias paths stable and domain-oriented
* Use relative imports only when an alias would make the code less clear

---

## Version Compatibility

* Do not remove support for older app versions unless explicitly told to deprecate them
* When behavior depends on app version, make the version check clear and intentional
* Move older-version-exclusive backend logic into clearly labeled sections or dedicated files when it is no longer part of the latest app path
