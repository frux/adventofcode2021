import { readLines } from '../../../../helpers/input';

export function main(input: string) {
	const ranges = parseInput(input);
	const map: Map = {};

	for (const range of ranges) {
		if (isDiagonal(range)) {
			continue;
		}

		const [[x1, y1], [x2, y2]] = range;
		const fromX = x1;
		const toX = x2;
		const fromY = y1;
		const toY = y2;
		const length = Math.max(Math.abs(toX - fromX) + 1, Math.abs(toY - fromY) + 1);
		let x = fromX;
		let y = fromY;

		for (let i = 0; i < length; i++) {
			map[`${x},${y}`] = (map[`${x},${y}`] ?? 0) + 1;

			if (x !== toX) {
				x += Math.sign(toX - fromX);
			}

			if (y !== toY) {
				y += Math.sign(toY - fromY);
			}
		}
	}

	return Object.keys(map).filter(point => map[point] > 1).length;
}

type Map = Record<`${number},${number}`, number>;
type Coord = [number, number];
type Range = [Coord, Coord];

function parseInput(input: string) {
	const lines = readLines(input);
	return lines
		.map(
			line => line
				.split(' -> ')
				.map(
					part => part
						.split(',')
						.map(num => Number(num))
				)
			) as Range[];
}

function isDiagonal(range: Range) {
	return range[0][0] !== range[1][0] && range[0][1] !== range[1][1];
}
