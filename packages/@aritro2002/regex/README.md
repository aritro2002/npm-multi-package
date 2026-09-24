# @aritro2002/regex

Anchored, reusable regular expressions for everyday validation, plus a couple of
string helpers.

## Install

```sh
npm install @aritro2002/regex
```

## Usage

```ts
import { isEmail, isSemver, classify, escape, toSlug } from '@aritro2002/regex';

isEmail('dev@example.com'); // true
isEmail('dev@example.com extra'); // false — patterns are anchored
isSemver('1.2.3-beta.1'); // true

classify('my-post'); // ['slug']
escape('1+1'); // '1\\+1'
toSlug('  Héllo,  World! '); // 'hello-world'
```

## Patterns

`email`, `url`, `slug`, `hexColor`, `ipv4`, `uuid`, `isoDate`, `semver`.

Each is exposed as a **factory** on `patterns`, not a shared instance:

```ts
import { patterns } from '@aritro2002/regex';

patterns.email().test('dev@example.com');
```

A single shared regex would carry `lastIndex` between calls if it ever gained
the `g` flag, which makes validation return alternating results. Handing out a
fresh instance per call rules that out.

## API

| Export | Description |
| --- | --- |
| `patterns` | Map of pattern name to a factory returning a fresh `RegExp`. |
| `patternNames` | Array of every pattern name. |
| `matches(name, value)` | Tests a value against a named pattern. |
| `isEmail` … `isSemver` | One shorthand per pattern. |
| `classify(value)` | Every pattern name the value satisfies. |
| `escape(value)` | Escapes a string for use inside a `RegExp`. |
| `toSlug(value)` | Turns arbitrary text into a URL-safe slug. |

## License

MIT
