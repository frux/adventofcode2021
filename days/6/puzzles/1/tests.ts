import { main } from './index';

test('the answer should be correct', () => {
	const input = '3,4,3,1,2';
	const answer = main(input);

	expect(answer).toBe(5934);
});
