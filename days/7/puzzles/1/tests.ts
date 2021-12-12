import { main } from './index';

test('the answer should be correct', () => {
	const input = '16,1,2,0,4,2,7,1,2,14';
	const answer = main(input);

	expect(answer).toBe(37);
});
