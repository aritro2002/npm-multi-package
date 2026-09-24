# Contributing

## Setup

```sh
npm install
npm run build
npm test
```

## Working on a package

Packages live in `packages/@aritro2002/<name>`. Run a script for one package
with npm's workspace flag:

```sh
npm run test -w @aritro2002/regex
npm run build -w @aritro2002/calculator
```

## Conventions

- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org):
  `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. Lerna derives each
  package's version bump and changelog from these, so the prefix matters.
  Scope commits by package where it helps: `feat(regex): add ipv6 pattern`.
- **Every export is tested.** Tests sit beside the source as
  `src/*.test.ts` and use the Node test runner.
- **No runtime dependencies** outside the workspace. These packages should stay
  installable without pulling in a tree.
- **Sources import with `.ts` extensions** so Node can run them directly;
  the build rewrites them to `.js`.

## Before opening a PR

```sh
npm run lint
npm run typecheck
npm test
```

## Adding a package

See "Adding a package" in the [README](README.md).
