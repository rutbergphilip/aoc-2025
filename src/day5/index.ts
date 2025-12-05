import fs from 'node:fs';
import path from 'node:path';
import { parseDoubleInputLines } from '../utils';

function readInput(): string {
  const dayFolder = path.basename(__dirname);
  const inputPath = path.join(process.cwd(), 'src', dayFolder, 'input.txt');
  return fs.readFileSync(inputPath, 'utf8');
}

export function solve(): { part1: number; part2: number } {
  const input = readInput();
  const [ranges, ingredients] = parseDoubleInputLines(input);

  const part1 = ingredients.reduce((acc, curr) => {
    const ingredient = Number(curr);

    const isFresh = ranges.reduce((fresh, range) => {
      if (fresh) return fresh;
      const [min, max] = range.split('-').map(Number);

      if (ingredient >= min && ingredient <= max) fresh = true;

      return fresh;
    }, false);

    if (isFresh) acc++;

    return acc;
  }, 0);

  const allRanges = ranges.map((range) => range.split('-').map(Number));
  allRanges.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];

  for (const [min, max] of allRanges) {
    if (!merged.length) {
      merged.push([min, max]);
      continue;
    }

    const last = merged[merged.length - 1];
    if (min <= last[1] + 1) {
      last[1] = Math.max(last[1], max);
    } else {
      merged.push([min, max]);
    }
  }

  const part2 = merged.reduce((sum, [min, max]) => sum + (max - min + 1), 0);

  return { part1, part2 };
}
