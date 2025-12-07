import fs from 'node:fs';
import path from 'node:path';
import { parseLines } from '../utils';
import { group } from 'node:console';

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
  const rowsUntouched = parseLines(input);
  console.log({ rowsUntouched });
  const firstRow = rowsUntouched[0];
  const longestRowLength = Math.max(...rowsUntouched.map((row) => row.length));
  const isNumber = (str: string) => /[0-9]+/g.test(str);
  const isOperator = (str: string) => str === '+' || str === '*';
  let sum = 0;
  console.log({ firstRow });

  const groups: RetVal<string>[] = [];

  for (
    let columnIndex = longestRowLength - 1;
    columnIndex >= 0;
    columnIndex--
  ) {
    let everyRowItemWasEmpty = true;
    let numbersInCol = '';
    let operator = '';
    for (let rowIndex = 0; rowIndex < rowsUntouched.length; rowIndex++) {
      const currentValue = rowsUntouched[rowIndex]?.[columnIndex];

      // console.log({
      //   currentValue,
      //   isNum: isNumber(currentValue),
      // });

      if (isNumber(currentValue)) {
        numbersInCol += currentValue;
        everyRowItemWasEmpty = false;
      }
      if (isOperator(currentValue)) {
        operator = currentValue;
        everyRowItemWasEmpty = false;
      }

      // console.log({
      //   numbersInCol,
      //   isLast: rowIndex === rowsUntouched.length - 1,
      //   everyRowItemWasEmpty,
      // });
    }

    if (numbersInCol && operator) {
      groups.push({
        operator: operator,
        nums: [numbersInCol],
      });
    }
  }

  console.log(groups);

  return { part1, part2: 0 };
}
