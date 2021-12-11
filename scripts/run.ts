import { readFileSync } from 'fs';
import { join } from 'path';

const [,, day, puzzle] = process.argv;

const ROOT = join(__dirname, '..');
const PUZZLE = join(ROOT, 'days', day, 'puzzles', puzzle);

const { main } = require(PUZZLE);

const input = String(readFileSync(join(PUZZLE, 'input.txt')));
const startTimer = process.hrtime.bigint();
const answer = main(input);
const time = (Number(process.hrtime.bigint() - startTimer) / 1000000).toFixed(1);

console.log('The answer is', answer);
console.log(`It takes ${time}ms`);
