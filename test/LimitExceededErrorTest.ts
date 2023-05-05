import {runStandardTests} from "./runStandardTests";
import {LimitExceededError} from "@src/LimitExceededError";

describe('LimitExceededError', () => {
	const MESSAGE = 'Standard Limit Exceeded Error Message';
	runStandardTests(new LimitExceededError(MESSAGE), {
		message: MESSAGE,
		errorName: 'LimitExceededError'
	});

	it('contains payload if provided', () => {
		const payload = {some: 'payload'};
		const error = new LimitExceededError(MESSAGE, payload);

		expect(error).toHaveProperty('payload', payload);
	});
});
