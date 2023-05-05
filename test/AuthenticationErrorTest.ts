import {runStandardTests} from "./runStandardTests";
import {AuthenticationError} from "@src/AuthenticationError";

describe('AuthenticationError', () => {
	const MESSAGE = 'Standard Authentication Error Message';
	runStandardTests(new AuthenticationError(MESSAGE), {
		errorName: 'AuthenticationError',
		message: MESSAGE
	});
});
