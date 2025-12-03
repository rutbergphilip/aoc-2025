import fs from 'node:fs';
import path from 'node:path';
import { parseLines } from '../utils';

function readInput(): string {
  // Extract day folder name from __dirname (e.g., 'dayX' from 'dist/dayX' or 'src/dayX')
  const dayFolder = path.basename(__dirname);
  const inputPath = path.join(process.cwd(), 'src', dayFolder, 'input.txt');
  return fs.readFileSync(inputPath, 'utf8');
}

export function solve(): { part1: number; part2: number } {
  const input = readInput();
  const lines = parseLines(input);

  // TODO: Implement part 1
  const part1 = 0;

  // TODO: Implement part 2
  const part2 = 0;

  return { part1, part2 };
}
