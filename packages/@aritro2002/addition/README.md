# @aritro2002/addition

Addition helpers that validate their input and keep float drift out of the result.

## Install

```sh
npm install @aritro2002/addition
```

## Usage

```ts
import { add, sum, sumAll, runningTotal, addPrecise } from '@aritro2002/addition';

add(2, 3); // 5
sum(1, 2, 3, 4); // 10
sumAll([5, 5]); // 10
runningTotal([1, 2, 3]); // [1, 3, 6]
addPrecise(0.1, 0.2); // 0.3  (not 0.30000000000000004)
```

## API

| Export | Description |
| --- | --- |
| `add(a, b)` | Adds two numbers. |
| `sum(...values)` | Adds any count of numbers. `0` for no arguments. |
| `sumAll(values)` | Array form of `sum`. |
| `runningTotal(values)` | Cumulative totals, same length as the input. |
| `addPrecise(a, b, decimals = 2)` | Adds and rounds to `decimals` places. |
| `assertFinite(values)` | Assertion helper used internally. |
| `NotANumberError` | Thrown when an argument is not a finite number. |

Every function rejects `NaN` and `Infinity` with a `NotANumberError`.

## License

MIT
