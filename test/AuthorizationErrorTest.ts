import {runStandardTests} from "./runStandardTests";
import {AuthorizationError} from "@src/AuthorizationError";

describe('AuthorizationError', () => {
	const MESSAGE = 'Standard Authorization Error Message';
	runStandardTests(new AuthorizationError(MESSAGE), {
		errorName: 'AuthorizationError',
		message: MESSAGE
	});
})
