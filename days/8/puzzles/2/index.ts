import { readLines } from '../../../../helpers/input';

const A = 0b1000000;
const B = 0b0100000;
const C = 0b0010000;
const D = 0b0001000;
const E = 0b0000100;
const F = 0b0000010;
const G = 0b0000001;

export function main(input: string) {
	const entries = readLines(input).map(
		entry => entry.split(' | ').map(
			values => values.split(' ')
		)
	);

	let sum = 0;

	for (const entry of entries) {
		const [signalPatterns, outputValues] = entry;
		const binaryPatterns = signalPatterns.map(pattern => getBinaryPattern(pattern));
		const connection = resolveConnection(binaryPatterns);

		sum += read(connection, outputValues);
	}

	return sum;
}

function resolveConnection(patterns: number[]) {
	const patternBySize: Record<number, number[]> = {};
	const digitToPattern: Record<number, number> = {};

	for (const pattern of patterns) {
		const enbaledBitsCount = countEnabledBits(pattern);

		if (!patternBySize[enbaledBitsCount]) {
			patternBySize[enbaledBitsCount] = [];
		}

		patternBySize[enbaledBitsCount].push(pattern);
	}

	digitToPattern[1] = patternBySize[2][0];
	digitToPattern[4] = patternBySize[4][0];
	digitToPattern[7] = patternBySize[3][0];
	digitToPattern[8] = patternBySize[7][0];

	for (const pattern of patternBySize[6]) {
		const diffFrom4 = exclude(pattern, digitToPattern[4]);
		if (countEnabledBits(diffFrom4) === 2) {
			digitToPattern[9] = pattern;
			continue;
		}

		const diffFrom7 = exclude(pattern, digitToPattern[7]);
		if (countEnabledBits(diffFrom7) === 4) {
			digitToPattern[6] = pattern;
			continue;
		}

		digitToPattern[0] = pattern;
	}

	for (const pattern of patternBySize[5]) {
		const diffFrom9 = exclude(pattern, digitToPattern[9]);

		if (countEnabledBits(diffFrom9) === 1) {
			digitToPattern[2] = pattern;
			continue;
		}

		const diffFrom1 = exclude(pattern, digitToPattern[1]);

		if (countEnabledBits(diffFrom1) === 3) {
			digitToPattern[3] = pattern;
			continue;
		}

		digitToPattern[5] = pattern;
	}

	return Object.keys(digitToPattern).reduce((connection, digit) => {
		connection[digitToPattern[digit]] = Number(digit);

		return connection;
	}, {});
}

function read(connection: Record<number, number>, values: string[]) {
	let result = 0;

	for (let i = 0; i < values.length; i++) {
		const digit = connection[getBinaryPattern(values[values.length - 1 - i])];
		result += digit * Math.pow(10, i);
	}

	return result;
}

function exclude(pattern1: number, pattern2: number) {
	return pattern1 & ~pattern2;
}

function getBinaryPattern(pattern: string) {
	let binaryPattern = 0;

	for (const signal of pattern) {
		switch (signal) {
			case 'a': binaryPattern |= A; break;
			case 'b': binaryPattern |= B; break;
			case 'c': binaryPattern |= C; break;
			case 'd': binaryPattern |= D; break;
			case 'e': binaryPattern |= E; break;
			case 'f': binaryPattern |= F; break;
			case 'g': binaryPattern |= G; break;
		}
	}

	return binaryPattern;
}

function countEnabledBits(value: number) {
	let result = 0;

	while (value) {
		result += value % 2;
		value = value >>> 1;
	}

	return result;
}
