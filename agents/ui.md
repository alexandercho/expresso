# Light Mode / Dark Mode Rules

## Core Principle

Color modes are not stylistic variations. They are two representations of the same semantic system.

---

## Semantic Color Usage (Mandatory)

* Never define or use raw hex colors directly in app files
* Always source colors from a shared color library or token system
* Reference semantic tokens (for example `background`, `surface`, `textPrimary`, `textSecondary`, `border`) instead of appearance-driven color names
* Colors must map to meaning, not appearance

---

## Semantic Size Usage (Mandatory)

* Never define or use numbers for sizing directly in app files
* Always source sizes from a sizes sizing library or token system
* Reference semantic tokens (for example `normalText`, `title`, `subtitle`, `borderRadius`, `border`, `smallPadding`, `largePadding`) instead of appearance-driven size names
* Sizes must map to meaning, not appearance

---

## Consistency Rules

* The same component must render identically in structure across themes
* Only color values change between light and dark modes
* Spacing, layout, and typography must never change between themes

---

## Contrast Requirements

* Text must maintain readable contrast in both modes
* Avoid low-contrast grays for primary content
* Secondary text must remain legible, not decorative

---

## Background Hierarchy

Maintain consistent surface layering:

* `background` -> app base layer
* `surface` -> cards / containers
* `overlay` -> modals / elevated UI

These layers must exist in both modes with equivalent hierarchy, not identical colors.

---

## Dark Mode Rules

* The color library should avoid pure black backgrounds unless an intentional contrast system exists
* Prefer near-black surfaces for reduced eye strain
* Reduce intensity of shadows; rely more on elevation than blur-heavy shadows

---

## Light Mode Rules

* The color library should avoid pure white backgrounds for large surfaces if it creates glare
* Use subtle off-white backgrounds for depth
* Maintain visible separation between surfaces without heavy borders

---

## State Colors

State colors must remain consistent across modes:

* success
* warning
* error
* info

Only brightness and contrast adapt, not semantic meaning.

---

## Anti-Patterns

* Defining theme-specific hex values inline in components
* Duplicating components for light/dark variants
* Using opacity as a substitute for proper color tokens
* Inconsistent contrast treatment across screens
