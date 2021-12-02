import { main } from './index';

test('the answer should be correct', () => {
	const input = [
		'forward 5',
		'down 5',
		'forward 8',
		'up 3',
		'down 8',
		'forward 2',
	].join('\n');
	const answer = main(input);

	expect(answer).toBe(150);
});
