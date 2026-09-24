import { add, sumAll } from '@aritro-tech/addition';
import { multiply, percentOf } from '@aritro-tech/multiplication';
import { subtract } from '@aritro-tech/subtraction';

export type CalculatorStep = {
  op: 'add' | 'subtract' | 'multiply' | 'divide' | 'percent';
  operand: number;
  result: number;
};

/** Thrown on division by zero. */
export class DivideByZeroError extends RangeError {
  constructor() {
    super('Cannot divide by zero.');
    this.name = 'DivideByZeroError';
  }
}

/**
 * A small chainable calculator over the sibling arithmetic packages.
 * Every instance is immutable: each operation returns a new calculator, so a
 * partially built chain can be reused as a starting point.
 */
export class Calculator {
  readonly #current: number;
  readonly #steps: readonly CalculatorStep[];

  private constructor(current: number, steps: readonly CalculatorStep[]) {
    this.#current = current;
    this.#steps = steps;
  }

  static of(value = 0): Calculator {
    return new Calculator(value, []);
  }

  /** Sums a list in one go, using the addition package. */
  static sum(values: readonly number[]): Calculator {
    return new Calculator(sumAll(values), []);
  }

  private next(op: CalculatorStep['op'], operand: number, result: number) {
    return new Calculator(result, [...this.#steps, { op, operand, result }]);
  }

  add(value: number): Calculator {
    return this.next('add', value, add(this.#current, value));
  }

  subtract(value: number): Calculator {
    return this.next('subtract', value, subtract(this.#current, value));
  }

  multiply(value: number): Calculator {
    return this.next('multiply', value, multiply(this.#current, value));
  }

  divide(value: number): Calculator {
    if (value === 0) {
      throw new DivideByZeroError();
    }
    return this.next('divide', value, this.#current / value);
  }

  /** Adds `percent`% of the current value, e.g. a tax or tip. */
  plusPercent(percent: number): Calculator {
    const delta = percentOf(this.#current, percent);
    return this.next('percent', percent, add(this.#current, delta));
  }

  /** Rounds the running value to `decimals` places. */
  round(decimals = 2): Calculator {
    const factor = 10 ** decimals;
    const rounded = Math.round(this.#current * factor) / factor;
    return new Calculator(rounded, this.#steps);
  }

  /** The running value. */
  value(): number {
    return this.#current;
  }

  /** Every operation applied so far, oldest first. */
  history(): CalculatorStep[] {
    return [...this.#steps];
  }

  toString(): string {
    return `Calculator(${this.#current})`;
  }
}

/** Shorthand for `Calculator.of(value)`. */
export const calc = (value = 0): Calculator => Calculator.of(value);
