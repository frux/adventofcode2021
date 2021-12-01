import { main } from './index';

test('the answer should be correct', () => {
	const input = [
		'199',
		'200',
		'208',
		'210',
		'200',
		'207',
		'240',
		'269',
		'260',
		'263',
	].join('\n');
	const answer = main(input);

	expect(answer).toBe(7);
});
