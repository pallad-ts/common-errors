import {BaseError} from "./BaseError";

/**
 * Used to hide internal error
 *
 * Stores `previousError` helpful for debugging purposes.
 */
export class InternalError<TPrevious> extends BaseError.withName('InternalError') {
	readonly previousError?: TPrevious;

	constructor(message: string, previousError?: TPrevious) {
		super(message);
		Object.defineProperty(this, 'previousError', {
			enumerable: false,
			configurable: false,
			value: previousError
		});
	}
}
