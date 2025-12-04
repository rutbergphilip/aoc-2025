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
  const rows = parseLines(input).map((row) => row.split(''));
  const isRoll = (char: string) => char === '@';
  const sumAdjecentRolls = (
    rowIndex: number,
    entityIndex: number,
    matrix: string[][]
  ): number => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    return directions.reduce((count, [rowOff, colOff]) => {
      const neighbor = matrix[rowIndex + rowOff]?.[entityIndex + colOff];
      return isRoll(neighbor) ? count + 1 : count;
    }, 0);
  };

  const part1 = rows.reduce((rolls, row, rowIndex, matrix) => {
    let availableRollsOnRow = 0;
    for (const [entityIndex, entity] of row.entries()) {
      if (!isRoll(entity)) continue;

      const adjecentSum = sumAdjecentRolls(rowIndex, entityIndex, matrix);
      if (adjecentSum < 4) availableRollsOnRow++;
    }

    return (rolls += availableRollsOnRow);
  }, 0);

  let part2 = 0;
  let canContinue = true;
  while (canContinue) {
    let hadChanges = false;
    for (const [rowIndex, row] of rows.entries()) {
      for (const [entityIndex, entity] of row.entries()) {
        if (!isRoll(entity)) continue;

        const adjecentSum = sumAdjecentRolls(rowIndex, entityIndex, rows);
        if (adjecentSum < 4) {
          part2++;
          rows[rowIndex][entityIndex] = 'x';
          hadChanges = true;
        }
      }
    }

    if (!hadChanges) canContinue = false;
  }

  return { part1, part2 };
}
