import {BaseError} from "./BaseError";

/**
 * Indicates that certain threshold was exceeded.
 *
 * For example organization has too many users or indicating rate limiting errors.
 */
export class LimitExceededError<T> extends BaseError {
	constructor(message: string, readonly payload?: T) {
		super(message, 'LimitExceededError');
	}
}

