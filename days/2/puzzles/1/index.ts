import { readLines } from '../../../../helpers/input';

const DIRECTION = {
	up: 'up',
	down: 'down',
	forward: 'forward',
} as const;

export function main(input: string) {
	const commands = readLines(input);
	let x = 0;
	let depth = 0;

	for (let command of commands) {
		const commandParts = command.split(' ');
		const direction = commandParts[0];
		const value = Number(commandParts[1]);

		switch (direction) {
			case DIRECTION.up: depth -= value; break;
			case DIRECTION.down: depth += value; break;
			case DIRECTION.forward: x += value; break;
		}
	}

	return x * depth;
}
