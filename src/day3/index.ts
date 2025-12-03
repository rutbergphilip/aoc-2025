import fs from 'node:fs';
import path from 'node:path';
import { parseLines } from '../utils';

function readInput(): string {
  const dayFolder = path.basename(__dirname);
  const inputPath = path.join(process.cwd(), 'src', dayFolder, 'input.txt');
  return fs.readFileSync(inputPath, 'utf8');
}

export function solve(): { part1: number; part2: number } {
  const input = readInput();
  const banks = parseLines(input);

  const part1 = banks.reduce((accumulator, currentBank) => {
    const numbers = currentBank.split('').map(Number);
    let biggestOne = 0;
    let biggestTwo = 0;
    let biggestOneIndex = 0;

    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] > biggestOne) {
        biggestOne = numbers[i];
        biggestOneIndex = i;
      }
    }

    for (let i = biggestOneIndex + 1; i < numbers.length; i++) {
      if (numbers[i] > biggestTwo) {
        biggestTwo = numbers[i];
      }
    }

    return accumulator + Number(`${biggestOne}${biggestTwo}`);
  }, 0);

  const part2 = banks.reduce((accumulator, currentBank) => {
    const numbers = currentBank.split('').map(Number);

    let startIndex = 0;
    let joltage = '';

    for (let i = 0; i < 12; i++) {
      const availableNumbers = numbers.slice(
        startIndex,
        numbers.length - 12 + i + 1
      );
      const max = Math.max(...availableNumbers);
      const maxIndex = startIndex + availableNumbers.indexOf(max);
      joltage = joltage.concat(max.toString());
      startIndex = maxIndex + 1;
    }

    return accumulator + Number(joltage);
  }, 0);

  return { part1, part2 };
}
