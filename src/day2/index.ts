import fs from 'node:fs';
import path from 'node:path';
import { parseLines } from '../utils';

function readInput(): string {
  const dayFolder = path.basename(__dirname);
  const inputPath = path.join(process.cwd(), 'src', dayFolder, 'input.txt');
  return fs.readFileSync(inputPath, 'utf8');
}

const isInvalidIdPart1 = (id: number) => {
  const stringified = id.toString();
  const center = Math.floor(stringified.length / 2);
  const firstHalf = stringified.substring(0, center);
  const secondHalf = stringified.substring(center);
  return firstHalf === secondHalf;
};

const isInvalidIdPart2 = (id: number) => {
  const stringified = id.toString();
  const maxDivisor = stringified.length / 2;
  let currentDivisor = 1;
  let isInvalid = false;

  while (currentDivisor <= maxDivisor) {
    if (stringified.length % currentDivisor === 0) {
      const parts = [] as any[];
      for (let i = 0; i < stringified.length; i += currentDivisor) {
        parts.push(stringified.substring(i, i + currentDivisor));
      }
      if (parts.every((part) => part === parts[0])) {
        isInvalid = true;
        break;
      }
    }
    currentDivisor++;
  }

  return isInvalid;
};

export function solve(): { part1: number; part2: number } {
  const input = readInput();
  const lines = parseLines(input).join('');
  const ids = lines.split(',').map((id) => id.split('-').map(Number));

  const part1 = ids.reduce((acc, [firstId, lastId]) => {
    for (let i = firstId; i <= lastId; i++) {
      const isInvalid = isInvalidIdPart1(i);
      if (isInvalid) {
        acc += i;
      }
    }

    return acc;
  }, 0);

  const part2 = ids.reduce((acc, [firstId, lastId]) => {
    for (let i = firstId; i <= lastId; i++) {
      const isInvalid = isInvalidIdPart1(i) || isInvalidIdPart2(i);
      if (isInvalid) {
        acc += i;
      }
    }

    return acc;
  }, 0);

  return { part1, part2 };
}
