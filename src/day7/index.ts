import fs from 'node:fs';
import path from 'node:path';
import { parseLines } from '../utils';

function readInput(): string {
  const dayFolder = path.basename(__dirname);
  const inputPath = path.join(process.cwd(), 'src', dayFolder, 'input.txt');
  return fs.readFileSync(inputPath, 'utf8');
}

const isSplitter = (str: string) => str === '^';

export function solve(): { part1: number; part2: number } {
  const input = readInput();
  const rows = parseLines(input);
  const positions = new Set([rows[0].indexOf('S')]);

  const part1 = rows.reduce((splits, _, rowIndex) => {
    if (rowIndex === 0 || rowIndex === rows.length - 1) return splits;

    const nextRow = rows[rowIndex + 1];
    for (const position of positions) {
      if (isSplitter(nextRow[position])) {
        splits += 1;
        positions.delete(position);
        positions.add(position - 1);
        positions.add(position + 1);
      }
    }

    return splits;
  }, 0);

  const part2 = 0;

  return { part1, part2 };
}
