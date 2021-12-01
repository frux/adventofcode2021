import { readFileSync } from 'fs';
import { join } from 'path';

const [,, day, puzzle] = process.argv;

const ROOT = join(__dirname, '..');
const PUZZLE = join(ROOT, 'days', day, 'puzzles', puzzle);

const { main } = require(PUZZLE);

const input = String(readFileSync(join(PUZZLE, 'input.txt')));

console.log('The answer is', main(input));
