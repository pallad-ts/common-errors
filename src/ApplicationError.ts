import {BaseError} from "./BaseError";

/**
 * General application error.
 *
 * Suitable for cases where other errors do not fit.
 */
export class ApplicationError extends BaseError {
	constructor(message: string) {
		super(message, 'ApplicationError');
	}
}
