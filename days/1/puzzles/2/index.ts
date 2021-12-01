import { readNumbers } from '../../../../helpers/input';

const WINDOW_SIZE = 3;

export function main(input: string) {
	const measurements = readNumbers(input);
	let count = 0;

	for (let i = 0; i < measurements.length; i++) {
		if (i === 0 || i + WINDOW_SIZE > measurements.length) {
			continue;
		}

		/*
			No need to calculate sum of both windows.
			They have a common part of two measurements.
			So we need to compare only two different measurements.
		*/
		if (measurements[i - 1] < measurements[i + WINDOW_SIZE - 1]) {
			count++;
		}
	}

	return count;
}
