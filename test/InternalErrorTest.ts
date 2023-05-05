import {runStandardTests} from "./runStandardTests";
import {InternalError} from "@src/InternalError";

describe('InternalError', () => {
	const MESSAGE = 'Standard Internal Error Message';
	runStandardTests(new InternalError(MESSAGE), {
		errorName: 'InternalError',
		message: MESSAGE
	});

	it('storing previous error if provided', () => {
		const previousError = new Error('test');
		const error = new InternalError(MESSAGE, previousError);
		expect(error).toHaveProperty('previousError', previousError);

		const descriptor = Object.getOwnPropertyDescriptor(error, 'previousError');
		expect(descriptor?.enumerable).toBe(false);
		expect(descriptor?.configurable).toBe(false);
	});
});
