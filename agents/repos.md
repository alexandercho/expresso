# Repository Conventions

## Folder Structure

* `frontend/` -> Expo app
* `backend/` -> Express server
* `agents/` -> AI agent definitions and rules

---

## API Conventions

* All API responses must be consistent JSON objects
* Avoid mixed response shapes
* Errors must be explicit and structured

Example:

```json
{
    "success": false,
    "error": {
        "message": "Invalid request",
        "code": "BAD_REQUEST"
    }
}
```

---

## Import Rules

* Prefer absolute imports wherever the runtime supports them cleanly
* Backend should use package import aliases for internal modules
* Use relative imports only when they are clearly simpler than an alias
* Shared code must live in explicit shared modules

---

## Frontend / Backend Contract Optimization

* Design frontend data loading and backend response shapes together using a top-to-bottom rendering priority
* Data needed by components nearest the top of the experience should be available first through the lightest practical requests
* If upper-page components need exclusive lightweight data, create dedicated backend requests instead of blocking them behind heavier shared payloads
* Minimize redundant fetching across screens, components, and modals by reusing compatible response shapes when it remains efficient
* If a proposed feature placement would create inefficient or repetitive request patterns, propose an alternative placement or interaction model
* If a feature must remain in that location, add purpose-built requests while preserving backward compatibility for older app versions until deprecation is explicitly approved
* When considering whether to extend an existing endpoint or add a new one, prefer the existing endpoint only if the added data or logic does not create noticeable perceived latency for the frontend experience that depends on it

---

## Version Compatibility

* Backend changes must continue supporting older app versions unless explicit approval is given to deprecate them
* Use the app version number as the source of truth when behavior must differ between current and older clients
* If backend logic exists only for older app versions, isolate it into clearly named sections or dedicated files so current-path logic stays easy to follow
* Keep version-specific compatibility code organized in a way that makes future cleanup straightforward once deprecation is explicitly approved
* When endpoint deprecation is approved, the backend major version should be incremented and the new current frontend path should use the new explicit endpoint version
* A route or function should move into legacy support when the current frontend no longer uses it but older supported frontends still may
* Legacy-only routes or functions that still work for older app versions should emit deprecation warnings until their removal is explicitly approved

---

## Naming Consistency

* Use the same camelCase field and variable names across frontend and backend whenever they represent the same concept
* Prefer request and response shapes that allow simple destructuring without frontend-only or backend-only renaming
* Name request variables so it is immediately clear which entity, action, or payload they refer to when moving between frontend and backend code
* Avoid unnecessary aliases when reading request bodies, params, query values, or API payloads unless there is a strong domain reason
* If a naming change is needed for clarity, update both sides of the contract together or preserve backward compatibility until the older name is explicitly deprecated

---

## Environment Variables

* All secrets must live in `.env`
* Never hardcode credentials
* Backend owns all secret handling
* Safe configuration values that vary by environment should also live in environment files instead of being hardcoded
* For frontend and backend development, place safe local config such as port numbers and API base URLs in development env files
* Keep environment-file usage limited to safe configuration data unless stricter secret-handling rules are explicitly required

---

## Naming Consistency

* frontend/backend should use shared domain vocabulary
* avoid duplicate naming for identical concepts

---

## Shared Contracts

If frontend and backend depend on the same data shape:

* define it in a shared module if possible
* or document it explicitly in repo conventions
