import fs from 'node:fs';
import path from 'node:path';
import { parseLines } from '../utils';

function readInput(): string {
  const dayFolder = path.basename(__dirname);
  const inputPath = path.join(process.cwd(), 'src', dayFolder, 'input.txt');
  return fs.readFileSync(inputPath, 'utf8');
}

const calculate: Record<string, Function> = {
  '*': (...nums: number[]) => nums.reduce((acc, curr) => acc * curr, 1),
  '+': (...nums: number[]) => nums.reduce((acc, curr) => acc + curr, 0),
};

type RetVal<T> = {
  nums: T[];
  operator: string;
};

export function solve(): { part1: number; part2: number } {
  const input = readInput();
  const rows = parseLines(input).map((line) => line.trim().split(/\s+/g));

  const part1 = rows[0].reduce((sum, _, index) => {
    const { nums, operator } = rows.reduce(
      (nums, row) => {
        if (!/[0-9]+/g.test(row[index])) {
          Object.assign(nums, { operator: row[index] });
          return nums;
        }

        nums.nums.push(Number(row[index]));
        return nums;
      },
      { nums: [], operator: '' } as RetVal<number>
    );

    const total = calculate[operator](...nums);

    return (sum += total);
  }, 0);

  // Part 2 - Doesn't work, will fix later
  const rowsPart2 = parseLines(input).map((line) => line.split(''));
  const isNumber = (str: string) => /[0-9]+/g.test(str);
  const isOperator = (str: string) => str === '+' || str === '*';

  const groups: RetVal<string>[] = [];
  rowsPart2[0].reduceRight(
    (group, _, columnIndex) => {
      const allColumnEntries = rowsPart2.reduce((acc, row) => {
        acc.push(row[columnIndex]);
        return acc;
      }, []);

      const numsCombined = allColumnEntries
        .filter((entry) => isNumber(entry))
        .join('');
      const operator = allColumnEntries.find((entry) => isOperator(entry));

      if (numsCombined) group.nums.push(numsCombined);
      if (operator) group.operator = operator;

      if (
        allColumnEntries.every((entry) => entry === ' ') ||
        columnIndex === 0
      ) {
        groups.push(group);
        group = {
          nums: [],
          operator: '',
        };
      }

      return group;
    },
    { nums: [], operator: '' } as RetVal<string>
  );

  const part2 = groups.reduce(
    (acc, { nums, operator }) =>
      (acc += calculate[operator](...nums.map(Number))),
    0
  );

  return { part1, part2 };
}
