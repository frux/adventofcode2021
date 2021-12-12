import { readLines } from '../../../../helpers/input';

export function main(input: string) {
	const binaries = readLines(input);
	let gammaRate = '';

	for (let i = 0; i < binaries[0].length; i++) {
		let zeroCount = 0;

		for (const bin of binaries) {
			if (bin[i] === '0') {
				zeroCount++;
			}
		}

		gammaRate += zeroCount > binaries.length / 2 ? '0' : '1';
	}

	const epsilonRate = invertBits(gammaRate);

	return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function invertBits(bin: string) {
	const len = bin.length;

	const mask = Math.pow(2, len) - 1;

	return (parseInt(bin, 2) ^ mask).toString(2);
}
