# npm-multi-package

A monorepo of small, independently versioned and independently published npm
packages. The layout follows the `packages/@scope/<package>` convention used by
projects such as [`react-native-hyperswitch`](https://github.com/juspay/react-native-hyperswitch):
one scope folder, one directory per package, each package self-contained with
its own `package.json`, `tsconfig`, README, changelog and license.

The packages themselves are deliberately small — arithmetic and regex helpers —
so the interesting part is the plumbing: workspaces, Lerna, per-package builds
and a cross-package dependency.

## Packages

| Package | What it does |
| --- | --- |
| [`@aritro-tech/addition`](packages/@aritro-tech/addition) | `add`, `sum`, `runningTotal`, `addPrecise` |
| [`@aritro-tech/subtraction`](packages/@aritro-tech/subtraction) | `subtract`, `difference`, `deltas`, `subtractPrecise` |
| [`@aritro-tech/multiplication`](packages/@aritro-tech/multiplication) | `multiply`, `product`, `power`, `percentOf` |
| [`@aritro-tech/regex`](packages/@aritro-tech/regex) | Anchored validation patterns, `classify`, `escape`, `toSlug` |
| [`@aritro-tech/calculator`](packages/@aritro-tech/calculator) | Chainable calculator; **depends on the three arithmetic packages** |

`calculator` is the one package with workspace dependencies. It exists to show
how a package in this repo consumes its siblings — during development npm links
them from `node_modules/@aritro-tech/*`, and on publish they resolve from the
registry by version range.

## Layout

```
.
├── package.json              # workspaces + repo-wide scripts
├── lerna.json                # independent versioning
├── tsconfig.json             # shared compiler options + path aliases
├── eslint.config.mjs
├── example/                  # runnable demo of every package
└── packages/@aritro-tech/
    ├── addition/
    │   ├── src/index.ts
    │   ├── src/index.test.ts
    │   ├── package.json
    │   ├── tsconfig.json         # typecheck (noEmit)
    │   ├── tsconfig.build.json   # emit to lib/
    │   ├── README.md
    │   ├── CHANGELOG.md
    │   └── LICENSE
    ├── subtraction/
    ├── multiplication/
    ├── regex/
    └── calculator/
```

## Getting started

```sh
npm install      # installs and links every workspace
npm run build    # tsc per package, in dependency order
npm test         # builds, then runs each package's tests
npm run example  # prints output from all five packages
```

Other scripts: `npm run typecheck`, `npm run lint`, `npm run clean`.

## How a package is wired

Each package is ESM-only and ships compiled output plus sources:

```jsonc
{
  "type": "module",
  "main": "./lib/index.js",
  "types": "./lib/index.d.ts",
  "exports": {
    ".": { "types": "./lib/index.d.ts", "default": "./lib/index.js" },
    "./package.json": "./package.json"
  },
  "files": ["lib", "src", "!src/**/*.test.ts"]
}
```

Two tsconfigs per package, both extending the root one:

- `tsconfig.json` — `noEmit`, used for typechecking and editor support.
- `tsconfig.build.json` — emits `lib/` with declarations and source maps, and
  clears `paths` so sibling imports resolve to built packages rather than
  being pulled into this package's build.

Sources import each other with explicit `.ts` extensions so Node can run them
directly via type stripping; TypeScript's `rewriteRelativeImportExtensions`
turns those into `.js` on emit.

## Tests

Tests use the built-in Node test runner with type stripping — no jest, no ts-node:

```sh
node --test --experimental-strip-types "src/**/*.test.ts"
```

Requires Node 18+; Node 22.6+ for the strip-types flag.

## Adding a package

1. `mkdir -p packages/@aritro-tech/<name>/src`
2. Copy `package.json`, `tsconfig.json`, `tsconfig.build.json`, `LICENSE` and
   the dotfiles from an existing package, and update the name, description,
   keywords and `repository.directory`.
3. Add a `paths` entry in the root `tsconfig.json`.
4. Write `src/index.ts` and `src/index.test.ts`.
5. `npm install` to link it, then `npm test`.

## Releasing

Versioning is independent — each package moves on its own, driven by
conventional commits:

```sh
npx lerna version --conventional-commits   # bump, changelog, tag
npm run release                            # lerna publish
```

Publishing under `@aritro-tech` requires that npm scope to exist and
`publishConfig.access` to stay `public`.

## License

MIT
