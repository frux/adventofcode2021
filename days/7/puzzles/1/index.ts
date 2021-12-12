export function main(input: string) {
	const crabs = input.split(',').map(Number);
	const countedCoords = {};
	let maxCoord = 0;

	for (const coord of crabs) {
		countedCoords[coord] = (countedCoords[coord] ?? 0) + 1;

		if (coord > maxCoord) {
			maxCoord = coord;
		}
	}

	const fuel1 = [];
	const fuel2 = [];
	let crabsCount1 = 0;
	let crabsCount2 = 0;

	for (let i = 0; i <= maxCoord; i++) {
		const reversedIndex = maxCoord - i;
		fuel1[i] = i === 0 ? 0 : fuel1[i-1] + crabsCount1;
		fuel2[reversedIndex] = i === 0 ? 0 : fuel2[reversedIndex + 1] + crabsCount2;

		if (countedCoords[i]) {
			crabsCount1 += countedCoords[i];
		}

		if (countedCoords[reversedIndex]) {
			crabsCount2 += countedCoords[reversedIndex];
		}
	}

	let fuel = Infinity;

	for (let i = 0; i <= maxCoord; i++) {
		const requiredFuel = fuel1[i] + fuel2[i];

		if (requiredFuel < fuel) {
			fuel = requiredFuel;
		}
	}

	return fuel;
}
