import { readLines } from '../../../../helpers/input';

const DIRECTION = {
	up: 'up',
	down: 'down',
	forward: 'forward',
} as const;

export function main(input: string) {
	const commands = readLines(input);
	let aim = 0;
	let x = 0;
	let depth = 0;

	for (let command of commands) {
		const commandParts = command.split(' ');
		const direction = commandParts[0];
		const value = Number(commandParts[1]);

		switch (direction) {
			case DIRECTION.up: aim -= value; break;
			case DIRECTION.down: aim += value; break;
			case DIRECTION.forward:
				x += value;
				depth += aim * value;
				break;
		}
	}

	return x * depth;
}
