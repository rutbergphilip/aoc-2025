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

  // const part2 = rows[0].reduce((sum, _, index) => {
  //   const { nums, operator } = rows.reduce(
  //     (nums, row) => {
  //       if (!/[0-9]+/g.test(row[index])) {
  //         Object.assign(nums, { operator: row[index] });
  //         return nums;
  //       }

  //       nums.nums.push(row[index]);
  //       return nums;
  //     },
  //     { nums: [], operator: '' } as RetVal<string>
  //   );

  //   console.log({ nums });

  //   const startingPosition = Math.max(...nums.map((num) => num.length)) - 1;
  //   const newNums: number[] = [];

  //   for (let i = startingPosition; i >= 0; i--) {
  //     let total = '';

  //     for (let j = 0; j < nums.length; j++) {
  //       const numToAdd = nums[j][i];
  //       if (!numToAdd) continue;
  //       total = total.concat(numToAdd);
  //     }

  //     newNums.push(Number(total));
  //   }

  //   console.log({ newNums });

  //   return (sum += calculate[operator](...newNums));
  // }, 0);

  return { part1, part2: 0 };
}
