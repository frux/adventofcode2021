run:
	npx ts-node ./scripts/run.ts $(day) $(puzzle)
lint:
	npx eslint ./
test: lint
	npx jest
