# @aritro2002/subtraction

Subtraction helpers that validate their input and keep float drift out of the result.

## Install

```sh
npm install @aritro2002/subtraction
```

## Usage

```ts
import {
  subtract,
  subtractAll,
  difference,
  deltas,
  subtractPrecise,
} from '@aritro2002/subtraction';

subtract(10, 4); // 6
subtractAll([10, 3, 2]); // 5
difference(3, 8); // 5  (order does not matter)
deltas([10, 7, 7, 2]); // [-3, 0, -5]
subtractPrecise(0.3, 0.1); // 0.2  (not 0.19999999999999998)
```

## API

| Export | Description |
| --- | --- |
| `subtract(a, b)` | Subtracts `b` from `a`. |
| `subtractAll(values)` | Subtracts every later value from the first. `0` for an empty list. |
| `difference(a, b)` | Absolute distance between two numbers. |
| `deltas(values)` | Step-by-step changes; one shorter than the input. |
| `subtractPrecise(a, b, decimals = 2)` | Subtracts and rounds to `decimals` places. |
| `assertFinite(values)` | Assertion helper used internally. |
| `NotANumberError` | Thrown when an argument is not a finite number. |

## License

MIT
