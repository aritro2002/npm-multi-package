import { runningTotal, sum } from '@aritro-tech/addition';
import { calc } from '@aritro-tech/calculator';
import { percentOf, product } from '@aritro-tech/multiplication';
import { classify, isEmail, toSlug } from '@aritro-tech/regex';
import { deltas, difference } from '@aritro-tech/subtraction';

const line = (label: string, value: unknown) =>
  console.log(`${label.padEnd(28)} ${JSON.stringify(value)}`);

console.log('\n@aritro-tech/addition');
line('sum(1, 2, 3, 4)', sum(1, 2, 3, 4));
line('runningTotal([1, 2, 3])', runningTotal([1, 2, 3]));

console.log('\n@aritro-tech/subtraction');
line('difference(3, 8)', difference(3, 8));
line('deltas([10, 7, 7, 2])', deltas([10, 7, 7, 2]));

console.log('\n@aritro-tech/multiplication');
line('product(2, 3, 4)', product(2, 3, 4));
line('percentOf(250, 20)', percentOf(250, 20));

console.log('\n@aritro-tech/regex');
line("isEmail('dev@example.com')", isEmail('dev@example.com'));
line("toSlug('  Héllo,  World! ')", toSlug('  Héllo,  World! '));
line("classify('my-post')", classify('my-post'));

console.log('\n@aritro-tech/calculator');
const bill = calc(200).plusPercent(18).subtract(20).round(2);
line('200 +18% -20', bill.value());
line('steps', bill.history().length);
console.log();
