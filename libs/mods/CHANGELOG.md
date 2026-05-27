# Changelog

All notable changes to `@styled-kit/mods` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project follows [Semantic Versioning](https://semver.org/).

## [1.2.0] — 2026-05-27

### Added

-   Declared `styled-components` as a `peerDependency` (`>= 6.0.0`). The package now ships explicit peer metadata instead of relying on transitive resolution.
-   `Requirements` section in the README documenting the supported peer versions.

### Changed

-   Aligned types with the `styled-components` v6 type surface (`Interpolation`, `CSSObject`, `ExecutionContext`, `StyleFunction`):
    -   `Literals`, `Interpolations`, and `FnLiterals` no longer take the unused `Theme` generic — `theme` is provided to style functions via `ExecutionContext` in v6.
    -   `returnStyles` is generic over `Props` and calls `css<Props>` explicitly instead of widening with `Interpolation<any>`.
    -   `keyof any` replaced with `PropertyKey` in `ModValueFromProps`, `ObjModeFn`, and internal helpers.
    -   Dead imports removed (`Literals`, `Interpolations`, `DefaultTheme` in `mods.ts`).

### Fixed

-   `mods.not('color', 'red')(value => ...)` now correctly infers `value` as `Exclude<colorValues, 'red'>` instead of `'red'`. `getFnMode` was hardcoded to return `FnMode<false>` regardless of its runtime `not` argument; it is now generic over `Not`.
-   `mods.not(['a', 'b'])` (multi-name, no value) guard fixed to check `names.length > 1` instead of `name.length > 1`. The previous comparison was a string-length check for single-string inputs and worked only by coincidence with the fallthrough branch.
-   `Object.values<ModifierValue>(...)` tightened to `Object.values<ModifierValue | undefined>(...)` to honestly reflect `getValueFromProps`'s return shape.

### Requires

-   `styled-components` ≥ `6.0.0` (peer dependency).
-   `typescript` ≥ `5.4` for consumers — the emitted `.d.ts` uses the built-in `NoInfer<T>` utility introduced in TS 5.4.

## [1.1.0] — 2024-10-29

First release with types aligned to the `styled-components` v6 surface.

---

Earlier versions (`0.1.0` – `1.0.9`, `1.1.0`) predate this changelog; refer to the
[git history](https://github.com/Jekins/styled-kit/commits/main) and the
[npm registry](https://www.npmjs.com/package/@styled-kit/mods?activeTab=versions)
for details.
