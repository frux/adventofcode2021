const DAYS = 256;
const GROWING_UP_PERIOD = 2; // days for fish to become capable of producing more fish
const GESTATION_PERIOD = 7; // days for mature fish creates one more fish

export function main(input: string) {
	const initialFishes = input.split(',').map(Number);
	let fishesCount = initialFishes.length;

	// map of weekday to how many fishes are gonna be born at this day on the next week
	const birthdays: Record<number, number> = {};

	// map of weekday to how many fishes are gonna become mature at this day on the nextweek
	const maturing: Record<number, number> = {};

	for (const age of initialFishes) {
		birthdays[age] = (birthdays[age] ?? 0) + 1;
	}

	for (let i = 0; i < DAYS; i++) {
		const weekday = i % GESTATION_PERIOD;

		if (birthdays[weekday]) {
			const maturingWeekday = (weekday + GROWING_UP_PERIOD) % GESTATION_PERIOD;
			maturing[maturingWeekday] = birthdays[weekday];

			fishesCount += birthdays[weekday];
		}

		if (maturing[weekday]) {
			birthdays[weekday] = (birthdays[weekday] ?? 0) + maturing[weekday];
		}
	}

	return fishesCount;
}
