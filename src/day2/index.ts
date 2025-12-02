import { parseLines } from '../utils';

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

export function solve(input: string): { part1: number; part2: number } {
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
