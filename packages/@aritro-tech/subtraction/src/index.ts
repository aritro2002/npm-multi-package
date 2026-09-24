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

/** Subtracts `b` from `a`. */
export function subtract(a: number, b: number): number {
  assertFinite([a, b]);
  return a - b;
}

/**
 * Subtracts every later value from the first: `subtractAll([10, 3, 2])` is 5.
 * Returns 0 for an empty list.
 */
export function subtractAll(values: readonly number[]): number {
  assertFinite(values);

  const [first, ...rest] = values;
  if (first === undefined) {
    return 0;
  }

  return rest.reduce((total, value) => total - value, first);
}

/** Absolute distance between two numbers, so order never matters. */
export function difference(a: number, b: number): number {
  assertFinite([a, b]);
  return Math.abs(a - b);
}

/** Step-by-step deltas: `[10, 7, 7, 2]` becomes `[-3, 0, -5]`. */
export function deltas(values: readonly number[]): number[] {
  assertFinite(values);

  const result: number[] = [];
  for (let index = 1; index < values.length; index += 1) {
    result.push(values[index]! - values[index - 1]!);
  }
  return result;
}

/**
 * Subtracts with a fixed number of decimal places:
 * `subtractPrecise(0.3, 0.1)` is `0.2`, not `0.19999999999999998`.
 */
export function subtractPrecise(a: number, b: number, decimals = 2): number {
  assertFinite([a, b]);

  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 15) {
    throw new RangeError(
      `decimals must be an integer between 0 and 15, got ${decimals}`
    );
  }

  const factor = 10 ** decimals;
  return Math.round((a - b) * factor) / factor;
}
