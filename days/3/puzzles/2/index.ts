import { readLines } from '../../../../helpers/input';

export function main(input: string) {
	const binaries = readLines(input);
	const bitsLength = binaries[0].length;
	let oxygenBinaries = [...binaries];
	let co2Binaries = [...binaries];

	// eslint-disable-next-line no-constant-condition
	for (let i = 0; true; i++) {
		const index = i % bitsLength;

		if (oxygenBinaries.length > 1) {
			const mostCommonOxygenBit = getMostCommonBit(oxygenBinaries, index);
			const oxygenBit = getOxygenBit(mostCommonOxygenBit);
			oxygenBinaries = oxygenBinaries.filter(bin => bin[index] === oxygenBit);
		}

		if (co2Binaries.length > 1) {
			const mostCommonCo2Bit = getMostCommonBit(co2Binaries, index);
			const co2Bit = getCo2Bit(mostCommonCo2Bit);
			co2Binaries = co2Binaries.filter(bin => bin[index] === co2Bit);
		}

		if (oxygenBinaries.length === 1 && co2Binaries.length === 1) {
			break;
		}
	}

	return parseInt(oxygenBinaries[0], 2) * parseInt(co2Binaries[0], 2);
}

function getOxygenBit(mostCommonBit: string | null) {
	return mostCommonBit === null ? '1' : mostCommonBit;
}

function getCo2Bit(mostCommonBit: string | null) {
	if (mostCommonBit === null) {
		return '0';
	}

	return mostCommonBit === '1' ? '0' : '1';
}

function getMostCommonBit(binaries: string[], position: number) {
	let zeroCount = 0;

	for (const bin of binaries) {
		if (bin[position] === '0') {
			zeroCount++;
		}
	}

	if (zeroCount === binaries.length / 2) {
		return null;
	}

	return zeroCount > binaries.length / 2 ? '0' : '1';
}
