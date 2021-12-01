import { readNumbers } from '../../../../helpers/input';

export function main(input: string) {
	const measurements = readNumbers(input);
	let count = 0;

	for (let i = 0; i < measurements.length; i++) {
		if (i > 0 && measurements[i] > measurements[i-1]) {
			count++;
		}
	}

	return count;
}
