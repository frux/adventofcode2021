import { readLines } from '../../../../helpers/input';

const A = 'a';
const B = 'b';
const C = 'c';
const D = 'd';
const E = 'e';
const F = 'f';
const G = 'g';
const DIGITS = {
	0: [A, B, C, E, F, G],
	1: [C, F],
	2: [A, C, D, E, G],
	3: [A, C, D, F, G],
	4: [B, C, D, F],
	5: [A, B, D, F, G],
	6: [A, B, D, F, G],
	7: [A, C, F],
	8: [A, B, C, D, E, F, G],
	9: [A, B, C, D, F, G],

};
export function main(input: string) {
	const entries = readLines(input).map(
		entry => entry.split(' | ').map(
			values => values.split(' ')
		)
	);

	let count = 0;

	for (const entry of entries) {
		const [, outputValues] = entry;

		for (const value of outputValues) {
			if (
				value.length === DIGITS[1].length ||
				value.length === DIGITS[4].length ||
				value.length === DIGITS[7].length ||
				value.length === DIGITS[8].length
			) {
				count++;
			}
		}
	}

	return count;
}
