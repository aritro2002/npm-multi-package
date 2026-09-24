# @aritro-tech/multiplication

Multiplication helpers that validate their input and keep float drift out of the result.

## Install

```sh
npm install @aritro-tech/multiplication
```

## Usage

```ts
import {
  multiply,
  product,
  productAll,
  power,
  percentOf,
  multiplyPrecise,
} from '@aritro-tech/multiplication';

multiply(3, 4); // 12
product(2, 3, 4); // 24
productAll([5, 0]); // 0
power(2, 10); // 1024
percentOf(250, 20); // 50
multiplyPrecise(0.1, 0.2, 2); // 0.02
```

## API

| Export | Description |
| --- | --- |
| `multiply(a, b)` | Multiplies two numbers. |
| `product(...values)` | Multiplies any count of numbers. `1` for no arguments. |
| `productAll(values)` | Array form of `product`. |
| `power(base, exponent)` | Raises to a non-negative integer exponent. |
| `percentOf(value, percent)` | Applies a percentage to a value. |
| `multiplyPrecise(a, b, decimals = 2)` | Multiplies and rounds to `decimals` places. |
| `NotANumberError` | Thrown when an argument is not a finite number. |

`power` throws a `RangeError` for negative or fractional exponents.

## License

MIT
