import {runStandardTests} from "./runStandardTests";
import {ConflictError} from "@src/ConflictError";

describe('ConflictError', () => {
	const MESSAGE = 'Standard Conflict Error Message';
	runStandardTests(new ConflictError(MESSAGE), {
		errorName: 'ConflictError',
		message: MESSAGE
	});
})
