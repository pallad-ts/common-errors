import {BaseError} from "./BaseError";

/**
 * Indicates that an operation took too long
 */
export class TimeoutError extends BaseError {
	constructor(message: string, readonly timeout?: number) {
		super(message, 'TimeoutError')
	}
}
