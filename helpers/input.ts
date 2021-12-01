export function readLines(input: string) {
	return input.split('\n');
}

export function readNumbers(input: string) {
	return readLines(input).map(line => Number(line));
}
