import {BaseError} from "./BaseError";

/**
 * Used to hide internal error
 *
 * Stores `previousError` helpful for debugging purposes.
 */
export class InternalError<TPreviousError extends Error> extends BaseError {
	previousError?: TPreviousError;

	constructor(message: string, previousError?: TPreviousError) {
		super(message, 'InternalError');
		Object.defineProperty(this, 'previousError', {
			enumerable: false,
			configurable: false,
			value: previousError
		});
	}
}
