export function main(input: string) {
	const crabs = input.split(',').map(Number).sort((a, b) => a - b);
	const countedCoords = {};
	const uniqCoords = [];
	const maxCoord = crabs[crabs.length - 1];

	for (const coord of crabs) {
		countedCoords[coord] = (countedCoords[coord] ?? 0) + 1;

		if (uniqCoords[uniqCoords.length - 1] !== coord) {
			uniqCoords.push(coord);
		}
	}

	const fuel1 = [];
	const fuel2 = [];

	for (let i = 0; i <= maxCoord; i++) {
		fuel1[i] = 0;
		fuel2[i] = 0;

		if (i !== 0) {
			for (let j = 0; uniqCoords[j] <= i; j++) {
				const coord = uniqCoords[j];
				const fuel = i - coord;
				fuel1[i] += countedCoords[coord] * ((fuel * (fuel + 1)) / 2);
			}
		}

		if (i !== maxCoord) {
			for (let j = uniqCoords.length-1; uniqCoords[j] >= i; j--) {
				const coord = uniqCoords[j];
				const fuel = coord - i;
				fuel2[i] += countedCoords[coord] * ((fuel * (fuel + 1)) / 2);
			}
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
