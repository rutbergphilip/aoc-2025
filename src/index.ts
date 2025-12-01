import { solve } from './day1';
import { readFile } from './utils';

const main = () => {
  console.log('Advent of Code 2025');

  // Day 1
  const day1Input = readFile('day1');
  const day1Result = solve(day1Input);
  console.log('Day 1:', day1Result);
};

main();
