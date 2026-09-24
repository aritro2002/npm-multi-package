import { runningTotal, sum } from '@aritro2002/addition';
import { calc } from '@aritro2002/calculator';
import { percentOf, product } from '@aritro2002/multiplication';
import { classify, isEmail, toSlug } from '@aritro2002/regex';
import { deltas, difference } from '@aritro2002/subtraction';

const line = (label: string, value: unknown) =>
  console.log(`${label.padEnd(28)} ${JSON.stringify(value)}`);

console.log('\n@aritro2002/addition');
line('sum(1, 2, 3, 4)', sum(1, 2, 3, 4));
line('runningTotal([1, 2, 3])', runningTotal([1, 2, 3]));

console.log('\n@aritro2002/subtraction');
line('difference(3, 8)', difference(3, 8));
line('deltas([10, 7, 7, 2])', deltas([10, 7, 7, 2]));

console.log('\n@aritro2002/multiplication');
line('product(2, 3, 4)', product(2, 3, 4));
line('percentOf(250, 20)', percentOf(250, 20));

console.log('\n@aritro2002/regex');
line("isEmail('dev@example.com')", isEmail('dev@example.com'));
line("toSlug('  Héllo,  World! ')", toSlug('  Héllo,  World! '));
line("classify('my-post')", classify('my-post'));

console.log('\n@aritro2002/calculator');
const bill = calc(200).plusPercent(18).subtract(20).round(2);
line('200 +18% -20', bill.value());
line('steps', bill.history().length);
console.log();
