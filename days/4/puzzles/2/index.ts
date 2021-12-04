import { readLines } from '../../../../helpers/input';

export function main(input: string) {
	const [drawnNumbers, cards] = parseInput(input);

	for (const num of drawnNumbers) {
		for (const card of cards) {
			card.mark(num);

			if (card.isBingo()) {
				cards.delete(card);
			}

			if (cards.size === 0) {
				return num * card.getScore();
			}
		}
	}
}

function parseInput(input: string) {
	const lines = readLines(input);
	const drawnNumbers = lines[0].split(',').map(num => Number(num));
	const cards = new Set<Card>();
	let currentCard: number[][] = [];

	/**
	 * Skip first two lines with drawn numbers.
	 * We're gonna look behind on the previous line to get know
	 * if the current line is the first line of a new card.
	 */
	for (let i = 2; i < lines.length; i++) {
		// this line is empty so new we start new card
		if (lines[i] === '') {
			currentCard = [];
			continue;
		}

		// have to use trim because some numbers are spaced by two spaces instead of one
		const cardLine = lines[i].split(' ').reduce((cardLine, num) => {
			// some numbers are spaced by more than one space so we have to filter empty items after splitting
			if (num !== '') {
				cardLine.push(Number(num));
			}

			return cardLine;
		}, []);

		currentCard.push(cardLine);

		if (lines[i+1] === '' || i === lines.length - 1) {
			cards.add(new Card(currentCard));
		}
	}

	return [drawnNumbers, cards] as const;
}

class Card {
	static MARK = -1;
	#values: number[][];

	constructor(values: number[][]) {
		this.#values = values;
	}

	isBingo() {
		for (let i = 0; i < this.#values.length; i++) {
			if (this.#chekRow(i)) {
				return true;
			}
		}

		for (let i = 0; i < this.#values[0].length; i++) {
			if (this.#checkColumn(i)) {
				return true;
			}
		}

		return false;
	}

	mark(value: number) {
		for (let i = 0; i < this.#values.length; i++) {
			for (let j = 0; j < this.#values.length; j++) {
				if (this.#values[i][j] === value) {
					this.#values[i][j] = Card.MARK;
				}
			}
		}
	}

	getScore() {
		let score = 0;

		for (const row of this.#values) {
			for (const num of row) {
				if (num !== Card.MARK) {
					score += num;
				}
			}
		}

		return score;
	}

	#chekRow(row: number) {
		for (const num of this.#values[row]) {
			if (num !== Card.MARK) {
				return false;
			}
		}

		return true;
	}

	#checkColumn(column: number) {
		for (const row of this.#values) {
			if (row[column] !== Card.MARK) {
				return false;
			}
		}

		return true;
	}
}
