import { readLines } from '../../../../helpers/input';

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
				value.length === 2 || // 1
				value.length === 4 || // 4
				value.length === 3 || // 7
				value.length === 7    // 8
			) {
				count++;
			}
		}
	}

	return count;
}
