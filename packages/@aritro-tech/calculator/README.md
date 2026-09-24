# @aritro-tech/calculator

A chainable, immutable calculator built on the sibling arithmetic packages. It
is the one package here with workspace dependencies, so it also shows how the
monorepo links packages together.

## Install

```sh
npm install @aritro-tech/calculator
```

It pulls in `@aritro-tech/addition`, `@aritro-tech/subtraction` and
`@aritro-tech/multiplication`.

## Usage

```ts
import { calc, Calculator } from '@aritro-tech/calculator';

calc(10).add(5).subtract(3).multiply(2).value(); // 24

// Every step returns a new calculator, so a chain can be forked.
const base = calc(100).subtract(20);
base.add(5).value(); // 85
base.add(10).value(); // 90
base.value(); // 80 — unchanged

calc(200).plusPercent(18).round(2).value(); // 236
Calculator.sum([1, 2, 3]).multiply(2).value(); // 12
```

## API

| Export | Description |
| --- | --- |
| `calc(value = 0)` | Shorthand for `Calculator.of`. |
| `Calculator.of(value)` | Starts a chain. |
| `Calculator.sum(values)` | Starts a chain from the sum of a list. |
| `.add` `.subtract` `.multiply` `.divide` | The four operations; each returns a new calculator. |
| `.plusPercent(percent)` | Adds `percent`% of the running value. |
| `.round(decimals = 2)` | Rounds the running value without adding a step. |
| `.value()` | The running value. |
| `.history()` | Every operation applied so far. |
| `DivideByZeroError` | Thrown by `.divide(0)`. |

## License

MIT
