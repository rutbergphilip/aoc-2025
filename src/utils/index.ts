import fs from 'node:fs';
import path from 'node:path';

export function readFile(folderName: string): string {
  const fullPath = path.join(process.cwd(), 'src', folderName, 'input.txt');
  return fs.readFileSync(fullPath, 'utf8');
}

export function parseLines(input: string): string[] {
  return input.trim().split('\n');
}
