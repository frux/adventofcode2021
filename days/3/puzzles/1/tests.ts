import { main } from './index';

test('the answer should be correct', () => {
	const input = [
		'00100',
		'11110',
		'10110',
		'10111',
		'10101',
		'01111',
		'00111',
		'11100',
		'10000',
		'11001',
		'00010',
		'01010',
	].join('\n');
	const answer = main(input);

	expect(answer).toBe(198);
});
