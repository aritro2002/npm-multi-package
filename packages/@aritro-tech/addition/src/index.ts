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

/** Adds two numbers. */
export function add(a: number, b: number): number {
  assertFinite([a, b]);
  return a + b;
}

/** Adds any count of numbers. Returns 0 for an empty list. */
export function sum(...values: number[]): number {
  assertFinite(values);
  return values.reduce((total, value) => total + value, 0);
}

/** Same as {@link sum}, but takes an array. */
export function sumAll(values: readonly number[]): number {
  return sum(...values);
}

/**
 * Running totals: `[1, 2, 3]` becomes `[1, 3, 6]`.
 * Useful for cumulative charts without pulling in a stats library.
 */
export function runningTotal(values: readonly number[]): number[] {
  assertFinite(values);

  let total = 0;
  return values.map((value) => {
    total += value;
    return total;
  });
}

/**
 * Adds with a fixed number of decimal places, sidestepping float drift:
 * `addPrecise(0.1, 0.2)` is `0.3`, not `0.30000000000000004`.
 */
export function addPrecise(a: number, b: number, decimals = 2): number {
  assertFinite([a, b]);

  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 15) {
    throw new RangeError(
      `decimals must be an integer between 0 and 15, got ${decimals}`
    );
  }

  const factor = 10 ** decimals;
  return Math.round((a + b) * factor) / factor;
}
