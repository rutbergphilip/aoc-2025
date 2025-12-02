import { solve } from './day2';
import { readFile } from './utils';

const main = () => {
  console.log('Advent of Code 2025');

  const input = readFile('day2');
  const result = solve(input);
  console.log('Result:', result);
};

main();
