import { parseLines } from '../utils';

export function solve(input: string): { part1: number; part2: number } {
  const min = 0;
  const max = 99;
  const rotationSequence = parseLines(input);
  let current = 50;
  let totalTimesPointedAt0 = 0;
  let totalTimesStoppedAt0 = 0;

  for (const rotation of rotationSequence) {
    const direction = rotation.charAt(0);
    const steps = parseInt(rotation.substring(1));

    for (let i = 0; i < steps; i++) {
      if (direction === 'R') {
        if (current === 99) {
          current = min;
        } else {
          current++;
        }
      } else {
        if (current === min) {
          current = max;
        } else {
          current--;
        }
      }
      if (current === 0) {
        totalTimesPointedAt0++;
      }
    }
    if (current === 0) {
      totalTimesStoppedAt0++;
    }
  }

  return { part1: totalTimesStoppedAt0, part2: totalTimesPointedAt0 };
}
