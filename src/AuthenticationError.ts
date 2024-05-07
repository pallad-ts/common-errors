import {BaseError} from "./BaseError";

/**
 * Indicates lack of ability to verify who is the participant performing an operation
 */
export class AuthenticationError extends BaseError {

	constructor(message: string) {
		super(message, 'AuthenticationError');
	}
}
