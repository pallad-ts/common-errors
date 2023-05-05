import {TimeoutError} from "@src/TimeoutError";
import {runStandardTests} from "./runStandardTests";

describe('TimeoutError', () => {
	const MESSAGE = 'Standard Timeout Message';
	runStandardTests(new TimeoutError(MESSAGE, 10), {
		errorName: 'TimeoutError',
		message: MESSAGE
	});

	it('contains timeout if provided', () => {
		const error = new TimeoutError(MESSAGE, 10);

		expect(error).toHaveProperty('timeout', 10);
	});
});
