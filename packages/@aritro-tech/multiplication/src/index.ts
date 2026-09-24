/** Thrown when an argument is not a finite number. */
export class NotANumberError extends TypeError {
  constructor(value: unknown, position: number) {
    super(`Argument ${position} is not a finite number: ${String(value)}`);
    this.name = 'NotANumberError';
  }
}

export function assertFinite(
  values: readonly unknown[]
): asserts values is number[] {
  values.forEach((value, index) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new NotANumberError(value, index);
    }
  });
}

/** Multiplies two numbers. */
export function multiply(a: number, b: number): number {
  assertFinite([a, b]);
  return a * b;
}

/** Multiplies any count of numbers. Returns 1 for an empty list. */
export function product(...values: number[]): number {
  assertFinite(values);
  return values.reduce((total, value) => total * value, 1);
}

/** Same as {@link product}, but takes an array. */
export function productAll(values: readonly number[]): number {
  return product(...values);
}

/** Raises `base` to a non-negative integer `exponent`. */
export function power(base: number, exponent: number): number {
  assertFinite([base, exponent]);

  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new RangeError(
      `exponent must be a non-negative integer, got ${exponent}`
    );
  }

  return base ** exponent;
}

/** Applies a percentage to a value: `percentOf(250, 20)` is 50. */
export function percentOf(value: number, percent: number): number {
  assertFinite([value, percent]);
  return (value * percent) / 100;
}

/**
 * Multiplies with a fixed number of decimal places:
 * `multiplyPrecise(0.1, 0.2, 2)` is `0.02`.
 */
export function multiplyPrecise(a: number, b: number, decimals = 2): number {
  assertFinite([a, b]);

  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 15) {
    throw new RangeError(
      `decimals must be an integer between 0 and 15, got ${decimals}`
    );
  }

  const factor = 10 ** decimals;
  return Math.round(a * b * factor) / factor;
}
